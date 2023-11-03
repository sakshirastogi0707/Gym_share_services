import * as moment from 'moment';
import { Moment } from 'moment';

export class BaseUtils {
  static formatTimeUTC(datetime?: string | Moment) {
    return moment.utc(datetime).format('YYYY-MM-DD HH:mm:ss');
  }

  static get currentUTCTime() {
    return moment.utc().format('YYYY-MM-DDTHH:mm:ssZ');
  }

  static generateRandom(min = 0, max = 100) {
    const difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  }

  static trimWhitespaceInObject(object) {
    for (const objectKey in object) {
      if (typeof object[objectKey] === 'string') {
        object[objectKey] = object[objectKey].trim();
      }
    }
    return object;
  }

  static roundOff(num, places = 2) {
    return parseFloat(num.toFixed(places));
  }

  static getEnumKeys(myEnum) {
    return Object.values(myEnum).filter(
      (value) => typeof value === 'string',
    ) as string[];
  }

  static getEnumValues(myEnum) {
    return Object.values(myEnum).filter(
      (value) => typeof value === 'number',
    ) as number[];
  }

  static isValidTimeString(time: string) {
    if (time.trim().length > 5) {
      return false;
    }
    const [hh, mm] = time.trim().split(':');
    if (!isNaN(parseInt(hh))) {
      if (parseInt(hh) > 23) {
        return false;
      }
    } else {
      return false;
    }
    if (!isNaN(parseInt(mm))) {
      if (parseInt(mm) > 59) {
        return false;
      }
    } else {
      return false;
    }
  }
  static isTimeBetween(
    time: string,
    minTime: string,
    maxTime: string,
  ): boolean {
    return (
      BaseUtils.convertTimeStringToNumber(time) >=
        BaseUtils.convertTimeStringToNumber(minTime) &&
      BaseUtils.convertTimeStringToNumber(time) <=
        BaseUtils.convertTimeStringToNumber(maxTime)
    );
  }

  static convertTimeStringToNumber(time: string): number {
    return parseInt(time.split(':').join(''));
  }

  static getNthWeekdayOfMonth(
    year: number,
    month: number,
    targetDay: string,
    n: number,
  ) {
    const daysOfWeek: string[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const targetDayIndex: number = daysOfWeek.indexOf(targetDay);
    if (targetDayIndex === -1 || n < 1 || n > 5) {
      throw new Error('Invalid input.');
    }
    if (month == 12) {
      year++;
      month = 0;
    }

    const currentDate: Date = new Date(year, month, 1);
    let nthDayCount = 0;
    while (currentDate.getMonth() === month) {
      if (currentDate.getDay() === targetDayIndex) {
        nthDayCount++;
        if (nthDayCount === n) {
          return currentDate;
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    throw new Error('Date not found.');
  }
  static dayOfWeekAsString(dayIndex) {
    return (
      [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ][dayIndex] || ''
    );
  }
}
