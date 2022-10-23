import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [buttonColor, setButtonColor] = useState("HotPink");
  const newButtonColor =
    buttonColor === "HotPink" ? "CornflowerBlue" : "HotPink";
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          style={{
            backgroundColor: buttonColor,
            padding: 20,
            borderRadius: 4,
            border: "none",
            color: "white",
            fontSize: "30px",
          }}
          onClick={() => setButtonColor(newButtonColor)}
        >
          Change to {newButtonColor}
        </button>
      </header>
    </div>
  );
}

export default App;
