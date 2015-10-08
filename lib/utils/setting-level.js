import { databaseName } from '../../package.json';
import levelup from 'levelup';
import sub from 'level-sublevel';
import leveljs from 'level-js';
const settingsNameSpace = 'settings';

export function getSettingDataPromise() {
  return new Promise((resolve, reject) => {
    const db = sub(levelup(databaseName, {db: leveljs, valueEncoding: 'json'}));
    try {
      const settings = db.sublevel(settingsNameSpace);
      settings.get('setting-data', (err, value) => {
        if (err) {
          if (err.notFound) {
            // handle a 'NotFoundError' here
            resolve({});
            return;
          }
          reject(err);
          return;
        }
        resolve(value);
      });
    } finally {
      if (db.isOpen()) {
        db.close();
      }
    }
  });
}
export function setSettingDataPromise(settingData) {
  return new Promise((resolve, reject) => {
    const db = sub(levelup(databaseName, {db: leveljs, valueEncoding: 'json'}));
    try {
      const settings = db.sublevel(settingsNameSpace);
      settings.put('setting-data', settingData, (err, value) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(value);
      });
    } finally {
      if (db.isOpen()) {
        db.close();
      }
    }
  });
}
