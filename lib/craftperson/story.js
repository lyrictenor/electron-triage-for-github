import Octokat from 'octokat';
import { decryptData } from '../utils/cryptData';
import { fetchAll } from '../utils/octokat-helper';
export const TYPE_PULL = 'TYPE_PULL';
export const TYPE_ISSUE = 'TYPE_ISSUE';

function mixRepos(...repos) {
  return Object.assign([], ...repos);
}

function mixWatchedAndNotUserRepos(...repos) {
  repos;
  return [];
}

function fetchUserReposPromise({octo, since} = {}) {
  return fetchAll(octo.user.repos.fetch, {
    per_page: 100,
    sort: 'pushed',
    direction: 'desc',
  }).then((value) => {
    return value.filter((repo) => {
      return (repo.pushedAt && repo.pushedAt >= since) || (repo.updatedAt && repo.updatedAt >= since);
    });
  });
}

function fetchWatchedReposPromise({octo, since} = {}) {
  octo;
  since;
  return Promise.resolve([]);
}

function fetchUserIssuesPromise({octo, since} = {}) {
  return fetchAll(octo.issues.fetch, {
    per_page: 100,
    filter: 'all',
    state: 'all',
    sort: 'updated',
    since: since.toISOString(),
  });
}

function fetchReposIssuesPromise({repos, since} = {}) {
  repos;
  since;
  return Promise.resolve([]);
}

function fetchReposBranchesPromise({repos} = {}) {
  return Promise.all(
    repos.map((repo) => {
      return fetchAll(repo.branches.fetch, {
        per_page: 100,
      }).then((value) => {
        return {
          branches: value,
          repo: repo,
        };
      });
    })
  );
}

function appendPullRequestPromiseArray(data = []) {
  return data.map((story) => {
    if (!story.issue.pullRequest) {
      return Promise.resolve(Object.assign({}, story, { type: TYPE_ISSUE }));
    }
    return story.issue.pullRequest.fetch({
      per_page: 100,
    }).then((pull) => {
      return Object.assign({}, story, { pull: pull, type: TYPE_PULL });
    });
  });
}

function appendStatusPromiseArray(data = []) {
  return data.map((story) => {
    if (!story.pull) {
      return Promise.resolve(story);
    }
    return story.repo.commits(story.pull.head.sha).status.fetch({
      per_page: 100,
    }).then((status) => {
      return Object.assign({}, story, { status: status });
    });
  });
}

function appendBranchPromiseArray({stories, reposBranches} = {}) {
  return stories.map((story) => {
    if (!story.pull) {
      return Promise.resolve(story);
    }
    const repoBranches = Array.find(reposBranches, (repo) => {
      return repo.repo.id === story.repo.id;
    });
    if (!repoBranches) {
      return Promise.resolve(story);
    }
    const targetBranch = Array.find(repoBranches.branches, (branch) => {
      return branch.name === story.pull.head.ref;
    });
    if (!targetBranch) {
      return Promise.resolve(story);
    }
    return Promise.resolve(
      Object.assign({}, story, { branch: targetBranch })
    );
  });
}

export function fetchCraftedStories(settings = {}) {
  return new Promise((resolve1) => {
    const now = new Date();
    const since = new Date(now - 5 * 24 * 60 * 60 * 1000);
    const token = decryptData(settings.token);
    const octo = new Octokat({
      token: token,
      rootURL: settings.apiendpoint,
      acceptHeader: 'application/vnd.github.v3.text+json',
    });
    let repos;
    let userRepos;
    let watchedRepos;
    let watchedAndNotUserRepos;
    let reposBranches;
    Promise.all([
      fetchUserReposPromise({octo: octo, since: since}),
      fetchWatchedReposPromise({octo: octo, since: since}),
    ]).then((value) => {
      [ userRepos, watchedRepos ] = value;
      repos = mixRepos(userRepos, watchedRepos);
      watchedAndNotUserRepos = mixWatchedAndNotUserRepos(watchedRepos, userRepos);
      return Promise.all([
        fetchUserIssuesPromise({octo: octo, since: since}),
        fetchReposIssuesPromise({repos: watchedAndNotUserRepos, since: since}),
        fetchReposBranchesPromise({repos: repos}),
      ]).then((value2) => {
        const [userIssues, reposIssues, branches] = value2;
        reposBranches = branches;
        // FIXME: single issue does not have repository
        return userIssues.concat(reposIssues).map((issue) => {
          return {
            id: `issue:${issue.id}`,
            issue: issue,
            repo: issue.repository,
          };
        });
      });
    }).then((value) => {
      return Promise.all(appendPullRequestPromiseArray(value));
    }).then((value) => {
      return Promise.all(appendStatusPromiseArray(value));
    }).then((value) => {
      return Promise.all(appendBranchPromiseArray({
        stories: value,
        reposBranches: reposBranches,
      }));
    }).then((value) => {
      resolve1(value);
    });
  });
}

