'use strict';
import assert from 'power-assert';
import { encryptData, decryptData } from '../lib/utils/cryptData';

it('should not encrypt empty string', () => {
  assert.strictEqual(encryptData(''), '');
});
