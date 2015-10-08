import { databaseName } from '../../package.json';
import levelup from 'levelup';
import sub from 'level-sublevel';
import leveljs from 'level-js';

function setData({data, db} = {}) {
  return new Promise((resolve, reject) => {
    db.put('setting-data', data, (err, value) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(value);
    });
  });
}

function getData({db} = {}) {
  return new Promise((resolve, reject) => {
    db.get('setting-data', (err, value) => {
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
  });
}

export async function getSettingData() {
  const db = sub(levelup(databaseName, {db: leveljs, valueEncoding: 'json'}));
  try {
    const settings = db.sublevel('settings');
    let ret = null;
    try {
      ret = await getData({db: settings});
    } catch (err) {// eslint-disable-line no-empty
    }
    return ret;
  } finally {
    if (db.isOpen()) {
      db.close();
    }
  }
}

export async function setSettingData(settingData) {
  const db = sub(levelup(databaseName, {db: leveljs, valueEncoding: 'json'}));
  try {
    const settings = db.sublevel('settings');
    try {
      await setData({db: settings, data: settingData});
    } catch (err) {// eslint-disable-line no-empty
    }
  } finally {
    if (db.isOpen()) {
      db.close();
    }
  }
}