function fetchReposPromiseByIdentifiers({octo, identifiers = []} = {}) {
  return Promise.all(
    identifiers.map((identifier) => {
      return octo.repos(identifier.owner, identifier.repo).fetch();
    })
  );
}

function fetchIssuesPromiseByIdentifiers({octo, identifiers = []} = {}) {
  return Promise.all(
    identifiers.map((identifier) => {
      return Promise.all([
        octo.repos(identifier.owner, identifier.repo)
          .issues(identifier.number)
          .fetch(),
        octo.repos(identifier.owner, identifier.repo).fetch(),
      ]);
    })
  );
}

function toggleIssueState(state) {
  return (state === 'open') ? 'closed' : 'open';
}

function toggleIssuesStatePromiseByIdentifiers({octo, identifiers = []} = {}) {
  return Promise.all(
    identifiers.map((identifier) => {
      return octo.repos(identifier.owner, identifier.repo)
        .issues(identifier.number)
        .fetch()
        .then((value) => {
          const issue = value;
          return issue.update({
            state: toggleIssueState(issue.state),
          });
        });
    })
  );
}

export function fetchCraftedStoriesByIssue({settings = {}, identifiers = []} = {}) {
  return new Promise((resolve1) => {
    const token = decryptData(settings.token);
    const octo = new Octokat({
      token: token,
      rootURL: settings.apiendpoint,
      acceptHeader: 'application/vnd.github.v3.text+json',
    });
    let repos;
    let reposBranches;
    fetchReposPromiseByIdentifiers({
      octo: octo,
      identifiers: identifiers,
    }).then((value) => {
      repos = value;
      return fetchReposBranchesPromise({
        repos: repos,
      });
    }).then((value) => {
      reposBranches = value;
      return fetchIssuesPromiseByIdentifiers({
        octo: octo,
        identifiers: identifiers,
      });
    }).then((value) => {
      return value.map((value2) => {
        const [issue, repository] = value2;
        return {
          id: `issue:${issue.id}`,
          issue: issue,
          repo: repository,
        };
      });
    }).then((value) => {
      return Promise.all(appendPullRequestPromiseArray(value));
    }).then((value) => {
      return Promise.all(appendStatusPromiseArray(value));
    }).then((value) => {
      return Promise.all(appendBranchPromiseArray({
        stories: value,
        reposBranches: reposBranches,
      }));
    }).then((value) => {
      resolve1(value);
    });
  });
}

export function toggleIssuesState({settings = {}, identifiers = []} = {}) {
  return new Promise((resolve1) => {
    const token = decryptData(settings.token);
    const octo = new Octokat({
      token: token,
      rootURL: settings.apiendpoint,
      acceptHeader: 'application/vnd.github.v3.text+json',
    });
    toggleIssuesStatePromiseByIdentifiers({
      octo: octo,
      identifiers: identifiers,
    }).then(() => {
      return fetchCraftedStoriesByIssue({
        settings: settings,
        identifiers: identifiers,
      });
    }).then((value) => {
      resolve1(value);
    });
  });
}

export function deletePullRequestsBranch({settings = {}, identifiers = []} = {}) {
  return new Promise((resolve1) => {
    fetchCraftedStoriesByIssue({
      settings: settings,
      identifiers: identifiers,
    }).then((value) => {
      const targets = value.filter((story) => {
        return story.pull && story.pull.head && story.branch;
      });
      return Promise.all(
        targets.map((story) => {
          return story.pull.head.repo.git.refs.heads(story.pull.head.ref).remove();
        })
      );
    }).then(() => {
      return fetchCraftedStoriesByIssue({
        settings: settings,
        identifiers: identifiers,
      });
    }).then((value) => {
      resolve1(value);
    });
  });
}
