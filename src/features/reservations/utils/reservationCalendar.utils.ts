type ScheduleDate = {
  date: string;
};

type Schedule = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getScheduleDate = (dateString: string) => {
  return dateString.split("T")[0];
};

export const createAvailableDateSet = (schedules: ScheduleDate[]) => {
  return new Set(schedules.map((schedule) => getScheduleDate(schedule.date)));
};

export const createDisabledDate = (schedules: ScheduleDate[]) => {
  const availableDateSet = createAvailableDateSet(schedules);

  return (date: Date) => {
    return !availableDateSet.has(formatDate(date));
  };
};

export const getSchedulesByDate = (schedules: Schedule[], date: Date) => {
  const targetDate = formatDate(date);

  return schedules.filter((schedule) => {
    return getScheduleDate(schedule.date) === targetDate;
  });
};
