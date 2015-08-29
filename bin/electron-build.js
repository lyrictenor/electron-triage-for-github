#!/usr/bin/env node

/*eslint-disable no-console */
import spawn from 'buffered-spawn';
import path from 'path';
import rimraf from 'rimraf';
import packager from 'electron-packager';
const outputPath = path.join(process.cwd(), 'output');
const packagerOptions = {
  dir: path.join(process.cwd(), 'dist'),
  name: process.env.npm_package_productName,
  version: process.env.npm_package_electronVersion,
  out: outputPath,
  platform: 'all',
  arch: 'all'
};

console.log(`Pack electron ${process.env.npm_package_electronVersion}`);
spawn('npm', ['run', 'build:dist'], { stdio: 'inherit' })
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
      packager(packagerOptions, (err, appPath) => {
        if(err) {
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
