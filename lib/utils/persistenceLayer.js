import { databaseName } from '../../package.json';

export default class persistenceLayer {
  constructor () {
    this.db_ = null;
    this.se_ = null;
    this.settingsQuery_ = null;
  }

  getDbConnection () {
    if (this.db_ != null) {
      return this.db_;
    }
    const connectOptions = {storeType: lf.schema.DataStoreType.INDEXED_DB};
    return this.buildSchema_()
      .connect(connectOptions)
      .then((db) => {
        this.db_ = db;
        this.onConnected_();
        return db;
      });
  }

  buildSchema_ () {
    const schemaBuilder = lf.schema.create(databaseName, 1);
    schemaBuilder
      .createTable('Settings')
      .addColumn('key', lf.Type.STRING)
      .addColumn('value', lf.Type.OBJECT)
      .addUnique('key')
      .addPrimaryKey(['key']);

    return schemaBuilder;
  }

  onConnected_ () {
    this.se_ = this.db_.getSchema().table('Settings');
    const se = this.se_;
    this.settingsQuery_ = this.db_
      .select()
      .from(se);
  }

  getSettings () {
    return this.settingsQuery_
      .exec();
  }

  observeSettings (observeFn) {
    this.db_.observe(this.settingsQuery_, observeFn);
  }
}
