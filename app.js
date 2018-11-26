function squareController() {

}

function squareTemplate($element, $attrs) {
  return `
    <button class="square" ng-click="square.onClick()">
      {{square.value}}
    </button>`
}

function boardController() {

}

function boardTemplate($element, $attrs) {
  // access to $element and $attrs

  function renderSquare(i) {
    return `
      <square 
        value="{{board.squares[${i}]}}" on-click="board.onClick(${i})">
        </square>`
  }

  return `
    <div>
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
  this.status = 'Next player: X';
  this.history = [{
    squares: Array(9).fill(null)
  }];
  this.current = this.history[this.history.length - 1];
  this.moves = this.history.map(() => {
    return 'Go to game start';
  });
  this.xIsNext = true;

  this.handleClick = function (i) {
    const history = this.game.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.game.xIsNext ? 'X' : 'O';
    this.game.history = history.concat([{
      squares: squares,
    }]);
    this.game.current = this.game.history[this.game.history.length - 1];
    this.game.xIsNext = !this.game.xIsNext;
    const winner = calculateWinner(squares);
    if (winner) {
      this.game.status = 'Winner: ' + winner;
    } else {
      this.game.status = `Next player: ${this.game.xIsNext ? 'X' : 'O'}`;
    }
    this.game.moves = this.game.history.map((step, move) => {
      return move ?
        'Go to move #' + move :
        'Go to game start';
    });
  }
}

function gameTemplate($element, $attrs) {
  // access to $element and $attrs
  return `
    <div class="game">
      <div class="game-board">
        <board squares="game.current.squares" on-click="game.handleClick">
        </board>
      </div>
      <div class="game-info">
        <div>{{game.status}}</div>
        <ol>
          <li ng-repeat="move in game.moves">
            <button ng-click="game.jumpTo($index)">{{move}}</button>
          </li>
        </ol>
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
    bindings: {
      squares: '=',
      onClick: "="
    },
    require: {
      game: '^game'
    }
  })
  .component('game', {
    controller: gameController,
    controllerAs: 'game',
    template: gameTemplate
  })