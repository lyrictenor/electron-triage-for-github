import dbConnection from './dbConnection';

export default function (settings) {
  let db;
  let settingsTable;
  return dbConnection
    .then((value) => {
      db = value;
      return db.getSchema().table('Settings');
    }).then((value) => {
      settingsTable = value;
      const rows = Object.keys(settings).reduce((previous, current) => {
        previous.push(
          settingsTable.createRow({
            key: current,
            value: settings[current]
          })
        );
        return previous;
      }, []);
      return db
        .insertOrReplace()
        .into(settingsTable)
        .values(rows)
        .exec();
    });
}
