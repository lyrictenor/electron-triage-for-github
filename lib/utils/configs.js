import databaseName from '../utils/database-name-wrapper';
import levelup from 'levelup';
import sub from 'level-sublevel';
import leveljs from 'level-js';
import {
  decryptData,
  encryptData,
} from './crypt-data';
import moment from 'moment';
import {
  isUndefined,
} from 'lodash';

import defaultSettings from '../data/default_settings.json';
const configsNameSpace = 'configs';
export const acceptableKeys = new Set([
  'apiEndpoint',
  'webEndpoint',
  'token',
  'autopilotInterval',
  'autopiloting',
  'autopilotedAt',
  'enableAutopilot',
  'storyUpdatedAt',
]);
export const dateKeys = new Set([
  'autopilotedAt',
  'storyUpdatedAt',
]);

const initialAppConfig = new Map([
  ['autopiloting', false],
]);

/**
 * get config value by key
 *
 * @param key - key
 *
 * @return {Promise<?Object, error>} - value
 */
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

/**
 * Set config key and value
 *
 * @param key - key
 * @param value - value
 *
 * @returns {Promise<?result, error>}
 */
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
 * Bulk set config
 *
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

/**
 * Init data set, merge saved config and init value and default settings
 *
 * @return {Promise.<Map.<String, Object>>}
 */
export function initApplicationConfig() {
  const putConfigs = new Map([initialAppConfig]);
  return getConfigAll()
    .then((configs) => {
      const savedKeys = new Set([...configs.keys()]);
      const existedKeys = new Set([...putConfigs.keys()]);
      for (const key of acceptableKeys) {
        if (!savedKeys.has(key) && !existedKeys.has(key)) {
          const value = isUndefined(defaultSettings[key]) ? null : defaultSettings[key];
          putConfigs.set(key, value);
        }
      }
      return bulkSetConfig(putConfigs);
    });
}

/**
 * Build setting object from config map
 *
 * @param {Map} configMap - config
 *
 * @return {Object} params for setting form
 */
export function buildSettingFormParams(configMap) {
  return {
    token: decryptData(configMap.get('token')),
    webEndpoint: configMap.get('webEndpoint'),
    apiEndpoint: configMap.get('apiEndpoint'),
    autopilotInterval: configMap.get('autopilotInterval'),
    enableAutopilot: configMap.get('enableAutopilot'),
  };
}

/**
 * Build config map from setting object
 *
 * @param {Object} settings - settings
 *
 * @return {Map} configMap
 */
export function buildConfigMapFromSettings(settings) {
  const putConfigs = new Map();
  for (const key in settings) {
    if (acceptableKeys.has(key)) {
      let value;
      switch (key) {
      case 'token':
        value = encryptData(settings[key]);
        break;
      case 'autopilotInterval':
        value = Number(settings[key]);
        break;
      default:
        value = settings[key];
      }
      putConfigs.set(key, value);
    }
  }
  return putConfigs;
}

/**
 * @param {Map} configMap - configMap
 * @return {boolean} true if user try to log in
 */
export function tryToLogIn(configMap) {
  return (configMap.has('token') && configMap.get('token') ) ? true : false;
}
