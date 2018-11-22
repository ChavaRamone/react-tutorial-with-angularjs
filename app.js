function squareController() {

}

function squareTemplate($element, $attrs) {
  return `
    <button class="square" ng-click="square.onClick()">
      {{square.value}}
    </button>`
}

function boardController() {
  this.status = 'Next player: X';
  this.squares = Array(9).fill(null);
  this.xIsNext = true;
  this.handleClick = function (i) {
    const squares = this.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.xIsNext ? 'X' : 'O';
    this.squares = squares;
    this.xIsNext = !this.xIsNext;
    const winner = calculateWinner(this.squares);
    if (winner) {
      this.status = 'Winner: ' + winner;
    } else {
      this.status = `Next player: ${this.xIsNext ? 'X' : 'O'}`;
    }
  }
}

function boardTemplate($element, $attrs) {
  // access to $element and $attrs

  function renderSquare(i) {
    return `<square value="{{board.squares[${i}]}}" on-click="board.handleClick(${i})"></square>`
  }

  return `
    <div>
      <div class="status">{{board.status}}</div>
      <div class="board-row">
        ${renderSquare(0)}
        ${renderSquare(1)}
        ${renderSquare(2)}
      </div>
      <div class="board-row">
        ${renderSquare(3)}
        ${renderSquare(4)}
        ${renderSquare(5)}
      </div>
      <div class="board-row">
        ${renderSquare(6)}
        ${renderSquare(7)}
        ${renderSquare(8)}
      </div>
    </div>`
}

function gameController() {

}

function gameTemplate($element, $attrs) {
  // access to $element and $attrs
  return `
    <div class="game">
      <div class="game-board">
        <board />
      </div>
      <div class="game-info">
        <div><!-- status --></div>
        <ol><!-- TODO --></ol>
      </div>
    </div>`
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

angular.module('ticTacToe', [])
  .component('square', {
    controller: squareController,
    controllerAs: 'square',
    template: squareTemplate,
    bindings: {
      value: '@',
      onClick: "&"
    }
  })
  .component('board', {
    controller: boardController,
    controllerAs: 'board',
    template: boardTemplate,
  })
  .component('game', {
    controller: gameController,
    controllerAs: 'game',
    template: gameTemplate,
  })