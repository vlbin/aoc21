import * as fs from 'fs';
const file = fs.readFileSync('input.txt', 'utf-8');

let list = file.split('\n');

const part1 = () => {
  let _gamma: number[] = [];

  const len = [...Array(list[0].length).keys()];

  len.forEach((pos) => {
    let posList: string[] = [];
    list.forEach((line) => {
      posList.push(line.charAt(pos));
    });

    let mostcommon =
      posList.filter((n) => n === '1').length > list.length / 2 ? 1 : 0;

    _gamma.push(mostcommon);
  });

  let _epsilon = _gamma.map((n) => (n == 1 ? 0 : 1));

  let gamma = parseInt(_gamma.join(''), 2);
  let epsilon = parseInt(_epsilon.join(''), 2);

  console.log(gamma * epsilon);
};

part1();

const part2 = () => {
  let oxygen = [...list];

  for (let i = 0; i < list.length; i++) {
    const num = mostcommon(oxygen, i);
    oxygen = oxygen.filter((x) => x.charAt(i) == num.toString());
    if (oxygen.length == 1) {
      break;
    }
  }

  let co2 = [...list];

  for (let i = 0; i < list.length; i++) {
    const num = leastcommon(co2, i);
    co2 = co2.filter((x) => x.charAt(i) == num.toString());

    if (co2.length == 1) {
      break;
    }
  }

  console.log(parseInt(oxygen[0], 2) * parseInt(co2[0], 2));
};

const mostcommon = (list: string[], index: number) => {
  let ones = list.filter((l) => l.charAt(index) == '1');
  let most = ones.length >= list.length / 2 ? 1 : 0;
  return most;
};

const leastcommon = (list: string[], index: number) => {
  let zeros = list.filter((l) => l.charAt(index) == '0');
  let ones = list.filter((l) => l.charAt(index) == '1');
  if (zeros.length <= ones.length) {
    return 0;
  }

  return 1;
};

part2();
