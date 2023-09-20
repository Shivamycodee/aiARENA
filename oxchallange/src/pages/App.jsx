import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TicTacToe from './tictactoe'
import Chess from './chess'
import "../index.css";
import Parallax from "../components/parallax";


function Home() {
  return (
    <div id="full-body">
      <Parallax />
    </div>
  );
}

function App() {
  return (
    <div id="full-body">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use Home here */}
          <Route path="tictactoe" element={<TicTacToe />} />
          <Route path="chess" element={<Chess />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
