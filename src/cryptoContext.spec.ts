import { CryptoContext } from "./cryptoContext";
import { Point } from "./noble-secp256k1";

describe("Crypto context", () => {
  const context = new CryptoContext();
  const modulus = 115792089237316195423570985008687907853269984665640564039457584007908834671663n;
  const order = 115792089237316195423570985008687907852837564279074904382605163141518161494337n;
  const generatorPointHex = "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798";

  const p1 = {
    hex: "0381c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac",
    x: 58696697963552658225209022604545906839720992139040109583461478932841590007980n,
    y: 99221890655421281687240657051313379827030356718751695543666346070432252019955n
  };

  it("Should get modulus", () => {
    expect(context.getModulus()).toBe(modulus);
  });

  it("Should get order", () => {
    expect(context.getOrder()).toBe(order);
  });

  it("Should validate points", () => {
    expect(context.validatePoint(p1.x, p1.y)).toEqual(new Point(p1.x, p1.y));
    expect(context.validatePoint(1n, 2n)).toBeFalsy();
  });

  it("Should get infinity point", () => {
    expect(context.getInfinity().toHex(true)).toBe(Point.ZERO.toHex(true));
  });

  it("Should decode a point", () => {
    const decodedPoint = context.decodePoint(Buffer.from(p1.hex, "hex"));

    expect(decodedPoint.x).toBe(p1.x);
    expect(decodedPoint.y).toBe(p1.y);
  });

  it("Should get generator point", () => {
    expect(context.getGenerator().toHex(true)).toBe(generatorPointHex);
  });
});
