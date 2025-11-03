import moment from "moment";

export const FormatMoment = (value: Date | string, type: string) => moment(value).format(type);
