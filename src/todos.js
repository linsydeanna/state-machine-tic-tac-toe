// states: {
//   gameStart: true,
//   gameEnd: true,
//   currentBoard: [ "O", "X", "O", "X", "O", "X", "X", "O", "X" ],
//   xIsNext: true,
//   oIsNext: true,
// }

// Add onClick to toggle between X and O
// -------------------------------------

// STATE BEFORE: xIsNext
// EVENT: onClick of square
// STATE AFTER: oIsNext


// {
//   "initial": "xIsNext",
//   "states": {
//     "xIsNext": {
//       "on": {
//         "CLICK_SQUARE": "oIsNext"
//       }
//     },
//     "oIsNext": {
//       "on": {
//         "CLICK_SQUARE": "xIsNext"
//       }
//     }
//   }
// }



// Add onClick for pieces and begin storing state of moves as an array (currentBoard)
// ---------------------------------------------------------------------------------

// STATE BEFORE: currentBoard: [ "O", "X", "O", "X", null, "X", "X", "O", "X" ]
// EVENT: onClick of square
// STATE AFTER: currentBoard: [ "O", "X", "O", "X", "O", "X", "X", "O", "X" ]




// Check for gameEnd state on each onClick
// ---------------------------------------





