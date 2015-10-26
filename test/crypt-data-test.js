import assert from 'power-assert';
import { encryptData, decryptData } from '../lib/utils/crypt-data';

it('should not encrypt empty string', () => {
  assert.strictEqual(encryptData(''), '');
});
it('should decrypt empty string', () => {
  assert.strictEqual(decryptData(''), '');
});
it('should decrypt encrypted value', () => {
  const expected = '1234';
  assert.strictEqual(decryptData(encryptData(expected)), expected);
});
