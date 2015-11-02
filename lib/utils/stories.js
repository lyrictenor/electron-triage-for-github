import Octokat from 'octokat';
import { decryptData } from '../utils/crypt-data';
import { fetchAll } from '../utils/octokat-helper';

/**
 * @param {Map} configs - configs map
 * @return {{Octokat}} octokat object
 */
export function buildOcto(configs) {
  const token = decryptData(configs.get('token'));
  return new Octokat({
    token: token,
    rootURL: configs.get('apiEndpoint'),
    acceptHeader: 'application/vnd.github.v3.text+json',
  });
}

/**
 * @param {Octokat.issue[]} issues - issues
 * @return {{issueById: Map, issues: Set, issuesOrdered: Array, reposById: Map, repos: Set, usersById: Map, users: Set}}
 */
export function normalizeIssues(issues) {
  const result = {
    issuesById: new Map(),
    issues: new Set(),
    issuesOrdered: [],
    reposById: new Map(),
    repos: new Set(),
    usersById: new Map(),
    users: new Set(),
  };
  for (const issue of issues) {
    if (issue.user) {
      result.usersById.set(issue.user.id, issue.user);
      result.users.add(issue.user.id);
    }
    if (issue.repository) {
      result.reposById.set(issue.repository.id, issue.repository);
      result.repos.add(issue.repository.id);

      if (issue.repository.owner) {
        result.usersById.set(issue.repository.owner.id, issue.repository.owner);
        result.users.add(issue.repository.owner.id);
      }
    }
    if (!result.issues.has(issue.id)) {
      result.issues.add(issue.id);
      result.issuesOrdered.push(issue.id);
      result.issuesById.set(issue.id, issue);
    }
  }
  return result;
}

/**
 * @param {Map} configs - configs map
 * @return {Promise.<Octokat.issue[]>}
 */
export function fetchUserIssues(configs) {
  const now = new Date();
  const since = new Date(now - 5 * 24 * 60 * 60 * 1000);
  const octo = buildOcto(configs);
  return fetchAll(octo.issues.fetch, {
    per_page: 100,
    filter: 'all',
    state: 'all',
    sort: 'updated',
    direction: 'asc',
    since: since.toISOString(),
  });
}

/**
 * @param {Map} configs - configs map
 * @return {Promise<{issueById: Map, issues: Set, issuesOrdered: Array, reposById: Map, repos: Set, usersById: Map, users: Set}, error>}
 */
export function fetchIssues(configs) {
  return Promise.all([
    fetchUserIssues(configs),
  ]).then((value) => {
    const issues = value.reduce((prev, current) => {
      return prev.concat(current);
    }, []);
    return normalizeIssues(issues);
  });
}

/**
 * @param {Map} configs - configs map
 * @param {identifier[]} identifiers - identifiers
 * @return {Promise<{issueById: Map, issues: Set, issuesOrdered: Array, reposById: Map, repos: Set, usersById: Map, users: Set}, error>}
 */
export function fetchIssuesByIdentifiers({configs = new Map(), identifiers = []} = {}) {
  const octo = buildOcto(configs);
  return Promise.all(
    identifiers.map((identifier) => {
      return Promise.all([
        octo
          .repos(identifier.owner, identifier.repo)
          .issues(identifier.number)
          .fetch(),
        octo
          .repos(identifier.owner, identifier.repo)
          .fetch(),
      ]);
    })
  ).then((value) => {
    return value.map((story) => {
      const [issue, repo] = story;
      return Object.assign({}, issue, { repository: repo });
    });
  }).then((value) => {
    return normalizeIssues(value);
  });
}

/**
 * @param {Set} issues
 * @param {Map} issuesById
 * @return {{owner: string, repo: string, number: number}[]}
 */
export function buildIdentifiersForPullsFromIssues({ issues = new Set(), issuesById = new Map() }) {
  const identifiers = [];
  for (const issueId of issues) {
    if (issuesById.has(issueId)) {
      const issue = issuesById.get(issueId);
      if (issue.pullRequest && issue.repository && issue.repository.owner) {
        identifiers.push({
          owner: issue.repository.owner.login,
          repo: issue.repository.name,
          number: issue.number,
        });
      }
    }
  }
  return identifiers;
}

/**
 * @param {Octokat.pull[]} pulls - pulls
 * @return {{pullsByKey: Map, pulls: Set, reposById: Map, repos: Set, usersById: Map, users: Set}}
 */
