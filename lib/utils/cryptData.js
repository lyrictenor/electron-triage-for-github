import AES from 'crypto-js/aes';
import rndm from 'rndm';
import cryptoJsEncUtf8 from 'crypto-js/enc-utf8';
const digit = 16;

export function encryptData (raw) {
  if(!raw) {
    return raw;
  }
  const salt = rndm(digit);
  return `${salt}${AES.encrypt(raw, salt).toString()}`;
}

export function decryptData (saltAndCrypted) {
  if (!saltAndCrypted) {
    return saltAndCrypted;
  }
  const salt = saltAndCrypted.slice(0, digit);
  const crypted = saltAndCrypted.slice(digit);
  return AES.decrypt(crypted, salt).toString(cryptoJsEncUtf8);
}
