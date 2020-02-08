import {format, parseISO} from 'date-fns';

interface IWeekTimeTable {
  [key: string]: string
}

const weekTimeTable: IWeekTimeTable = {
  '1': '周一', '2': '周二', '3': '周三', '4': '周四', '5': '周五', '6': '周六', '7': '周日'
};

export const getFriendlyDate = (date: string, method: string) => {
  const ISODate = parseISO(date);
  const monthAndDay = format(ISODate, 'M月dd日');
  const weekTime = format(ISODate, 'i');
  switch (method) {
    case 'monthAndDay':
      return monthAndDay;
    case 'dayOfWeek':
      return weekTimeTable[weekTime];
  }
};

export const groupByLength = (array: any[], length: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += length) {
    result.push(array.slice(i, i + length));
  }
  return result
};