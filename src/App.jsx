import Head from "./Head";
import Die from "./Die";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const App = () => {
  const [tenzies, setTenzies] = useState(false);

  const generateNewDie = () => {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    };
  };
  const allnewDice = () => {
    const randomArr = [];
    for (let i = 0; i < 10; i++) {
      randomArr.push(generateNewDie());
    }
    return randomArr;
  };
  const [dice, setDice] = useState(allnewDice());

  const holdDice = (id) => {
    setDice((prev) =>
      prev.map((die) => (id === die.id ? { ...die, isHeld: !die.isHeld } : die))
    );
  };

  const rollDice = () => {
    if (!tenzies) {
      setDice((prev) => {
        return prev.map((die) => (die.isHeld ? die : generateNewDie()));
      });
    } else {
      setTenzies(false);
      setDice(allnewDice());
    }
  };

  useEffect(() => {
    // check();
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValues = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValues) {
      setTenzies(true);
    }
  }, [dice]);

  // const reset = () => {
  //   setTenzies(false);
  //   setDice(allnewDice());
  // };
  //
  return (
    <main className="container">
      <Head />
      <div className="die--container">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            toggle={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button onClick={rollDice}>{tenzies ? "Reset" : "Roll"}</button>
      {tenzies && <Confetti />}
    </main>
  );
};

export default App;
