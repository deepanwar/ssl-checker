import dayjs from "dayjs";

export const calculateDaysFromNow = (date2) => {
  const today = dayjs();
  const secondDate = dayjs(date2);
  return secondDate.diff(today, "day");
};
