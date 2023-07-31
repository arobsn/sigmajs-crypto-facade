import { hmac } from "@noble/hashes/hmac";
import { pbkdf2 } from "@noble/hashes/pbkdf2";
import { sha512 } from "@noble/hashes/sha512";
import { CryptoContext } from "./cryptoContext";
import { Point, utils } from "./noble-secp256k1";

export class CryptoFacade {
  static normalizePoint(point: Point): Point {
    return Point.fromHex(point.toHex());
  }

  static createCryptoContext(): CryptoContext {
    return new CryptoContext();
  }

  static negatePoint(point: Point): Point {
    return point.negate();
  }

  static isInfinityPoint(point: Point): boolean {
    return point.equals(Point.ZERO);
  }

  static multiplyPoint(point: Point, scalar: bigint): Point {
    return point.multiply(scalar);
  }

  static addPoint(point1: Point, point2: Point): Point {
    return point1.add(point2);
  }

  static showPoint(point: Point): string {
    const x = point.x.toString(16).substring(0, 6);
    const y = point.y.toString(16).substring(0, 6);

    return `ECPoint(${x},${y},...)`;
  }

  static testBitZeroOfFieldElem(element: bigint): boolean {
    return this._testBitOfFieldElem(element, 0);
  }

  private static _testBitOfFieldElem(element: bigint, index: number): boolean {
    return (element & BigInt(1 << index)) !== 0n;
  }

  static getEncodedOfFieldElem(element: bigint): Uint8Array {
    return utils._bigintTo32Bytes(element);
  }

  static getXCoord(point: Point): bigint {
    return point.x;
  }

  static getYCoord(point: Point): bigint {
    return point.y;
  }

  static getAffineXCoord(point: Point): bigint {
    return point.x;
  }

  static getAffineYCoord(point: Point): bigint {
    return point.y;
  }

  static hashHmacSHA512(key: Uint8Array, data: Uint8Array): Uint8Array {
    return hmac(sha512, key, data);
  }

  static generatePbkdf2Key(normalizedMnemonic: string, normalizedPass: string): Uint8Array {
    return pbkdf2(sha512, normalizedMnemonic, normalizedPass, { c: 2048, dkLen: 64 });
  }

  static normalizeChars(chars: string): string {
    return chars.normalize("NFKD");
  }

  static getRandomBytes(length = 32): Uint8Array {
    return utils.randomBytes(length);
  }
}
