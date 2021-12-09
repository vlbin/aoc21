import * as fs from 'fs';
const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line) => line.split('').map(Number));

const part1 = () => {
  const lowPoints: number[] = [];

  input.forEach((row, i) => {
    row.forEach((cell, j) => {
      const adjacents = adj(i, j, input);
      if (adjacents.every((x) => x > cell)) {
        lowPoints.push(cell + 1);
      }
    });
  });

  const result = lowPoints.reduce((prev, curr) => prev + curr, 0);
  console.log(result);
};

const part2 = () => {
  const lows = lowPoints(input);
  const basins: number[][][] = [];

  lows.forEach((low) => {
    basins.push([...createBasin(low[0], low[1], input)]);
  });

  const largest = basins
    .sort((a, b) => b.length - a.length)
    .filter((_, i) => i < 3)
    .reduce((acc, basin) => (acc *= basin.length), 1);

  console.log(largest);
};

const createBasin = (
  i: number,
  j: number,
  input: number[][]
): Set<number[]> => {
  const basin: Set<number[]> = new DeepSet();
  const toCheck = adjacentBasinCells(i, j, input);

  basin.add([i, j]);

  while (toCheck.length > 0) {
    const [r, c] = toCheck.pop() ?? [0, 0];
    basin.add([r, c]);

    const adjacents = adjacentBasinCells(r, c, input);

    adjacents.forEach((x) => {
      if (!basin.has(x)) {
        toCheck.push(x);
      }
      basin.add(x);
    });
  }

  return basin;
};

export class DeepSet extends Set {
  add(o: any) {
    for (let i of this) if (this.deepCompare(o, i)) return this;
    super.add.call(this, o);
    return this;
  }

  has(o: any) {
    for (let i of this) if (this.deepCompare(o, i)) return true;
    return false;
  }

  private deepCompare(o: any, i: any) {
    return JSON.stringify(o) === JSON.stringify(i);
  }
}

const adjacentBasinCells = (i: number, j: number, matrix: number[][]) => {
  const adjacents: number[][] = [];
  if (i < matrix.length - 1) {
    adjacents.push([i + 1, j]);
  }
  if (i > 0) {
    adjacents.push([i - 1, j]);
  }
  if (j < matrix[0].length - 1) {
    adjacents.push([i, j + 1]);
  }
  if (j > 0) {
    adjacents.push([i, j - 1]);
  }

  return adjacents.filter(([i, j]) => matrix[i][j] < 9);
};

const lowPoints = (matrix: number[][]) => {
  const _lp: number[][] = [];
  input.forEach((row, i) => {
    row.forEach((cell, j) => {
      const adjacents = adj(i, j, input);
      if (adjacents.every((x) => x > cell)) {
        _lp.push([i, j]);
      }
    });
  });
  return _lp;
};

const adj = (i: number, j: number, matrix: number[][]) => {
  const adjacents: number[] = [];
  if (i < matrix.length - 1) {
    adjacents.push(matrix[i + 1][j]);
  }
  if (i > 0) {
    adjacents.push(matrix[i - 1][j]);
  }
  if (j < matrix[0].length - 1) {
    adjacents.push(matrix[i][j + 1]);
  }
  if (j > 0) {
    adjacents.push(matrix[i][j - 1]);
  }

  return adjacents;
};

part2();