export function normalizePulls(pulls) {
  const result = {
    pullsByKey: new Map(),
    pulls: new Set(),
    reposById: new Map(),
    repos: new Set(),
    usersById: new Map(),
    users: new Set(),
  };
  for (const pull of pulls) {
    if (pull.user) {
      result.usersById.set(pull.user.id, pull.user);
      result.users.add(pull.user.id);
    }
    if (pull.assignee) {
      result.usersById.set(pull.assignee.id, pull.assignee);
      result.users.add(pull.assignee.id);
    }
    if (pull.milestone && pull.milestone.creator) {
      result.usersById.set(pull.milestone.creator.id, pull.milestone.creator);
      result.users.add(pull.milestone.creator.id);
    }
    if (pull.head) {
      if (pull.head.user) {
        result.usersById.set(pull.head.user.id, pull.head.user);
        result.users.add(pull.head.user.id);
      }
      if (pull.head.repo) {
        result.reposById.set(pull.head.repo.id, pull.head.repo);
        result.repos.add(pull.head.repo.id);
        if (pull.head.repo.owner) {
          result.usersById.set(pull.head.repo.owner.id, pull.head.repo.owner);
          result.users.add(pull.head.repo.owner.id);
        }
      }
    }
    if (pull.base) {
      if (pull.base.user) {
        result.usersById.set(pull.base.user.id, pull.base.user);
        result.users.add(pull.base.user.id);
      }
      if (pull.base.repo) {
        result.reposById.set(pull.base.repo.id, pull.base.repo);
        result.repos.add(pull.base.repo.id);
        if (pull.base.repo.owner) {
          result.usersById.set(pull.base.repo.owner.id, pull.base.repo.owner);
          result.users.add(pull.base.repo.owner.id);
        }

        const key = `${pull.base.repo.fullName}#${pull.number}`;
        result.pulls.add(key);
        result.pullsByKey.set(key, pull);
      }
    }
  }
  return result;
}

/**
 * @param {Map} configs - configs map
 * @param {identifier[]} identifiers - identifiers
 * @return {Promise.<{pullsByKey: Map, pulls: Set, reposById: Map, repos: Set, usersById: Map, users: Set}>}
 */
export function fetchPullsByIdentifiers({configs = new Map(), identifiers = []} = {}) {
  const octo = buildOcto(configs);
  return Promise.all(
    identifiers.map((identifier) => {
      return octo
        .repos(identifier.owner, identifier.repo)
        .pulls(identifier.number)
        .fetch();
    })
  ).then((value) => {
    return normalizePulls(value);
  });
}

/**
 * @param {Set} pulls
 * @param {Map} pullsByKey
 * @return {{owner: string, repo: string, sha: string}[]}
 */
export function buildIdentifiersForStatusesFromPulls({ pulls = new Set(), pullsByKey = new Map() }) {
  const identifiers = [];
  for (const pullKey of pulls) {
    if (pullsByKey.has(pullKey)) {
      const pull = pullsByKey.get(pullKey);
      if (pull.base && pull.base.repo && pull.base.repo.owner && pull.head) {
        identifiers.push({
          owner: pull.base.repo.owner.login,
          repo: pull.base.repo.name,
          sha: pull.head.sha,
        });
      }
    }
  }
  return identifiers;
}

/**
 * @param {Octokat.status[]} statuses - statuses
 * @return {{statusesByKey: Map, statuses: Set, reposById: Map, repos: Set, usersById: Map, users: Set}}
 */
export function normalizeStatuses(statuses) {
  const result = {
    statusesByKey: new Map(),
    statuses: new Set(),
    reposById: new Map(),
    repos: new Set(),
    usersById: new Map(),
    users: new Set(),
  };
  for (const status of statuses) {
    if (status.repository) {
      result.reposById.set(status.repository.id, status.repository);
      result.repos.add(status.repository.id);
      if (status.repository.owner) {
        result.usersById.set(status.repository.owner.id, status.repository.owner);
        result.users.add(status.repository.owner.id);
      }

      const key = `${status.repository.fullName}#${status.sha}`;
      result.statuses.add(key);
      result.statusesByKey.set(key, status);
    }
  }
  return result;
}

/**
 * @param {Map} configs - configs map
 * @param {identifier[]} identifiers - identifiers
 * @return {Promise.<{statusesByKey: Map, statuses: Set, reposById: Map, repos: Set, usersById: Map, users: Set}>}
 */
export function fetchStatusesByIdentifiers({configs = new Map(), identifiers = []} = {}) {
  const octo = buildOcto(configs);
  return Promise.all(
    identifiers.map((identifier) => {
      return octo
        .repos(identifier.owner, identifier.repo)
        .commits(identifier.sha)
        .status
        .fetch();
    })
  ).then((value) => {
    return normalizeStatuses(value);
  });
}
