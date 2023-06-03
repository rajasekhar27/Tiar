const months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function ISTFormat2(date) {
  if (!date) return "";

  let currentTime = date;

  let currentOffset = currentTime.getTimezoneOffset();

  let ISTOffset = 330; // IST offset UTC +5:30

  let ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  // ISTTime now represents the time in IST coordinates

  let hoursIST = ISTTime.getHours();
  let minutesIST = ISTTime.getMinutes();
  let seconds = ISTTime.getSeconds();
  let ampm = hoursIST >= 12 ? "pm" : "am";
  hoursIST = hoursIST % 12;
  hoursIST = hoursIST ? hoursIST : 12;

  let month = months[ISTTime.getMonth()];
  let year = ISTTime.getFullYear();
  let today = ISTTime.getDate();

  const twoDigitHours = hoursIST < 10 ? `0${hoursIST}` : hoursIST;
  const twoDigitMinutes = minutesIST < 10 ? `0${minutesIST}` : minutesIST;
  const twoDigitSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${today}-${month}-${year}`;
}

export function getMonth(monthId) {
  return months[monthId];
}

export default ISTFormat2;
