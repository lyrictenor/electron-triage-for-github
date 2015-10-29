/* global __DEVELOPMENT__ */
import { databaseName as originalDatabaseName } from '../../package.json';
let databaseName;
if (__DEVELOPMENT__) {
  databaseName = `${originalDatabaseName}_development`;
} else {
  databaseName = `${originalDatabaseName}_production`;
}
export default databaseName;
