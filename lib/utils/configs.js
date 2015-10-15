import { databaseName } from '../../package.json';
import levelup from 'levelup';
import sub from 'level-sublevel';
import leveljs from 'level-js';
const configsNameSpace = 'configs';
const acceptableKeys = [
  'apiEndpoint',
  'webEndpoint',
  'token',
  'interval',
  'autopiloting',
  'autopilotedAt',
];

export function getConfig(key) {
  return new Promise((resolve, reject) => {
    const db = sub(levelup(databaseName, {db: leveljs}));
    try {
      const configs = db.sublevel(configsNameSpace);
      configs.get(key, (err, value) => {
        if (err) {
          if (err.notFound) {
            resolve(null);
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

export function setConfig(key, value) {
  return new Promise((resolve, reject) => {
    if (!acceptableKeys.includes(key)) {
      reject(new Error(`this key ${key} is not acceptable. acceptableKeys: ${acceptableKeys.join(', ')}`));
      return;
    }
    const db = sub(levelup(databaseName, {db: leveljs}));
    try {
      const configs = db.sublevel(configsNameSpace);
      configs.put(key, value, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    } finally {
      if (db.isOpen()) {
        db.close();
      }
    }
  });
}

export function getConfigAll() {
  return new Promise((resolve, reject) => {
    const db = sub(levelup(databaseName, {db: leveljs}));
    try {
      const configs = db.sublevel(configsNameSpace);
      const result = new Map();
      configs.createReadStream({
        gt: '',
      })
        .on('data', (data) => {
          result.set(data.key, data.value);
        })
        .on('error', (err) => {
          reject(err);
        })
        .on('end', () => {
          resolve(result);
        });
    } finally {
      if (db.isOpen()) {
        db.close();
      }
    }
  });
}

export function bulkSetConfig(obj) {
  return new Promise((resolve) => {
    const db = sub(levelup(databaseName, {db: leveljs}));
    try {
      const configs = db.sublevel(configsNameSpace);
      const batch = configs.batch();
      for (const key in obj) {
        if (acceptableKeys.includes(key)) {
          batch.put(key, obj[key]);
        }
      }
      batch.write(() => {
        resolve();
      });
    } finally {
      if (db.isOpen()) {
        db.close();
      }
    }
  });
}
