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

export function decryptData (saltAndCrypt) {
  if (!saltAndCrypt) {
    return saltAndCrypt;
  }
  const salt = saltAndCrypt.slice(0, digit - 1);
  const crypt = saltAndCrypt.slice(digit);
  return AES.decrypt(crypt, salt).toString(cryptoJsEncUtf8);
}
