/**
 * @param {string} webEndpoint - GitHub web endpoint
 *
 * @return {string} GitHub new token endpoint
 */
export default (webEndpoint) => {
  return `${webEndpoint}/settings/tokens/new`;
};
