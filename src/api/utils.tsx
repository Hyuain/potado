import moment from 'moment';
import _ from 'lodash';

interface IWeekTimeTable {
  [key: string]: string
}

const weekTimeTable: IWeekTimeTable = {
  '1': '周一', '2': '周二', '3': '周三', '4': '周四', '5': '周五', '6': '周六', '7': '周日'
};

export const getFriendlyDate = (date: string, method: string) => {
  const momentDate = moment(date);
  const monthAndDay = momentDate.format('M月D日');
  const weekTime = momentDate.format('i');
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
  return result;
};

export const groupByDay = (dataBeforeGroup: any[], keyOfTime: string) => {
  return _.groupBy(dataBeforeGroup, (item: any) => {
    return moment(item[keyOfTime]).format('YYYY-MM-DD');
  });
};