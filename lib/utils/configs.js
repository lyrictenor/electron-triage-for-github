import { databaseName } from '../../package.json';
import levelup from 'levelup';
import sub from 'level-sublevel';
import leveljs from 'level-js';
import { decryptData } from './cryptData';

import defaultSettings from '../data/default_settings.json';
const configsNameSpace = 'configs';
export const acceptableKeys = new Set([
  'apiEndpoint',
  'webEndpoint',
  'token',
  'interval',
  'autopiloting',
  'autopilotedAt',
]);

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
        resolve(JSON.parse(value));
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
    if (!acceptableKeys.has(key)) {
      reject(new Error(`this key ${key} is not acceptable. acceptableKeys: ${acceptableKeys}`));
      return;
    }
    const db = sub(levelup(databaseName, {db: leveljs}));
    try {
      const configs = db.sublevel(configsNameSpace);
      configs.put(key, JSON.stringify(value), (err, result) => {
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

/**
  * @return {Promise<Map<String, Object>, error>} all config keys and values.
  */
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
          result.set(data.key, JSON.parse(data.value));
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

/**
 * @param {Map} configMap - persist params.
 *
 * @return {Promise<<null>, error>}
 */
export function bulkSetConfig(configMap) {
  return new Promise((resolve, reject) => {
    const db = sub(levelup(databaseName, {db: leveljs}));
    try {
      const configs = db.sublevel(configsNameSpace);
      const opts = [];
      for (const [key, value] of configMap) {
        if (acceptableKeys.has(key)) {
          opts.push({type: 'put', key: key, value: JSON.stringify(value)});
        }
      }
      configs.batch(opts, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    } finally {
      if (db.isOpen()) {
        db.close();
      }
    }
  });
}

export function initApplicationConfig() {
  const putConfigs = new Map([
    ['autopiloting', false],
    ['autopilotedAt', null],
  ]);
  return getConfigAll()
    .then((configs) => {
      const savedKeys = new Set([...configs.keys()]);
      const existedKeys = new Set([...putConfigs.keys()]);
      for (const key of acceptableKeys) {
        if (!savedKeys.has(key) && !existedKeys.has(key)) {
          putConfigs.set(key, defaultSettings[key]);
        }
      }
      return bulkSetConfig(putConfigs);
    });
}

/**
 * @param {Map} configMap - config
 *
 * @return {Object} params for setting form
 */
export function buildSettingFormParams(configMap) {
  return {
    token: decryptData(configMap.get('token')),
    webEndpoint: configMap.get('webEndpoint'),
    apiEndpoint: configMap.get('apiEndpoint'),
    interval: configMap.get('interval'),
  };
}
