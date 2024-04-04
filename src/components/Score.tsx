import { getHoursTillTomorrow } from "../service/number";
interface ScoreProps {
  result: boolean;
  answer: string;
}
export const Score = ({ result, answer }: ScoreProps) => {
  const hours = getHoursTillTomorrow();
  return (
    <div className="mx-auto text-center mt-20 text-bold">
      {result ? (
        <h1 className="text-3xl font-bold text-green-600">
          Congratulations, You got the number! That's unbelievable!
        </h1>
      ) : (
        <h1 className="text-3xl font-bold text-red-600">
          ...Unfortunately, that was incorrect
        </h1>
      )}
      <h2 className="text-2xl">The correct number was {answer}</h2>
      <h2 className="text-xl">{`${hours} hours till the next number`}</h2>
    </div>
  );
};
