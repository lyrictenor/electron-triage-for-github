import Octokat from 'octokat';
import { decryptData } from '../utils/crypt-data';
import { fetchAll } from '../utils/octokat-helper';

/**
 * @param {Map} configs - configs map
 * @return {Octokat} octokat object
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
    since: since.toISOString(),
  });
}

/**
 * @param {Map} configs - configs map
 * @return {Promise<{{issueById: Map, issues: Set, issuesOrdered: Array, reposById: Map, repos: Set, usersById: Map, users: Set}}, error>}
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
 * @return {Promise<{{issueById: Map, issues: Set, issuesOrdered: Array, reposById: Map, repos: Set, usersById: Map, users: Set}}, error>}
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
