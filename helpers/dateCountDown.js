export const dateCountDown = (ist) => {
  if (!ist) return;
  const dateTime = ist.split(" ");
  const date = dateTime[0]?.split("-");
  const time = dateTime[1]?.split(":");

  const seconds = new Date(
    `20${Number(date[0])}`,
    Number(date[1]) - 1,
    Number(date[2]),
    Number(time[0]),
    Number(time[1]),
    Number(time[2])
  ).getTime();

  const dateNow = Date.now();

  return dateNow + (seconds - dateNow);
};
