import * as fs from 'fs';

const part1 = () => {
  let input = fs
    .readFileSync('input.txt', 'utf-8')
    .split('\n')
    .map((l) => l.split(' | ')[1])
    .map((l) => l.split(' '))
    .flat();
  console.log(input.filter((x) => [2, 3, 4, 7].includes(x.length)).length);
};

const part2 = () => {
  let file = fs.readFileSync('input.txt', 'utf-8').split('\n');

  let all = file.map((x) => x.replace(' | ', ' '));

  let output = file.map((l) => l.split(' | ')[1]);

  let total = 0;

  all.map((line, i) => {
    const arr = line.split(' ');
    const mapping: Array<string> = Array(10).fill('');

    arr
      .filter((word) => [2, 3, 4, 7].includes(word.length))
      .forEach((word) => {
        const ln = word.length;
        if (ln == 2) {
          mapping[1] = word;
        } else if (ln == 3) {
          mapping[7] = word;
        } else if (ln == 4) {
          mapping[4] = word;
        } else if (ln == 7) {
          mapping[8] = word;
        }
      });

    arr
      .filter((word) => word.length == 6)
      .forEach((word) => {
        if (!includesNumber(word, mapping[1])) {
          mapping[6] = word;
        } else if (includesNumber(word, mapping[4])) {
          mapping[9] = word;
        } else {
          mapping[0] = word;
        }
      });

    arr
      .filter((word) => word.length == 5)
      .forEach((word) => {
        if (includesNumber(word, mapping[1])) {
          mapping[3] = word;
        } else if (includesNumber(mapping[6], word)) {
          mapping[5] = word;
        } else {
          mapping[2] = word;
        }
      });

    const outNums = output[i].split(' ').map((x) => {
      let res = mapping.findIndex((m) => same(x, m));
      return res;
    });
    total += parseInt(outNums.join(''));
  });
  console.log(total);
};

const same = (s1: string, s2: string) => {
  const a1 = s1.split('').sort().join('');
  const a2 = s2.split('').sort().join('');
  return a1 == a2;
};

const includesNumber = (search: string, target: string, print = false) => {
  const v1 = search.split('');
  const v2 = target.split('');
  return v2.every((x) => v1.includes(x));
};

part2();
