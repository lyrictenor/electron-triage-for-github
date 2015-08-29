export default (string, { length = 100, suffix = '...' } = {}) => {
  if (!string || string.length <= length) {
    return string;
  }
  return `${string.slice(0, length)}${suffix}`;
};
