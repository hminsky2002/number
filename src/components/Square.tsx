import { useState } from "react"; // Import useState from React
import { getNumber } from "../service/number";

interface SquareProps {
  number: string;
  count: number;
}

const Square = ({ number, count }: SquareProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getColorForCount = (number: string, count: number): string => {
    if (number == getNumber()) {
      return "bg-green-400";
    }
    if (count <= 1) return "bg-red-100";
    if (count <= 2) return "bg-red-200";
    if (count <= 3) return "bg-red-300";
    if (count <= 4) return "bg-red-400";
    return "bg-red-500";
  };

  const originalColor = getColorForCount(number, count);

  return (
    <div
      key={number}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-16 h-16 flex items-center justify-center rounded shadow transform transition duration-150 ease-in-out hover:scale-105 ${isHovered ? getColorForCount(number, count) : originalColor}`}
    >
      <p className={`${isHovered ? "text-white" : ""}`}>
        {isHovered ? count : number}
      </p>
    </div>
  );
};

export { Square };
