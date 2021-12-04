import * as fs from 'fs';
const file = fs.readFileSync('input.txt', 'utf-8');

const x = file.split('\n\n').slice(1);
const _boards = x.map((board) => board.split('\n'));
const boards = _boards.map((board) =>
  board.map((line) =>
    line
      .trim()
      .replace(/ +(?= )/g, '')
      .split(' ')
  )
);

const game = () => {
  const draws = file.split('\n\n')[0].split(',');
  let noBingo = true;
  let dragged: Array<string> = [];
  while (noBingo) {
    const drag = draws.shift();

    if (!drag) {
      break;
    }

    dragged.push(drag);
    const bingo = boards.map((board) => hasBingo(board, dragged));
    if (bingo.some((x) => x == true)) {
      noBingo = false;
      const bingoBoard = boards[bingo.findIndex((x) => x == true)];
      const unmarkedSum = calcUnmarkedSum(bingoBoard, dragged);
      console.log(unmarkedSum * Number(drag));
    }
  }
};

const game2 = () => {
  const draws = file.split('\n\n')[0].split(',');
  let allBingo = false;
  let dragged: Array<string> = [];
  let bingoBoards: string[][][] = [];
  while (!allBingo) {
    const drag = draws.shift();

    if (!drag) {
      break;
    }

    dragged.push(drag);

    bingoBoards = bingoBoards.concat(
      boards.filter((b) => hasBingo(b, dragged) && !bingoBoards.includes(b))
    );

    if (bingoBoards.length == boards.length || draws.length == 0) {
      allBingo = true;
      const bingoBoard = bingoBoards[bingoBoards.length - 1];
      const unmarkedSum = calcUnmarkedSum(bingoBoard, dragged);
      console.log(unmarkedSum * Number(drag));
    }
  }
};

const calcUnmarkedSum = (board: string[][], dragged: string[]) => {
  return board
    .flat()
    .filter((x) => !dragged.includes(x))
    .map((x) => Number(x))
    .reduce((a, b) => a + b, 0);
};

const hasBingo = (
  board: Array<Array<string>>,
  draggedNumbers: Array<string>
) => {
  const rowBingo = board.filter(
    (row) => row.filter((n) => draggedNumbers.includes(n)).length == 5
  );

  const transposed = board[0].map((_, ci) => board.map((row) => row[ci]));

  const colBingo = transposed.filter(
    (row) => row.filter((n) => draggedNumbers.includes(n)).length == 5
  );

  return rowBingo.length > 0 || colBingo.length > 0;
};

game();
game2();
