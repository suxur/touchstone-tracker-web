import CalculateHitDice from "../CalculateHitDice";

describe("CalculateHitDice", () => {
  describe("calculate", () => {
    const dataSet = [
      { expected: "2d4+2", hp: 7, modifier: 1, size: "tiny" },
      { expected: "2d6-2", hp: 5, modifier: -1, size: "small" },
      { expected: "6d6+6", hp: 27, modifier: 1, size: "small" },
      { expected: "2d8", hp: 9, modifier: 0, size: "medium" },
      { expected: "13d8+38", hp: 97, modifier: 3, size: "medium" },
      { expected: "18d10+36", hp: 135, modifier: 2, size: "large" },
      { expected: "20d12+100", hp: 230, modifier: 5, size: "huge" },
      { expected: "28d20+252", hp: 546, modifier: 9, size: "gargantuan" },
    ];

    it.each(dataSet)(
      "returns calculated hit dice",
      ({ expected, hp, modifier, size }) => {
        const calculateHitDice = new CalculateHitDice(hp, modifier, size);

        const result = calculateHitDice.calculate();
        expect(result).toBe(expected);
      }
    );
  });
});
