import { useState, useEffect,useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());

  useEffect(() => {
    setFen(game.fen());
  }, [game]);

  const fromPos = useRef();


function makeAMove(move) {
  let result = null;
  setGame((prevGame) => {
    const newGame = new Chess(prevGame.fen());
    result = newGame.move(move);
    if (result) {
      setFen(newGame.fen()); // Update FEN only if move is successful
      return newGame; // Update game state with newGame when move is successful
    }
    return prevGame; // If move is not successful, return prevGame to keep game state unchanged
  });
  return result;
}


  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return;
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare, targetSquare) {
    const piece = game.get(sourceSquare);
    if (!piece) return false;

    const isPromotion =
      piece.type === "p" &&
      (targetSquare[1] === "8" || targetSquare[1] === "1");

    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: isPromotion ? "q" : undefined,
    });

    if (move === null) return false;
    setTimeout(makeRandomMove, 1000);
    return true;
  }

  return (
    <div style={{ margin: "auto",marginLeft:"1%" }}>
      <Chessboard
        boardOrientation="white"
        boardWidth={620}
        position={fen}
        onPieceDrop={({ sourceSquare, targetSquare }) =>
          onDrop(sourceSquare, targetSquare)
        }
        arePiecesDraggable={true}
        showBoardNotation={true}
        snapToCursor={true}
      />
    </div>
  );
}
