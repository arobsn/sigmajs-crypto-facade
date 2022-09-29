import { Point } from "@noble/secp256k1";
import { EcPoint } from "./EcPoint";
import { CryptoContext } from "./cryptoContext";

export class CryptoFacade {
  // def normalizePoint(p: Ecp): Ecp = Platform.normalizePoint(p)
  static normalizePoint(point: EcPoint): EcPoint {
    return point.normalize();
  }

  // def createCryptoContext(): CryptoContext = Platform.createContext()
  static createCryptoContext(): CryptoContext {
    return new CryptoContext();
  }

  // def negatePoint(p: Ecp): Ecp = Platform.negatePoint(p)
  static negatePoint(point: EcPoint): EcPoint {
    return point.negate();
  }

  // def isInfinityPoint(p: Ecp): Boolean = Platform.isInfinityPoint(p)
  static isInfinityPoint(point: EcPoint): boolean {
    return point.isInfinity();
  }

  // def multiplyPoint(p: Ecp, n: BigInteger): Ecp = Platform.multiplyPoint(p, n)
  static multiplyPoint(point: EcPoint, n: bigint): EcPoint {
    return point.multiply(n);
  }

  // def addPoint(p1: Ecp, p2: Ecp): Ecp = Platform.addPoint(p1, p2)
  static addPoint(point1: EcPoint, point2: EcPoint): EcPoint {
    return point1.add(point2);
  }

  // def showPoint(p: Ecp): String = Platform.showPoint(p)
  static showPoint(point: EcPoint): string {
    return point.toString();
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
  static getXCoord(point: EcPoint): bigint {
    return point.x;
  }

  // def getYCoord(p: Ecp): ECFieldElem = Platform.getYCoord(p)
  static getYCoord(point: EcPoint): bigint {
    return point.y;
  }

  // def getAffineXCoord(p: Ecp): ECFieldElem = Platform.getAffineXCoord(p)
  static getAffineXCoord(point: EcPoint): bigint {
    return new Point(point.x, point.y).x;
  }

  // def getAffineYCoord(p: Ecp): ECFieldElem = Platform.getAffineYCoord(p)
  static getAffineYCoord(point: EcPoint): bigint {
    return new Point(point.x, point.y).y;
  }
}
