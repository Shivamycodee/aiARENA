import React,{useState} from 'react'
import "../styles/notification.scss";
import { useGlobalContext } from '../../context/walletContext';


function Notification({ result, setResult, setBoard }) {

  const changeResult = async() => {
    setResult(null);
    setBoard(Array(9).fill(null));

  const response = await fetch("http://127.0.0.1:5000/new_game", {
    method: "POST",
  });
  const data = await response.json();
  console.log(data.message);  

  };

  const resultMsg = () => {
    if (result === "X") {
        Play(false);
        return "You Lost!";
    } else if (result === "O") {
        Play(true);
        return "You Won!";
    } else if (result === "tie") {
        return "It's a Tie!";
    }
}



  return (
    <>
      {result !== null ? (
        result === "X" ? (
          <div className="container-notify" style={{ margin: "6% 7%" }}>
            <div id="error-box">
              <div class="dot"></div>
              <div class="dot two"></div>
              <div class="face2">
                <div class="eye"></div>
                <div class="eye right"></div>
                <div class="mouth sad"></div>
              </div>
              <div class="shadow move"></div>
              <div class="message">
                <h1 class="alert">{resultMsg()}</h1>
                <p>Give it another shot. 😉</p>
              </div>
              <button onClick={() => changeResult()} class="button-box">
                <h1 class="red">Restart</h1>
              </button>
            </div>
          </div>
        ) : (
          <div className="container-notify">
            <div id="success-box">
              <div class="dot"></div>
              <div class="dot two"></div>
              <div class="face">
                <div class="eye"></div>
                <div class="eye right"></div>
                <div class="mouth happy"></div>
              </div>
              <div class="shadow scale"></div>
              <div class="message">
                <h1 class="alert">{resultMsg()}</h1>
                <p>wanna give another try 🚀</p>
              </div>
              <button onClick={() => changeResult()} class="button-box">
                <h1 class="green">Restart</h1>
              </button>
            </div>
          </div>
        )
      ) : null}
    </>
  );
}

export default Notification