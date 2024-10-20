import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Main from "./Man"; 
import SelectCars from "./SltCars";
import "./App.css";

export default function App() {
  const [userMoney, setUserMoney] = useState(0); 

  useEffect(() => {
    if (!localStorage.getItem("userMoney")) {
      localStorage.setItem("userMoney", userMoney);
    }
    const storedMoney = localStorage.getItem("userMoney");
    if (storedMoney) {
      setUserMoney(parseInt(storedMoney));
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("userMoney")) {
      localStorage.setItem("userMoney", userMoney);
    }
  }, [userMoney]);

  return (
    <Router>
      <div className="game-container">
        <div className="money-display">
          {`Your Money: $${userMoney}`}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="dashboard-container">
                <header className="header">
                  <h1>Game Dashboard</h1>
                </header>
                <div className="button-container">
                  <Link to="/game">
                    <button className="start-button">Start Game</button>
                  </Link>
                  <Link to="/car">
                    <button className="nav-button">Cars</button>
                  </Link>
                  <button className="nav-button">LeaderBoard</button>
                </div>
              </div>
            }
          />
          <Route
            path="/game"
            element={<Main userMoney={userMoney} setUserMoney={setUserMoney} />}
          />
          <Route
            path="/car"
            element={<SelectCars userMoney={userMoney} setUserMoney={setUserMoney} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
