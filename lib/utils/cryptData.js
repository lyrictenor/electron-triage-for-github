import AES from 'crypto-js/aes';
import rndm from 'rndm';
import cryptoJsEncUtf8 from 'crypto-js/enc-utf8';
const digit = 16;
const prefix = 'DO NOT PASTE THIS!! ANYONE CAN RESTORE THE TOKEN FROM THIS! IF YOU PASTE THIS, YOU MUST REVOKE YOUR TOKEN!!(https://github.com/settings/tokens)';

export function encryptData (raw) {
  if(!raw) {
    return raw;
  }
  const salt = rndm(digit);
  return `${prefix}${salt}${AES.encrypt(raw, salt).toString()}`;
}

export function decryptData (saltAndCrypted) {
  if (!saltAndCrypted) {
    return saltAndCrypted;
  }
  const salt = saltAndCrypted.slice(prefix.length, prefix.length + digit);
  const crypted = saltAndCrypted.slice(prefix.length + digit);
  return AES.decrypt(crypted, salt).toString(cryptoJsEncUtf8);
}
