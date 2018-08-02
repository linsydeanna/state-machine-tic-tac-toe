import React, { Component } from 'react';
import './App.css';
import { Machine } from 'xstate';

const squareState = Machine({
  "initial": "empty",
  "states": {
    "empty": {
      "on": {
        "CLICK_X": "marked_x",
        "CLICK_O": "marked_o"
      }
    },
    "marked_x": {},
    "marked_o": {}
  }
})

const turn = Machine({
  "initial": "xIsNext",
  "states": {
    "xIsNext": {
      "on": {
        "CLICK_SQUARE": "oIsNext",
        "X_WON": "xWon",
        "O_WON": "oWon"
      }
    },
    "oIsNext": {
      "on": {
        "CLICK_SQUARE": "xIsNext",
        "O_WON": "oWon",
        "X_WON": "xWon"
      }
    },
    "xWon": {},
    "oWon": {}
  }
})

const Square = props => (
  <div className="square" onClick={props.onClick}>{props.mark}</div>
)

class App extends Component {
  constructor() {
    super()


    const squares = []

    for (let i = 0; i < 9; i++) {
      squares.push(squareState.initial)
    }
    this.changeSquareState = this.changeSquareState.bind(this)
    this.checkForWinner = this.checkForWinner.bind(this)
    this.state = {
      turn: turn.initial,
      squareState: squareState.initial,
      squares
    }
  }


  changeSquareState(index, player) {
    if (this.state.squares[index] !== "empty") {
      return
    }
    let event = 'CLICK_' + player
    const newSquares = this.state.squares

    newSquares[index] = squareState
      .transition(this.state.squares[index], event)
      .value

    this.setState({
      turn: turn
        .transition(this.state.turn, 'CLICK_SQUARE')
        .value,
      squares: newSquares
    })

    this.checkForWinner()
  }

  checkForWinner() {
    const winningLines = [
      [0, 1, 2]
      , [3, 4, 5]
      , [6, 7, 8]
      , [0, 3, 6]
      , [1, 4, 7]
      , [2, 5, 8]
      , [0, 4, 8]
      , [2, 4, 6]
    ]

    for (let line of winningLines) {
      let xWon = line.every((index) => {
        return this.state.squares[index] === "marked_x"
      })

      console.log('xWon ', xWon)

      if (xWon) return this.setState({
        turn: turn
          .transition(this.state.turn, "X_WON")
          .value
      })

      let oWon = line.every((index) => {
        return this.state.squares[index] === "marked_o"
      })

      if (oWon) return this.setState({
        turn: turn
          .transition(this.state.turn, "O_WON")
          .value
      })

    }

    console.log("No winner yet!")

  }



  render() {
    let displayTurn = this.state.turn === 'xIsNext' ? 'X' : 'O';
    return (
      <div className="container"  >
        <div className="game">
          <div className="board">
            {this.state.squares.map((mark, i) => (
              <Square key={i} mark={this.state.squares[i] === "empty" ? null : (this.state.squares[i] === "marked_x" ? "X" : "O")} onClick={() => this.changeSquareState(i, displayTurn)} />
            ))}
          </div>
        </div>
        <div className="game-info">
          <div className="next-player">Next Player: {displayTurn}</div>
          <div className="winner">{this.state.turn === "xWon" || this.state.turn === "oWon" ? (this.state.turn === "xWon" ? "X won!" : "O won!") : ""}</div>
        </div>
      </div>
    );
  }
}

export default App;
