import * as fs from 'fs';
let input = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

const range = (start: number, stop: number): Array<number> => {
  return Array.from({ length: stop - start + 1 }, (_, i) => start + i);
};

const part1 = () => {
  const numbers = range(Math.min(...input), Math.max(...input));
  const low = numbers.reduce((lowest, number) => {
    const res = input.reduce(
      (acc, curr) => (acc += Math.abs(curr - number)),
      0
    );

    if (lowest < 0 || res < lowest) {
      return res;
    }
    return lowest;
  }, -1);

  console.log(low);
};

const part2 = () => {
  const position = Math.floor(
    input.reduce((acc, curr) => acc + curr, 0) / input.length
  );

  const res = input.reduce((acc, curr) => {
    const diff = Math.abs(position - curr);
    const sum = diff * (diff + 1) * 0.5;

    return (acc += sum);
  }, 0);

  console.log(res);
};

part1();
part2();
