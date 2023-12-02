import moment from "moment";

export const currentDate = moment().format("YYYY/MM/DD HH:mm");
export const nextday = moment(currentDate).add(1, "days").format("YYYY/MM/DD");

export const today = moment(currentDate).format("dddd");
export const tomorrow = moment(nextday).format("dddd");

export const CurrentDatee = moment().format();

export const todayTime = moment(CurrentDatee).format("HH:mm");
