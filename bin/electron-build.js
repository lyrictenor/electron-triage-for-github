#!/usr/bin/env node

/* eslint-disable no-console */
import yargs from 'yargs';
import spawn from 'buffered-spawn';
import path from 'path';
import rimraf from 'rimraf';
import packager from 'electron-packager';
import { productName, electronVersion, version } from '../package.json';
const outputPath = path.join(process.cwd(), 'output');
const packagerOptions = {
  dir: path.join(process.cwd(), 'dist'),
  name: productName,
  version: electronVersion,
  out: outputPath,
  platform: 'all',
  arch: 'all',
  asar: true,
  appVersion: version,
  icon: path.join(process.cwd(), 'assets', 'triage-logo-3'),
};
const argv = yargs.default(packagerOptions).argv;
const env = Object.assign({}, process.env, { NODE_ENV: 'production' });

console.log(`Pack electron ${electronVersion}`);
spawn('npm', ['run', 'build:dist'], { stdio: 'inherit', env: env })
  .then(() => {
    return new Promise((resolve, reject) => {
      rimraf(outputPath, (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      packager({
        dir: argv.dir,
        name: argv.name,
        version: argv.version,
        out: argv.out,
        platform: argv.platform,
        arch: argv.arch,
        asar: argv.asar,
        'app-version': argv.appVersion,
        icon: argv.icon,
      }, (err, appPath) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(appPath);
      });
    });
  }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
