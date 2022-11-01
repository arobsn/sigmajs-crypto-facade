import { CryptoFacade } from "./cryptoFacade";
import { CURVE, Point } from "./noble-secp256k1";

describe("EC points", () => {
  const p1 = Point.fromHex("0381c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac");
  const p2 = Point.fromHex("02198064ec24024bb8b300e20dd18e33cc1fccb0fea73940bd9a1d3d9d6c3ddd8f");
  const infinity = Point.ZERO;

  it("Should normalize point", () => {
    expect(CryptoFacade.normalizePoint(p1).toHex(true)).toBe(p1.toHex(true));
  });

  it("Should create crypto context", () => {
    expect(CryptoFacade.createCryptoContext()).toBeTruthy();
  });

  it("Should negate point", () => {
    expect(CryptoFacade.negatePoint(p1).toHex(true)).toBe(
      "0281c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac"
    );
  });

  it("Should check infinity point", () => {
    expect(CryptoFacade.isInfinityPoint(infinity)).toBeTruthy();
    expect(CryptoFacade.isInfinityPoint(p1)).toBeFalsy();
  });

  it("Should multiply point", () => {
    expect(CryptoFacade.multiplyPoint(p1, CURVE.n - 1n)).toEqual(
      Point.fromHex("0281c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac")
    );

    expect(CryptoFacade.multiplyPoint(p1, CURVE.n)).toEqual(Point.ZERO);

    expect(CryptoFacade.multiplyPoint(p1, CURVE.n + 1n)).toEqual(
      Point.fromHex("0381c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac")
    );
  });

  it("Should add point", () => {
    expect(CryptoFacade.addPoint(p1, p2)).toEqual(
      Point.fromHex("03de5e9c2806c05cd45a57d18c469743f42a0d2c84370b6662eb39d8a2990abed8")
    );
  });

  it("Should show point", () => {
    expect(CryptoFacade.showPoint(p1)).toBe("ECPoint(81c527,db5d99,...)");
    expect(CryptoFacade.showPoint(p2)).toBe("ECPoint(198064,811477,...)");
  });

  it("Should test bit zero of field element", () => {
    const testVectors = [
      {
        value: 58696697963552658225209022604545906839720992139040109583461478932841590007980n,
        expected: false
      },
      {
        value: 99221890655421281687240657051313379827030356718751695543666346070432252019955n,
        expected: true
      },
      {
        value: 11534674179847572339525410967292119666111600146005056703881161120062101118351n,
        expected: true
      },
      {
        value: 58384518810610603488166176247797257725226278383152129497027289229952751610898n,
        expected: false
      },
      {
        value: 53248006962404494469764696243319434838764093672738035895911945007004750906420n,
        expected: false
      },
      {
        value: 101865731467179904889950494818132658695802833332454014925098273981492319479977n,
        expected: true
      }
    ];

    for (const tv of testVectors) {
      expect(CryptoFacade.testBitZeroOfFieldElem(tv.value)).toBe(tv.expected);
    }
  });

  it("Should get encoded fields", () => {
    const p1Bytes = {
      x: Uint8Array.from(
        Buffer.from("81c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac", "hex")
      ),
      y: Uint8Array.from(
        Buffer.from("db5d999704ec84b62962f3e35889901d04a619cd6d81d251c69d0f625c2dc4f3", "hex")
      )
    };

    expect(CryptoFacade.getEncodedOfFieldElem(p1.x)).toEqual(p1Bytes.x);
    expect(CryptoFacade.getEncodedOfFieldElem(p1.y)).toEqual(p1Bytes.y);
  });

  it("Should get coordinates", () => {
    expect(CryptoFacade.getXCoord(p1)).toBe(p1.x);
    expect(CryptoFacade.getYCoord(p1)).toBe(p1.y);
  });

  it("Should get affine coordinates", () => {
    expect(CryptoFacade.getAffineXCoord(p1)).toBe(p1.x);
    expect(CryptoFacade.getAffineYCoord(p1)).toBe(p1.y);
  });
});
