import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/tictactoe.css";
import Notification from "./notification";
import { makeMove } from "../api/move";
import { useGlobalContext } from "../../context/walletContext";

export default function TicTacToe() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [result, setResult] = useState(null);

  const { Play } = useGlobalContext();


const renderSquare = (index) => (
  <Col
    xs={4}
    className={`square ${
      index === 2 || index === 5 || index === 8 ? "" : "border-right"
    } 
      ${index === 6 || index === 7 || index === 8 ? "" : "border-bottom"}`}
    onClick={() => handleClick(index)}
  >
    <div className="content">{board[index]}</div>
  </Col>
);

 const updateBoard = (index, value, newBoard) => {
   newBoard[index] = value;
   setBoard([...newBoard]);
 };

 const handleClick = async (index) => {
   let newBoard = [...board];
   updateBoard(index, "O", newBoard);

   const data = await makeMove(index);

   if (data && data.ai_move !== undefined) {
     updateBoard(data.ai_move, "X", newBoard);
   }

   if (data && data.winner !== undefined) {
    //  alert("Play RUN")
     setResult(data.winner);
    //  if(data.winner === "X") Play(false);
    //  else if(data.winner === "O") Play(true);
     return;
   }

 };

  return (
    <>
      {result === null ? (
        <Container style={{ margin: "8% 0 0 19%", width: "60%" }}>
          <Row className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </Row>
          <Row className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </Row>
          <Row className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </Row>
        </Container>
      ) : (
        <Notification
          result={result}
          setResult={setResult}
          setBoard={setBoard}
        />
      )}
    </>
  );
}

