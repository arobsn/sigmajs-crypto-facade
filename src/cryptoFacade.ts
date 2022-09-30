import { Point } from "@noble/secp256k1";
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
    throw Error("Not implemented.");
  }

  // def testBitZeroOfFieldElem(p: ECFieldElem): Boolean = Platform.testBitZeroOfFieldElem(p)
  static testBitZeroOfFieldElem(element: bigint): boolean {
    throw Error("Not implemented.");
  }

  // def getEncodedOfFieldElem(p: ECFieldElem): Array[Byte] = Platform.getEncodedOfFieldElem(p)
  static getEncodedOfFieldElem(element: bigint): Uint8Array {
    throw Error("Not implemented.");
  }

  // def getXCoord(p: Ecp): ECFieldElem = Platform.getXCoord(p)
  static getXCoord(point: Point): bigint {
    return point.x;
  }

  // def getYCoord(p: Ecp): ECFieldElem = Platform.getYCoord(p)
  static getYCoord(point: Point): bigint {
    return point.y;
  }

  // def getAffineXCoord(p: Ecp): ECFieldElem = Platform.getAffineXCoord(p)
  static getAffineXCoord(point: Point): bigint {
    return new Point(point.x, point.y).x;
  }

  // def getAffineYCoord(p: Ecp): ECFieldElem = Platform.getAffineYCoord(p)
  static getAffineYCoord(point: Point): bigint {
    return new Point(point.x, point.y).y;
  }
}
