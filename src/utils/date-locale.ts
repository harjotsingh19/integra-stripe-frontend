import type { Locale } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { setHours, setMinutes, setSeconds, setMilliseconds, parseISO, format } from 'date-fns';

const formatDistanceLocale: Record<string, string> = {
  lessThanXSeconds: '{{count}}s',
  xSeconds: '{{count}}s',
  halfAMinute: '30s',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
};

export const customLocale: Locale = {
  ...locale,
  formatDistance: (token, count, options) => {
    options = options || {};

    const result = formatDistanceLocale[token].replace('{{count}}', count);

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result;
      } else {
        return result + ' ago';
      }
    }

    return result;
  },
};

export const getUTCDateTime = (date: Date | null, time?: Date | null) => {
  if (!date || !time) return null;

  return setMilliseconds(
    setSeconds(
      setMinutes(setHours(new Date(date), time.getHours()), time.getMinutes()),
      time.getSeconds()
    ),
    time.getMilliseconds()
  );
};

const isValidISODateTime = (dateTimeString: string) => {
  return !isNaN(Date.parse(dateTimeString));
};

export const splitDateTime = (isoDateTime: string = '') => {
  if (!isValidISODateTime(isoDateTime)) {
    // Handle invalid input gracefully, such as returning an error message or throwing an exception
    return { error: 'Invalid ISO datetime format' };
  }

  const parsedDate = parseISO(isoDateTime);
  const date = format(parsedDate, formats.date);
  const time = format(parsedDate, formats.time);
  return { date, time };
};

export const formats = {
  date: 'MM-dd-yyyy',
  time: 'HH:mm:ss',
  timeWithTimezone: 'hh:mm aa',
};

export const getUTCDate = (date: Date | null) => {
  if (!date) return null;
  const isoString = new Date(date).toISOString();
  return isoString.split('T')[0];
};

export const formatTimeRange = (fromTimestamp: any, toTimestamp: any) => {
  const options: any = { hour: 'numeric', minute: 'numeric', hour12: true };
  const fromTime = new Date(fromTimestamp).toLocaleTimeString('en-US', options);
  const toTime = new Date(toTimestamp).toLocaleTimeString('en-US', options);
  return `${fromTime} - ${toTime}`;
};
