import { CURVE, Point } from "@noble/secp256k1";

export class CryptoContext {
  getModulus(): bigint {
    return CURVE.P; //not sure, need to check
  }

  getOrder(): bigint {
    return CURVE.n;
  }

  validatePoint(x: bigint, y: bigint): Point | null /* should't be a bool? */ {
    try {
      const point = new Point(x, y);
      point.assertValidity();

      return point;
    } catch {
      return null;
    }
  }

  getInfinity(): Point {
    return Point.ZERO;
  }

  decodePoint(encoded: Uint8Array): Point {
    return Point.fromHex(encoded);
  }

  getGenerator(): Point {
    return Point.BASE;
  }
}
