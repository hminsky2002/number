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
import { getDayOfGame } from "../service/number";
import { Square } from "./Square";

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

  const sortedGuessCounts = Object.entries(guessCounts).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 mx-auto max-w-sm mt-4">
        {sortedGuessCounts.map(
          ([number, count]) =>
            number !== "" && (
              <Square key={number} number={number} count={count} />
            ),
        )}
      </div>
    </div>
  );
};
