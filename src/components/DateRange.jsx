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

export const MonthRange = ({ hemisphere, ranges = [] }) => {
  let date = DateTime.local();
  let adjustedRanges = ranges;
  console.log({ ranges });
  if (hemisphere === 'southern') {
    // adjustedRanges
    adjustedRanges = ranges.map(([start, end]) =>
      start === null ? [null, null] : [(start + 6) % 13, (end + 6) % 12]
    );
  }
  console.log({ hemisphere, adjustedRanges });
  let classes = months.map((_, i) => {
    let matches = adjustedRanges.filter(
      range => range[0] !== null && inMonthsInclusive({ month: i + 1 }, ...range)
    ).length;
    let names = [];
    if (matches) names.push('active');
    if (matches === 1) {
      if (~adjustedRanges.map(r => r[0]).indexOf(i + 1)) {
        names.push('first');
      } else if (~adjustedRanges.map(r => r[1]).indexOf(i + 1)) {
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
    .map((_, i) => `${i % 12 || 12}${i / 11 > 1 ? 'pm' : 'am'}`);

  let classes = hours.map((_, i) => {
    let matches = ranges.filter(
      range => range[0] !== null && inHoursInclusive({ hour: i }, ...range)
    ).length;
    let names = [];
    if (matches) names.push('active');
    if (matches === 1) {
      if (~ranges.map(r => r[0]).indexOf(i)) {
        names.push('first');
      }
    } else if (~ranges.map(r => r[1]).indexOf(i)) {
      names.push('last');
      names.push('active');
    }

    return names.join(' ');
  });

  const blocks = hours.map((hour, i) => ({ hour, classes: classes[i], i }));

  return (
    <div className="date range hour">
      <div className="flex-container">
        {blocks.map(block => (
          <div
            key={block.hour}
            data-content={block.hour}
            className={classnames('date hour', block.classes, {
              now: block.i === date.hour,
            })}
          >
            <div />
          </div>
        ))}
      </div>
      <div className="static label">12am</div>
    </div>
  );
};
