export default (array) => {
  return array.reduce((previous, current) => {
    return previous.concat(current);
  });
};
