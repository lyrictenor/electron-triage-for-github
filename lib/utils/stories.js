import Octokat from 'octokat';
import { decryptData } from '../utils/crypt-data';
import { fetchAll } from '../utils/octokat-helper';

/**
 * @param {Map} configs - configs map
 * @return {Promise.<Octokat.issue[]>}
 */
export function fetchUserIssues(configs) {
  const now = new Date();
  const since = new Date(now - 5 * 24 * 60 * 60 * 1000);
  const token = decryptData(configs.get('token'));
  const octo = new Octokat({
    token: token,
    rootURL: configs.get('apiEndpoint'),
    acceptHeader: 'application/vnd.github.v3.text+json',
  });
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
 * @returns {Promise<{ users: user[], issues: issue[], repos: repo[] }, error>}
 */
export function fetchIssues(configs) {
  return Promise.all([
    fetchUserIssues(configs),
  ]);
}
