import { Point, utils } from "@noble/secp256k1";
import { CryptoContext } from "./cryptoContext";

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
    throw Error("Not implemented.");
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
}
