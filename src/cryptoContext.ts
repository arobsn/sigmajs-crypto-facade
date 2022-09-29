import { CURVE } from "@noble/secp256k1";
import { EcPoint } from "./EcPoint";

export class CryptoContext {
  getModulus(): bigint {
    return CURVE.P; //not sure, need to check
  }

  getOrder(): bigint {
    return CURVE.n;
  }

  validatePoint(x: bigint, y: bigint): EcPoint | null /* should't be a bool? */ {
    try {
      const point = EcPoint.fromCoordinates(x, y);
      point.validate();

      return point;
    } catch {
      return null;
    }
  }

  getInfinity(): EcPoint {
    return EcPoint.infinity;
  }

  decodePoint(encoded: Uint8Array): EcPoint {
    return EcPoint.fromHex(encoded);
  }

  getGenerator(): EcPoint {
    return EcPoint.generator;
  }
}
