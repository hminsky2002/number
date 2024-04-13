const numbers = ["5", "6", "18", "3", "9", "24", "91", "7","52","71","32","63","19","25","43","47","33"];

const getDayOfGame = () => {
  const date1 = new Date("04/04/2024");
  const date2 = new Date();
  const difference = date2.getTime() - date1.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
};

const getNumber = () => {
  const days = getDayOfGame();
  return numbers[days % numbers.length];
};

const getHoursTillTomorrow = () => {
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.ceil(diff / (1000 * 60 * 60));
  return hours;
};

export { getDayOfGame, getNumber, getHoursTillTomorrow };
