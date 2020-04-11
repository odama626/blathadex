import React from 'react';
import { DateTime } from 'luxon';
import { inMonthsInclusive, inHoursInclusive } from '../app/utils';
import classnames from 'classnames';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const MonthRange = ({ ranges = [] }) => {
  let date = DateTime.local();
  let classes = months.map((_, i) => {
    let matches = ranges.filter(
      range =>
        range[0] !== null && inMonthsInclusive({ month: i + 1 }, ...range)
    ).length;
    let names = [];
    if (matches) names.push('active');
    if (matches === 1) {
      if (~ranges.map(r => r[0]).indexOf(i + 1)) {
        names.push('first');
      } else if (~ranges.map(r => r[1]).indexOf(i + 1)) {
        names.push('last');
      }
    }

    return names.join(' ');
  });

  return (
    <div className="date range month">
      {months.map((month, i) => (
        <div
          data-content={month}
          key={month}
          className={classnames('date month', classes[i], {
            now: date.month === i + 1,
          })}
        >
          {month}
        </div>
      ))}
    </div>
  );
};

export const HourRange = ({ ranges = [] }) => {
  let date = DateTime.local();
  let hours = Array(24)
    .fill(0)
    .map(
      (_, i) => `${(i % 12) + 1}${(i + 1) % 4 ? '' : i / 12 > 1 ? 'pm' : 'am'}`
    );
  hours.unshift(hours.pop());

  let classes = hours.map((_, i) => {
    let matches = ranges.filter(
      range => range[0] !== null && inHoursInclusive({ hour: i }, ...range)
    ).length;
    let names = [];
    if (matches) names.push('active');
    if (matches === 1) {
      if (~ranges.map(r => r[0]).indexOf(i)) {
        names.push('first');
      } else if (~ranges.map(r => r[1]).indexOf(i)) {
        names.push('last');
      }
    }

    return names.join(' ');
  });

  return (
    <div className="date range hour">
      {hours.map((hour, i) => (
        <div
          data-content={hour}
          className={classnames('date hour', classes[i], {
            now: i === date.hour,
          })}
        >
          {hour}
        </div>
      ))}
    </div>
  );
};
