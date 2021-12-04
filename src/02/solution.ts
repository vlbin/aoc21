import * as fs from 'fs';
const file = fs.readFileSync('input.txt', 'utf-8');

let list = file.split('\n').map((line) => line.split(' '));

const part1 = () => {
  const pos = {
    d: 0,
    h: 0,
  };

  list.forEach((ins) => {
    if (ins[0].startsWith('f')) {
      pos.h += Number(ins[1]);
    } else if (ins[0].startsWith('u')) {
      pos.d -= Number(ins[1]);
    } else {
      pos.d += Number(ins[1]);
    }
  });

  return pos.d * pos.h;
};

const part2 = () => {
  const pos = {
    d: 0,
    h: 0,
    a: 0,
  };

  list.forEach((ins) => {
    if (ins[0].startsWith('f')) {
      pos.h += Number(ins[1]);
      pos.d += Number(ins[1]) * pos.a;
    } else if (ins[0].startsWith('u')) {
      pos.a -= Number(ins[1]);
    } else {
      pos.a += Number(ins[1]);
    }
  });

  return pos.d * pos.h;
};

console.log(part2());
