#!/usr/bin/env node

/*eslint-disable no-console */

import fs from 'fs';
import archiver from 'archiver';
import path from 'path';

const productName = process.env.npm_package_productName;
const targets = ['darwin-x64', 'linux-ia32', 'linux-x64', 'win32-ia32', 'win32-x64'].map((target) => {
  return `${productName}-${target}`;
});

Promise.all(targets.map((target) => {
  return pack(target);
})).then((value) => {
  console.log(value);
  console.log('Pack complete.');
}).catch((error) => {
  console.error(error);
  process.exit(1);
});

function pack (target) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join('output', `${target}.zip`);
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip');

    output.on('close', () => {
      resolve(outputPath);
    });

    archive.on('error', (err) => {
      reject(new Error(err));
    });

    archive.pipe(output);
    archive.bulk([
      {
        src: [path.join('**', '*')],
        cwd: path.join('output', target),
        dest: productName,
        expand: true
      }
    ]);
    archive.finalize();
  });
}
