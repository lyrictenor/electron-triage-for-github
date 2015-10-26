import AES from 'crypto-js/aes';
import rndm from 'rndm';
import cryptoJsEncUtf8 from 'crypto-js/enc-utf8';
const saltDigit = 16;
const prefix = 'DO NOT PASTE THIS!! ANYONE CAN RESTORE THE TOKEN FROM THIS! IF YOU PASTE THIS, YOU MUST REVOKE YOUR TOKEN!!(https://github.com/settings/tokens)';

/**
 * @param {string} raw - encrypting data
 *
 * @return {string} encrypted data if data is not empty.
 */
export function encryptData(raw) {
  if (!raw) {
    return raw;
  }
  const salt = rndm(saltDigit);
  return `${prefix}${salt}${AES.encrypt(raw, salt).toString()}`;
}

/**
 * @param {string} saltAndCrypted - salt and crypted data
 *
 * @return {string} decrypted data if salt and crypted is not empty.
 */
export function decryptData(saltAndCrypted) {
  if (!saltAndCrypted) {
    return saltAndCrypted;
  }
  const salt = saltAndCrypted.slice(prefix.length, prefix.length + saltDigit);
  const crypted = saltAndCrypted.slice(prefix.length + saltDigit);
  return AES.decrypt(crypted, salt).toString(cryptoJsEncUtf8);
}
