import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const get_relative_time = (date) => {
  return dayjs().to(dayjs(date));
};
