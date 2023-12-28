
import { DateTime, FixedOffsetZone } from "luxon";

export function convertUnixToTime(timestamp, timeZone) {
  const offsetMinutes = timeZone / 60;
  const zone = FixedOffsetZone.instance(offsetMinutes);
  const date = DateTime.fromMillis(timestamp * 1000, { zone });
  const formattedTime = date.toFormat('HH:mm a');

  return formattedTime;
}


export function convertDateToFormatWithDay(dateString) {
  const daysOfWeek = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ];

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dateObj = new Date(dateString);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const dayOfMonth = dateObj.getDate();
  const month = months[dateObj.getMonth()];

  return `${dayOfWeek} ${dayOfMonth} ${month}`;
}

export const roundTemperature = (temperature) => {
  return Math.round(temperature)
}
