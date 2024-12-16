import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const App = () => {
  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(generateNewArray());
    }
    return newArray;
  }
  function generateNewArray() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function rollDice() {
    if (!tenzies) {
      setDices((oldDices) =>
        oldDices.map((die) => {
          return die.isHeld ? die : generateNewArray();
        })
      );
      setRollCount((prevCount) => {
        prevCount = prevCount + 1;
        return prevCount;
      });
    } else {
      setTenzies(false);
      setDices(allNewDice());
      setRollCount(0);
    }
  }

  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [timer, setTimer] = React.useState(null);
  const [bestTime, setBestTime] = React.useState(() =>
    JSON.parse(localStorage.getItem("bestTime"))
  );
  React.useEffect(() => {
    if (!tenzies) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimer(interval);
    }
    return () => clearInterval(timer);
  }, [tenzies]);
React.useEffect(()=>{
if(!bestTime||time<bestTime){
  setBestTime(time)
  localStorage.setItem("bestTime", JSON.stringify(time))
}
},[tenzies,bestTime,time])
  const diceElements = dices.map((dice) => (
    <Die
      value={dice.value}
      key={dice.id}
      isHeld={dice.isHeld}
      id={dice.id}
      holdDice={() => holdDice(dice.id)}
    />
  ));
  function holdDice(id) {
    setDices((oldDices) =>
      oldDices.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  React.useEffect(() => {
    const allHeld = dices.every((dice) => dice.isHeld);
    const firstValue = dices[0].value;
    const allSameValue = dices.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won");
    }
  }, [dices]);
  return (
    <div className="App">
      <main className="app-element">
        <div className="tenzie-app">
          {tenzies && <Confetti />}

          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <p>You've set a best time of {bestTime} seconds!</p>
          <div className="dice-container">{diceElements}</div>
          <button className="roll-btn" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>
          <p>Roll Count: {rollCount}</p>
        </div>
      </main>
    </div>
  );
};

export default App;


