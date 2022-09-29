import { EcPoint } from "./EcPoint";
import { CryptoFacade } from "./cryptoFacade";

describe("EC points", () => {
  const p1 = EcPoint.fromHex("0381c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac");

  it("Should negate point", () => {
    expect(CryptoFacade.negatePoint(p1).toHex()).toBe(
      "0281c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac"
    );
  });
});
