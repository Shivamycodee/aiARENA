import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ChessBoard() {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {

    const result = game.move(move);
    setGame(new Chess(game.fen()));
        console.log(game.fen()); 
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare, targetSquare) {
    if (sourceSquare === targetSquare){
       console.log("u fucked up")
       return false; 
      }// Skip if the piece was dropped on its starting square
      
    let moveObj = {
      from: sourceSquare,
      to: targetSquare,
    };

    // If a pawn is being promoted, add the promotion field.
    if (
      (game.turn() === "w" && targetSquare[1] === "8") ||
      (game.turn() === "b" && targetSquare[1] === "1")
    ) {
      moveObj.promotion = "q"; // Promote to queen
    }

    const move = makeAMove(moveObj);
    if (move === null) return false;

    setTimeout(makeRandomMove, 200);
    return true;
  }


  return (
    <div id="basicBoard-cont">
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
      />
    </div>
  );
}
