window.triage_for_github = window.triage_for_github || {};
export default new Promise((resolve) => {
  if(window.triage_for_github.connection) {
    resolve(window.triage_for_github.connection);
    return;
  }
  window.triage_for_github.db.connect().then((value) => {
    window.triage_for_github.connection = value;
    resolve(value);
    return;
  });
});
