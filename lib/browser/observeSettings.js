import dbConnection from '../utils/getDbConnection';
(() => {
  let db;
  let settingsTable;
  return dbConnection
    .then((value) => {
      db = value;
      return db.getSchema().table('Settings');
    }).then((value) => {
      settingsTable = value;
      const query = db
        .select()
        .from(settingsTable);
      console.log(query);// eslint-disable-line
      return db.observe(query, function (changes) {
        console.log(changes);// eslint-disable-line
      });
    });
})(window);
