import * as fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

type ClosingBracket = ')' | ']' | '}' | '>';
type OpeningBracket = '(' | '[' | '{' | '<';

type Bracket = ClosingBracket & OpeningBracket;

const openingBrackets = '({[<';
const closingBrackets = ')}]>';

const bracketPairs: Record<OpeningBracket, ClosingBracket> = {
  '(': ')',
  '{': '}',
  '[': ']',
  '<': '>',
};

const part1 = () => {
  const points: Record<ClosingBracket, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };
  let total = 0;
  input.forEach((line, i) => {
    const chars = line.split('') as (OpeningBracket & ClosingBracket)[];

    const opening: OpeningBracket[] = [];
    for (let char of chars) {
      if (openingBrackets.includes(char)) {
        opening.push(char);
      } else {
        const currentOpen = opening[opening.length - 1];
        opening.pop();
        if (bracketPairs[currentOpen] != char) {
          total += points[char];
          break;
        }
      }
    }
  });
  console.log(total);
};

const isCorrupt = (line: (OpeningBracket & ClosingBracket)[]) => {
  const opening: OpeningBracket[] = [];
  for (let char of line) {
    if (openingBrackets.includes(char)) {
      opening.push(char);
    } else {
      const currentOpen = opening[opening.length - 1];
      opening.pop();
      if (bracketPairs[currentOpen] != char) {
        return true;
      }
    }
  }
};

const part2 = () => {
  const points: Record<ClosingBracket, number> = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };
  const lines = input.map(
    (x) => x.split('') as (OpeningBracket & ClosingBracket)[]
  );
  const totals: number[] = [];
  const incompletes = lines.filter((x) => !isCorrupt(x));
  incompletes.forEach((line) => {
    const opening: OpeningBracket[] = [];
    for (let char of line) {
      if (openingBrackets.includes(char)) {
        opening.push(char);
      } else {
        const currentOpen = opening[opening.length - 1];

        if (bracketPairs[currentOpen] == char) {
          opening.pop();
        }
      }
    }

    const closing = opening.reverse().map((x) => bracketPairs[x]);
    totals.push(
      closing.reduce((acc, bracket) => {
        return acc * 5 + points[bracket];
      }, 0)
    );
  });

  console.log(totals.sort((a, b) => a - b)[Math.floor(totals.length / 2)]);
};

part1();
part2();
