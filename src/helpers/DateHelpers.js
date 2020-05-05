const isToday = (dateTime) => {
  const today = new Date();
  return (
    dateTime.getDate() === today.getDate() &&
    dateTime.getMonth() === today.getMonth() &&
    dateTime.getFullYear() === today.getFullYear()
  );
};

const isTomorrow = (dateTime) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    dateTime.getDate() === tomorrow.getDate() &&
    dateTime.getMonth() === tomorrow.getMonth() &&
    dateTime.getFullYear() === tomorrow.getFullYear()
  );
};

const isYesterday = (dateTime) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    dateTime.getDate() === yesterday.getDate() &&
    dateTime.getMonth() === yesterday.getMonth() &&
    dateTime.getFullYear() === yesterday.getFullYear()
  );
};

export const setToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString();
};

export const dateTimeToDate = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  if (isToday(dateTime)) return "vandaag";
  if (isTomorrow(dateTime)) return "morgen";
  const options = {
    day: "numeric",
    month: "short",
  };
  if (dateTime.getFullYear() !== new Date().getFullYear())
    options["year"] = "numeric";
  return dateTime.toLocaleDateString([], options);
};

export const dateTimeToTime = (dateTimeString) => {
  return new Date(dateTimeString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const dateDiffInDays = (dateTime1, dateTime2) => {
  return parseInt(
    (dateTime2.getTime() - dateTime1.getTime()) / (1000 * 60 * 60 * 24)
  );
};

export const pastDateString = (dateTimeString) => {
  if (!dateTimeString) return "onbekend";
  const dateTime = new Date(dateTimeString);
  if (isToday(dateTime)) return "vandaag";
  if (isYesterday(dateTime)) return "gisteren";
  return `${dateDiffInDays(dateTime, new Date())} dagen geleden`;
};

export const timeSlot = (
  fromDateTimeString,
  toDateTimeString,
  timeOnly = false
) => {
  const dateString = timeOnly ? "" : `${dateTimeToDate(fromDateTimeString)} `;
  return `${dateString}${dateTimeToTime(fromDateTimeString)}-${dateTimeToTime(
    toDateTimeString
  )}`;
};

export const filterKeysContain = (object, keys, searchTerm) => {
  for (let key of keys) {
    if (object[key].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
      return true;
  }
  return false;
};

export const titleCase = (str) => str.replace(/^\w/, (c) => c.toUpperCase());
