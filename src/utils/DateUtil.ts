const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;

const formatRegex = {
  year: /yy/g,
  fullYear: /yyyy/g,
  month: /MM/g,
  date: /dd/g,
  shortHours: /h/g,
  hours: /hh/g,
  shortFullHours: /H/g,
  fullHours: /HH/g,
  shortMinutes: /m/g,
  minutes: /mm/g,
  shortSeconds: /s/g,
  seconds: /ss/g,
  ms: /S{2,4}/g,
  narrowDay: /E/g,
  shortDay: /EEE/g,
  longDay: /EEEE+/g,
  narrowDayPeriod: /a/gi,
  shortDayPeriod: /aa/gi,
  longDayPeriod: /aaa+/gi,
};
const format = (before: Date, format: string) => {
  const [
    year,
    month,
    date,
    shortHours,
    hours,
    minutes,
    seconds,
    ms,
    narrowDay,
    shortDay,
    longDay,
    narrowDayPeriod,
    shortDayPeriod,
    longDayPeriod,
  ] = [
    before.getFullYear(),
    before.getMonth(),
    before.getDate(),
    (before.getHours() - 1) % 12 + 1,
    before.getHours(),
    before.getMinutes(),
    before.getSeconds(),
    before.getMilliseconds(),
    before.toLocaleString(undefined, { weekday: 'narrow' }),
    before.toLocaleString(undefined, { weekday: 'short' }),
    before.toLocaleString(undefined, { weekday: 'long' }),
    before.toLocaleString(undefined, { dayPeriod: 'narrow' }),
    before.toLocaleString(undefined, { dayPeriod: 'short' }),
    before.toLocaleString(undefined, { dayPeriod: 'long' }),
  ].map((it) => it.toString());

  return format
  .replace(formatRegex.fullYear, year)
    .replace(formatRegex.year, year.slice(-2))
    .replace(formatRegex.month, month)
    .replace(formatRegex.date, date)
    .replace(formatRegex.fullHours, `0${hours}`.slice(-2))
    .replace(formatRegex.shortFullHours, hours)
    .replace(formatRegex.hours, `0${shortHours}`.slice(-2))
    .replace(formatRegex.shortHours, shortHours)
    .replace(formatRegex.minutes, `0${minutes}`.slice(-2))
    .replace(formatRegex.shortMinutes, minutes)
    .replace(formatRegex.seconds, `0${seconds}`.slice(-2))
    .replace(formatRegex.shortSeconds, seconds)
    .replace(formatRegex.ms, (match) => ms.slice(0, match.length))
    .replace(formatRegex.longDay, longDay)
    .replace(formatRegex.shortDay, shortDay)
    .replace(formatRegex.narrowDay, narrowDay)
    .replace(formatRegex.longDayPeriod, (match) => match.toUpperCase() === match ? longDayPeriod.toUpperCase() : longDayPeriod)
    .replace(formatRegex.shortDayPeriod, (match) => match.toUpperCase() === match ? shortDayPeriod.toUpperCase() : shortDayPeriod)
    .replace(formatRegex.narrowDayPeriod, (match) => match.toUpperCase() === match ? narrowDayPeriod.toUpperCase() : narrowDayPeriod);
}

const toShort = (date: Date, { seconds } = { seconds: false }) => {
  const diff = new Date().getTime() - date.getTime();

  if (diff <= 24 * ONE_HOUR) {
    return format(date, seconds ? 'aa hh시 mm분 ss초' : 'aa hh시 mm분');
  } else {
    return format(date, 'YYYY-MM-dd');
  }
};

// 다국어 지원 안할거긴 한데...
const toLast = (date: Date, { affix } = { affix: '전' }) => {
  const diff = new Date(new Date().getTime() - date.getTime());

  let formatString = 'yy년';
  if (diff.getDate() <= ONE_MINUTE) {
    formatString = 'ss초';
  } else if (diff.getDate() <= ONE_HOUR) {
    formatString = 'mm분';
  } else if (diff.getDate() <= 24 * ONE_HOUR) {
    formatString = 'hh시간';
  } else if (diff.getDate() <= 30 * 24 * ONE_HOUR) {
    formatString = 'dd일';
  } else if (diff.getDate() <= 365 * 24 * ONE_HOUR) {
    formatString = 'MM개월';
  }

  return format(diff, `${formatString} ${affix}`);
}

const DateUtil = {
  format,
  toShort,
  toLast,
};

export default DateUtil;
