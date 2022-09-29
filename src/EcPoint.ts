import { Point } from "@noble/secp256k1";

/**
 * EC Point wrapper
 */
export class EcPoint {
  private readonly _point: Point;

  private constructor(point: Point) {
    this._point = point;
  }

  static fromCoordinates(x: bigint, y: bigint): EcPoint {
    return new EcPoint(new Point(x, y));
  }

  static fromHex(hex: string | Uint8Array): EcPoint {
    return new EcPoint(Point.fromHex(hex));
  }

  static get infinity(): EcPoint {
    return new EcPoint(Point.ZERO);
  }

  static get generator(): EcPoint {
    return new EcPoint(Point.BASE);
  }

  get x(): bigint {
    return this._point.x;
  }

  get y(): bigint {
    return this._point.y;
  }

  negate(): EcPoint {
    return new EcPoint(this._point.negate());
  }

  multiply(scalar: bigint): EcPoint {
    return new EcPoint(this._point.multiply(scalar));
  }

  add(p2: EcPoint): EcPoint {
    return new EcPoint(this._point.add(p2._point));
  }

  normalize(): EcPoint {
    return EcPoint.fromHex(this._point.toHex());
  }

  isInfinity(): boolean {
    return this._point.equals(Point.ZERO);
  }

  toHex(): string {
    return this._point.toHex(true);
  }

  toBytes(): Uint8Array {
    return this._point.toRawBytes();
  }

  toString(): string {
    throw Error("Not implemented.");
  }

  validate(): void {
    this._point.assertValidity();
  }
}
