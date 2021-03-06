export const roll = (expression: string) => {
  // taken from http://codereview.stackexchange.com/a/40996
  const pattern = /(\d+)d(\d+)[\s]*([+-][\s]*\d+)?|([+-][\s]*\d+)/;
  const match = pattern.exec(expression);
  if (!match) {
    throw new Error(`Invalid dice notation: ${expression}`);
  }
  const isLooseModifier = typeof match[4] === 'string';
  if (match[4] && isLooseModifier) {
    const modifier = Number(match[4].replace(/[\s]*/g, ''));
    const d20Roll = Math.ceil(Math.random() * 20);
    return d20Roll + modifier;
  }
  const howMany = typeof match[1] === 'undefined' ? 1 : Number(match[1]);
  const dieSize = Number(match[2]);
  const rolls: number[] = [];
  for (let i = 0; i < howMany; i += 1) {
    rolls[i] = Math.ceil(Math.random() * dieSize);
  }
  const modifier = typeof match[3] === 'undefined'
    ? 0
    : Number(match[3].replace(/[\s]*/g, ''));
  return rolls.reduce((p, c) => c + p, 0) + modifier;
};
