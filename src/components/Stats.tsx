import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { app } from "../firebase";
import { getDayOfGame, getNumber } from "../service/number";

const db = getFirestore(app);

interface GuessCounts {
  [number: string]: number;
}

export const Stats = () => {
  const [guessCounts, setGuessCounts] = useState<GuessCounts>({});

  useEffect(() => {
    const fetchGuessesForToday = async () => {
      const q = query(
        collection(db, "guess"),
        where("day", "==", getDayOfGame()),
      );

      const querySnapshot = await getDocs(q);
      const counts: GuessCounts = {};

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const { number } = doc.data();
        if (typeof number === "string") {
          counts[number] = (counts[number] || 0) + 1;
        }
      });

      setGuessCounts(counts);
    };

    fetchGuessesForToday().catch(console.error);
  }, []);

  const getColorForCount = (number: string, count: number): string => {
    if (number == getNumber()) {
      return "bg-green-300";
    }
    if (count <= 1) return "bg-red-100";
    if (count <= 2) return "bg-red-200";
    if (count <= 3) return "bg-red-300";
    if (count <= 4) return "bg-red-400";
    return "bg-red-500";
  };

  const sortedGuessCounts = Object.entries(guessCounts).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 mx-auto max-w-sm">
        {sortedGuessCounts.map(([number, count]) => (
          <div
            key={number}
            className={`w-12 h-12 flex items-center justify-center rounded shadow transform transition duration-150 ease-in-out hover:scale-105 ${getColorForCount(number, count)}`}
          >
            <p>{number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
