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
  this.handleClick = function (i) {
    const squares = this.squares.slice();
    squares[i] = 'X';
    this.squares = squares;
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