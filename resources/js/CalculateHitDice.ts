import { HitDiceBySize, OneOfByKey, Sizes } from "./types";

export default class CalculateHitDice {
  private hp: number;
  private modifier: number;
  private size: OneOfByKey<Sizes>;

  private additionalHitPoints = 0;
  private hitDiceAverage = 0;
  private numberOfDice = 0;

  private hitDice: HitDiceBySize = {
    tiny: 4,
    small: 6,
    medium: 8,
    large: 10,
    huge: 12,
    gargantuan: 20,
  };

  constructor(hp: number, modifier: number, size: OneOfByKey<Sizes>) {
    this.hp = hp;
    this.modifier = modifier;
    this.size = size;
  }

  calculate() {
    this.setHitDiceAverage();
    this.setNumberOfDice();
    this.setAdditionalHitPoints();

    return `${this.numberOfDiceString()}${this.additionalHitPointsString()}`;
  }

  setHitDiceAverage() {
    this.hitDiceAverage = (this.hitDiceSize() + 1) / 2;
  }

  setNumberOfDice() {
    // Hit Points / (Hit Dice Average + Constitution Modifier) = Number of Dice
    this.numberOfDice = Math.round(this.hp / (this.hitDiceAverage + this.modifier));
  }

  setAdditionalHitPoints() {
    // Hit Points  - (Number of Dice * Dice Average) = Additional Hit Points
    this.additionalHitPoints = Math.floor(this.hp - (this.numberOfDice * this.hitDiceAverage));
  }

  numberOfDiceString(): string {
    return `${this.numberOfDice}d${this.hitDiceSize()}`;
  }

  additionalHitPointsString(): string {
    if (this.additionalHitPoints === 0) {
      return '';
    }

    return `${this.modifierOperator()}${this.additionalHitPoints}`;
  }

  modifierOperator(): string {
    if (this.additionalHitPoints < 0) {
      return ''
    }

    return '+'
  }

  private hitDiceSize(): number {
    return this.hitDice[this.size];
  }
}
