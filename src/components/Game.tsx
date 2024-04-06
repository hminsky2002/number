import { useState } from "react";
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

  const handleDelete = () => {
    if (inputValue.length == 2) {
      setInputValue(`${inputValue.substring(0, 1)}`);
    } else if (inputValue.length == 1) {
      setInputValue("");
    }
  };

  const handleSquareClick = (number: string) => {
    if (inputValue.length < 2) {
      setInputValue(`${inputValue}${number}`);
    }
  };

  const handleSubmit = async (value: string) => {
    const id = Date.now();
    setGuessed(true);
    if (value === answer) {
      setCorrect(true);
    }
    await setDoc(doc(db, "guess", id.toString()), {
      number: value,
      day: getDayOfGame(),
    });
  };
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  return (
    <div className="mx-auto text-center">
      {!guessed && (
        <div>
          <div className="w-[150px] h-[150px] mx-auto mt-20 text-6xl">
            {inputValue}
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4 max-w-sm mx-auto">
            {digits.map((digit) => (
              <button
                key={digit}
                className=" transition-all border-2 bg-gray-300 p-2 hover:bg-gray-400 font-semibold"
                onClick={() => handleSquareClick(digit)}
              >
                {digit}
              </button>
            ))}
            <button
              className="transition-all border-2 bg-red-500 p-2 hover:bg-red-600 font-semibold"
              onClick={() => handleDelete()}
            >
              DEL
            </button>
            <button
              className=" transition-all border-2 border-green-300 bg-green-300 p-2 hover:bg-green-400 font-semibold"
              onClick={() => handleSubmit(inputValue)}
            >
              SUB
            </button>
          </div>
        </div>
      )}
      {guessed && correct && (
        <>
          <Score result={true} answer={answer} />
          <Stats />
        </>
      )}
      {guessed && !correct && (
        <>
          <Score result={false} answer={answer} />
          <Stats />
        </>
      )}
    </div>
  );
};
