import { useState, useEffect } from "react";
import { getNumber } from "../service/number";
import { Score } from "./Score";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../firebase";
import { getDayOfGame } from "../service/number";
import { Stats } from "./Stats";

const db = getFirestore(app);

export const Game = () => {
  const answer = getNumber();
  const [inputValue, setInputValue] = useState("");
  const [guessed, setGuessed] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    const today = getDayOfGame().toString(); 
    const guessDate = sessionStorage.getItem("guessDate");
    const sessionGuess = sessionStorage.getItem("guessed");
    const sessionCorrect = sessionStorage.getItem("correct");

    if (guessDate !== today) {
      sessionStorage.removeItem("guessed");
      sessionStorage.removeItem("correct");
      sessionStorage.removeItem("guessDate");
    } else if (sessionGuess) {
      setGuessed(true);
      setCorrect(sessionCorrect === "true");
    }
  }, []);

  const handleDelete = () => {
    if (inputValue.length === 2) {
      setInputValue(`${inputValue.substring(0, 1)}`);
    } else if (inputValue.length === 1) {
      setInputValue("");
    }
  };

  const handleSquareClick = (number: string) => {
    if (inputValue.length < 2) {
      setInputValue(`${inputValue}${number}`);
    }
  };

  const handleSubmit = async (value: string) => {
    const today = getDayOfGame(); 
    const id = Date.now();
    const isCorrect = value === answer;

    setGuessed(true);
    setCorrect(isCorrect);

    sessionStorage.setItem("guessed", "true");
    sessionStorage.setItem("correct", isCorrect.toString());
    sessionStorage.setItem("guessDate", today.toString());

    await setDoc(doc(db, "guess", id.toString()), {
      number: value,
      day: today,
    });
  };

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <div className="mx-auto text-center">
      {!guessed ? (
        <div>
          <div className="w-[150px] h-[150px] mx-auto mt-20 text-6xl">
            {inputValue}
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4 max-w-sm mx-auto">
            {digits.map((digit) => (
              <button
                key={digit}
                className="transition-all border-2 bg-gray-300 p-2 hover:bg-gray-400 font-semibold"
                onClick={() => handleSquareClick(digit)}
              >
                {digit}
              </button>
            ))}
            <button
              className="transition-all border-2 bg-red-500 p-2 hover:bg-red-600 font-semibold"
              onClick={handleDelete}
            >
              DEL
            </button>
            <button
              className="transition-all border-2 border-green-300 bg-green-300 p-2 hover:bg-green-400 font-semibold"
              onClick={() => handleSubmit(inputValue)}
            >
              SUB
            </button>
          </div>
        </div>
      ) : correct ? (
        <>
          <Score result={true} answer={answer} />
          <Stats />
        </>
      ) : (
        <>
          <Score result={false} answer={answer} />
          <Stats />
        </>
      )}
    </div>
  );
};