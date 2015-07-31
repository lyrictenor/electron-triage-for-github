import dbConnection from './getDbConnection';

export default function () {
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
      db.observe(query, (changes) => {
        console.log(changes);// eslint-disable-line
      });
    });
}
