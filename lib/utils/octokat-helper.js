// Unable to "fetch" all with paginated results. · Issue #38 · philschatz/octokat.js
// https://github.com/philschatz/octokat.js/issues/38
// The following is ES6 but should just require changing the anonymous functions syntax
export function fetchAll(fn, args) {
  let acc = []; // Accumulated results
  return new Promise((resolve) => {
    fn(args).then((val) => {
      acc = acc.concat(val);
      if (val.nextPage) {
        return fetchAll(val.nextPage).then((val2) => {
          acc = acc.concat(val2);
          resolve(acc);
        });
      } else {
        resolve(acc);
      }
    });
  });
}
