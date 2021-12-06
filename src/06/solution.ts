import * as fs from 'fs';
let input = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number);

const solution = (maxValue: number) => {
  let record: Array<number> = Array(9).fill(0);

  input.forEach((x) => {
    record[x] += 1;
  });

  for (let i = 1; i <= maxValue; i++) {
    const tmp_6 = record[0];
    record = arrayRotate(record);
    record[8] = tmp_6;
    record[6] += tmp_6;
  }

  console.log(record.reduce((acc, curr) => (acc += curr), 0));
};

const arrayRotate = (arr: Array<number>): Array<number> => {
  arr.push(arr.shift() ?? 0);
  return arr;
};

solution(80);
solution(256);
