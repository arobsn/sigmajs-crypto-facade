import { Point } from "@noble/secp256k1";
import { CryptoFacade } from "./cryptoFacade";

describe("EC points", () => {
  const p1 = Point.fromHex("0381c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac");
  const infinity = Point.ZERO;

  it("Should negate point", () => {
    expect(CryptoFacade.negatePoint(p1).toHex(true)).toBe(
      "0281c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac"
    );
  });

  it("Should normalize point", () => {
    expect(CryptoFacade.normalizePoint(p1).toHex(true)).toBe(p1.toHex(true));
  });

  it("Should return true if is infinity point", () => {
    expect(CryptoFacade.isInfinityPoint(infinity)).toBeTruthy();
  });
});
