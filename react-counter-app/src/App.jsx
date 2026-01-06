import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const increaseCount = () => {
    setCount(count + 1);
  };
  const resetCount = () => {
    setCount(0);
  };
  const decreaseCount = () => {
    if (count > 0) setCount(count - 1);
    else setCount(0);
  };
  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="header-text">REACT COUNTER APP</h1>
        <p className="count-text">{count}</p>
      </div>
      <div className="btn-container">
        <button onClick={increaseCount}>INCREMENT</button>
        <button onClick={resetCount}>RESET</button>
        <button onClick={decreaseCount}>DECREMENT</button>
      </div>
    </div>
  );
}

export default App;
