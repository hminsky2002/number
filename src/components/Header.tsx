import { getDayOfGame } from "../service/number";

export const Header = () => {
  const day = getDayOfGame();

  return (
    <div className="mx-auto text-center">
      <h1 className="text-6xl font-bold">NUMBER</h1>
      <h2 className="text-2xl">You Get One Guess</h2>
      <h2 className="text-2xl">The number is between 0 and 99</h2>
      <h2 className="text-xl">{`Day ${day}`}</h2>
    </div>
  );
};
