import { bytesToHex, hexToBytes, utf8ToBytes } from "@noble/hashes/utils";
import random from "random-bigint";
import { CryptoFacade } from "./cryptoFacade";
import { CURVE, Point } from "./noble-secp256k1";

const p1 = Point.fromHex("0381c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac");
const p2 = Point.fromHex("02198064ec24024bb8b300e20dd18e33cc1fccb0fea73940bd9a1d3d9d6c3ddd8f");

describe("EC points", () => {
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
    const order = CURVE.n;

    expect(CryptoFacade.multiplyPoint(p1, order)).toEqual(Point.ZERO);
    expect(CryptoFacade.multiplyPoint(p1, order - 1n)).toEqual(
      Point.fromHex("0281c5275b1d50c39a0c36c4561c3a37bff1d87e37a9ad69eab029e426c0b1a8ac")
    );
    expect(CryptoFacade.multiplyPoint(p1, order + 1n)).toEqual(
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

  it("Should hash HmacSHA512", () => {
    const testVectors = [
      {
        seed: "426974636f696e2073656564",
        data: "abc",
        hash: "2c15e87cde0f876fd8f060993748330cbe5f37c8bb3355e8ef44cea57890ec1d9b3274ef2b67bbe046cf8a012fba69796ec7803b1cc227521b9f5191e80a7da2"
      },
      {
        seed: "426974636f696e2073656564",
        data: "",
        hash: "300b155f751964276c0536230bd9b16fe7a86533c3cbaa7575e8d0431dbedf23f9945bb8b052bd0b0802c10c7c852e7765b69b61ce7233d9fe5a35ab108ca3b6"
      },
      {
        seed: "426974636f696e2073656564",
        data: "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq",
        hash: "888ead7cb2ff330420333cac103f1062a6a443170108f6f74e2cdf39468015ae792c4a822664ce5d865424d2569d67bec03abd2df2a924977d635d06a0b550a3"
      },
      {
        seed: "426974636f696e2073656564",
        data: "abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu",
        hash: "57edbc19570001de233edcb104237ea81439e59c5b0000d4db7bd991d228453827428d3cf30ecb4cdb17f00de3444579fa771f8933d2a7d9430b56dd989e55d9"
      }
    ];

    for (const tv of testVectors) {
      expect(
        bytesToHex(CryptoFacade.hashHmacSHA512(hexToBytes(tv.seed), utf8ToBytes(tv.data)))
      ).toBe(tv.hash);
    }
  });

  it("Should generate pbkdf2 key", () => {
    const testVectors = [
      {
        mnemonic:
          "slow silly start wash bundle suffer bulb ancient height spin express remind today effort helmet",
        password: "",
        keyHex:
          "e97efb594affe44261494fb366f6f3e8f506265b2865d3a5d173c5127d67c5d3fcb5bf7fe1b05cdad344df43ab87796810d545dbcba24f596275d8fceb846c98"
      },
      {
        mnemonic:
          "slow silly start wash bundle suffer bulb ancient height spin express remind today effort helmet",
        password: "pwd",
        keyHex:
          "0a8ea2ea0c4c12a9df88b005bda00c4de51ff36834b5fcd6a83667c371ad1da94bca1798690d87f2603b8f51d5ae025209e31f6cf81e12b84e4c543d236e58d0"
      }
    ];

    for (const tv of testVectors) {
      expect(bytesToHex(CryptoFacade.generatePbkdf2Key(tv.mnemonic, tv.password))).toBe(tv.keyHex);
    }
  });

  it("Should normalize strings", () => {
    const testVectors = [
      {
        raw: "slow silly start wash bundle suffer bulb ancient height spin express remind today effort helmet",
        normalized:
          "slow silly start wash bundle suffer bulb ancient height spin express remind today effort helmet"
      },
      {
        raw: "pwd",
        normalized: "pwd"
      }
    ];

    for (const tv of testVectors) {
      expect(CryptoFacade.normalizeChars(tv.raw)).toBe(tv.normalized);
    }
  });
});

describe("Tests from sigmastate-interpreter", () => {
  // https://github.com/ScorexFoundation/sigmastate-interpreter/blob/e1f434a5c389d7dfc3a99d0cead9627deb54da44/interpreter/shared/src/test/scala/sigmastate/crypto/GroupLawsSpecification.scala#L14

  const identity = Point.ZERO;
  const order = CURVE.n;
  let group = Point.ZERO;

  beforeEach(() => {
    group = new Point(random(256), random(256));
  });

  it("exponentiation", () => {
    expect(CryptoFacade.multiplyPoint(group, 0n)).toEqual(identity);
    expect(CryptoFacade.multiplyPoint(group, 1n)).toEqual(group);
    expect(CryptoFacade.multiplyPoint(group, order)).toEqual(identity);
    expect(CryptoFacade.multiplyPoint(group, order + 1n)).toEqual(group);
  });

  it("double inverse", () => {
    expect(CryptoFacade.negatePoint(CryptoFacade.negatePoint(group))).toEqual(group);
  });
});
