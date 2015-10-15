import { databaseName } from '../../package.json';
import levelup from 'levelup';
import sub from 'level-sublevel';
import leveljs from 'level-js';
import {
  decryptData,
  encryptData,
} from './cryptData';
import moment from 'moment';

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
export const dateKeys = new Set([
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
        const parsed = JSON.parse(value);
        if (dateKeys.has(key) && moment(parsed).isValid()) {
          resolve(moment(parsed).toDate());
          return;
        }
        resolve(parsed);
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
          const parsed = JSON.parse(data.value);
          if (dateKeys.has(data.key) && moment(parsed).isValid()) {
            result.set(data.key, moment(parsed).toDate());
            return;
          }
          result.set(data.key, parsed);
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

/**
 * @param {Object} settings - saving params.
 *
 * @return {Promise<<null>, error>}
 */
export function saveSettingsToConfig(settings) {
  return new Promise((resolve) => {
    const putConfigs = new Map();
    for (const key in settings) {
      if (acceptableKeys.has(key)) {
        let value;
        switch (key) {
        case 'token':
          value = encryptData(settings[key]);
          break;
        case 'interval':
          value = Number(settings[key]);
          break;
        default:
          value = settings[key];
        }
        putConfigs.set(key, value);
      }
    }
    resolve(putConfigs);
  }).then((putConfigs) => {
    return bulkSetConfig(putConfigs);
  });
}
