/**
 * @param {String} webEndpoint - GitHub web endpoint
 *
 * @return {String} GitHub new token endpoint
 */
export default (webEndpoint) => {
  return `${webEndpoint}/settings/tokens/new`;
};
