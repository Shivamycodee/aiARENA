import React,{useState} from 'react'
import "../styles/notification.scss";


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
        return "You Lost!";
    } else if (result === "O") {
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
              <div className="dot"></div>
              <div className="dot two"></div>
              <div className="face2">
                <div className="eye"></div>
                <div className="eye right"></div>
                <div className="mouth sad"></div>
              </div>
              <div className="shadow move"></div>
              <div className="message">
                <h1 className="alert">{resultMsg()}</h1>
                <p>Give it another shot. 😉</p>
              </div>
              <button onClick={() => changeResult()} className="button-box">
                <h1 className="red">Restart</h1>
              </button>
            </div>
          </div>
        ) : (
          <div className="container-notify">
            <div id="success-box">
              <div className="dot"></div>
              <div className="dot two"></div>
              <div className="face">
                <div className="eye"></div>
                <div className="eye right"></div>
                <div className="mouth happy"></div>
              </div>
              <div className="shadow scale"></div>
              <div className="message">
                <h1 className="alert">{resultMsg()}</h1>
                <p>wanna give another try 🚀</p>
              </div>
              <button onClick={() => changeResult()} className="button-box">
                <h1 className="green">Restart</h1>
              </button>
            </div>
          </div>
        )
      ) : null}
    </>
  );
}

export default Notification