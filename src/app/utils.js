import { withPrefix } from 'gatsby';
import { DateTime } from 'luxon';
import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import diy404Src from 'images/diy404.svg';

export const capitalize = s => `${s[0].toUpperCase()}${s.substr(1)}`;
export const getFileName = s => s.replace(/\s/g, '_').toLowerCase();
export const getCardImage = (theme, name) =>
  `/static/themes/${theme}/${getFileName(name)}.jpg`;
export const getSpreadImage = (api, layout) => `${api}${layout && layout.url}`;
export const convertLineBreaks = text =>
  text.split('\n\n').map((paragraph, key) => <p key={key}>{paragraph}</p>);

export const lock = () => {
  let scrollOffset = window.pageYOffset;
  let overflow = document.body.style.overflow;
  let position = document.body.style.position;
  let top = document.body.style.top;
  let width = document.body.style.width;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollOffset}px`;
  document.body.style.width = '100%';
  return () => {
    document.body.style.overflow = overflow;
    document.body.style.position = position;
    document.body.style.top = top;
    document.body.style.width = width;
    window.scrollTo(0, scrollOffset);
  };
};

export const saveLocally = (key, data) => {
  let storage = window.localStorage;
  try {
    if (!storage) throw new Error('Local Storage not availabe');
    storage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const loadLocally = key => {
  let storage = window.localStorage;
  try {
    return JSON.parse(storage.getItem(key));
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const memoize = (fun, ...args) => {
  try {
    window.memoes = window.memoes || {};
    let key = JSON.stringify({ fun, args });
    if (!window.memoes[key]) {
      window.memoes[key] = fun(...args);
    }
    // console.log(fun.arguments);
    return window.memoes[key];
  } catch (e) {
    return fun(...args);
  }
};

export function inMonthsInclusive(date, from, to) {
  if (from > to) {
    return date.month >= from || date.month <= to;
  } else {
    return date.month >= from && date.month <= to;
  }
}

export function inHoursInclusive(date, from, to) {
  if (from > to) {
    return date.hour >= from || date.hour < to;
  } else {
    return date.hour >= from && date.hour < to;
  }
}

export function isAvailableOnDate(date, critter) {
  let status = {
    inMonth: false,
    inTime: false,
  };

  if (inMonthsInclusive(date, critter.smonth, critter.emonth)) {
    status.inMonth = true;
  }
  if (inHoursInclusive(date, critter.stime, critter.etime)) {
    status.inTime = true;
  }

  if (critter.smonth2 !== null) {
    if (inMonthsInclusive(date, critter.smonth2, critter.emonth2)) {
      status.inMonth = true;
    }
    if (inHoursInclusive(date, critter.stime2, critter.stime2)) {
      status.inTime = true;
    }
  }

  return status;
}

export function isCritterAvailable(date, critter) {
  let status = isAvailableOnDate(date, critter);
  return status.inMonth && status.inTime;
}

export function isCritterAvailableInMonth(date, critter) {
  return isAvailableOnDate(date, critter).inMonth;
}

export function calculateDeltaDiffs(
  critters,
  { deltas, hemisphere, unit = 'month' }
) {
  let curTime = DateTime.local().plus({
    months: hemisphere === 'southern' ? 6 : 0,
  });
  let compare =
    unit === 'month' ? isCritterAvailableInMonth : isCritterAvailable;

  return deltas.reduce(
    (history, delta) => {
      let last = history.pop();
      let pastCritters = last.available;
      let pastIds = pastCritters.map(c => c.id);
      let now = curTime.plus(delta);
      let newCritters = critters.filter(c => compare(now, c));
      let newIds = newCritters.map(c => c.id);
      let gone = pastCritters.filter(c => !~newIds.indexOf(c.id));

      return [
        ...history,
        {
          ...last,
          leaving: gone.map(c => c.id),
        },
        {
          available: newCritters,
          new: newCritters.filter(c => !~pastIds.indexOf(c.id)),
          gone,
        },
      ];
    },
    [{ available: critters.filter(c => compare(curTime, c)) }]
  );
}

// All the hours that have fish / bug spawn changes
const critterTimes = [4, 8, 9, 16, 17, 18, 19, 21, 23];

export function getNearestTimeDiff() {
  const now = DateTime.local().set({ minute: 0 });
  // let minDeltaIndex = 0;
  let minDelta = Infinity;

  critterTimes.forEach((time, i) => {
    let diff = time - now.hour;
    if (diff > 0 && diff < minDelta) {
      minDelta = diff;
      // minDeltaIndex = i;
    }
  });

  if (minDelta === Infinity) {
    // 11pm - 4am gap
    minDelta = 5;
  }

  // convert hours to milliseconds
  return minDelta * 3600000;
}

export const getCritterSectionGroups = (critters, hemisphere) => {
  let groups = {};
  groups.months = getCritterSectionsMonths(critters, hemisphere);

  groups.days = getCritterSectionsToday(critters, hemisphere).map(section => ({
    ...section,
    leaving: groups.months[0].leaving,
  }));

  return groups;
};

const getCritterSectionsMonths = (critters, hemisphere) => {
  const now = DateTime.local();
  const deltas = [{ months: 1 }, { months: 2 }, { months: 3 }];

  let [cur, ...diffs] = calculateDeltaDiffs(critters, {
    deltas,
    hemisphere,
    unit: 'month',
  });

  let sections = [
    {
      section: 'Available this Month',
      critters: cur.available,
      leaving: cur.leaving,
    },
  ];
  return sections.concat(
    ...diffs.map((diff, i) => ({
      section: `New in ${now.plus(deltas[i]).monthLong}`,
      critters: diff.new,
      leaving: diff.leaving,
    }))
  );
};

const getCritterSectionsToday = (critters, hemisphere) => {
  const now = DateTime.local().set({ minute: 0 });

  let minDeltaIndex = 0;
  let minDelta = Infinity;

  critterTimes.forEach((time, i) => {
    let diff = time - now.hour;
    if (diff > 0 && diff < minDelta) {
      minDelta = diff;
      minDeltaIndex = i;
    }
  });

  const times = [
    ...critterTimes.slice(minDeltaIndex),
    ...critterTimes.slice(0, minDeltaIndex),
  ];

  const deltas = times.map(c => ({ hours: c - now.hour }));
  let [cur, ...diffs] = calculateDeltaDiffs(critters, {
    deltas,
    hemisphere,
    unit: 'hours',
  });

  return [
    {
      section: 'Available',
      critters: cur.available,
    },
    ...diffs.map((diff, i) => ({
      section: `Available at ${now
        .plus(deltas[i])
        .toLocaleString(DateTime.TIME_SIMPLE)}`,
      critters: diff.new,
    })),
  ];
};

export function filterCritters(critters, caught, filter) {
  return critters.filter(critter => {
    if (filter.caught) {
      if (caught.find(c => critter.no === c.no && critter.type === c.type))
        return false;
    }
    if (filter.type) {
      if (!~filter.type.indexOf(critter.type)) return false;
    }
    return true;
  });
}

const escapePath = s =>
  s
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/[^a-zA-Z0-9-/_]/g, '');

export const createCritterLink = critter =>
  escapePath(`/critter/${critter.type}/${critter.name}`);

export const createDiyLink = diy =>
  escapePath(`/${diy.section || diy.type}/${diy.name}`);

export const createImgSrc = ({ type, name, ext = 'png' }, asIs) =>
  withPrefix(
    `/${type}/${
      asIs ? name : `${name[0]}${name.slice(1).toLowerCase()}`
    }.${ext}`
  );

export const useEventListener = (event, callback) => {
  const target = useRef();
  const listener = useRef();

  useEffect(() => (listener.current = callback), [callback]);
  useEffect(() => {
    if (!target.current) return;
    const component = target.current;
    const e = e => listener.current(e);
    component.addEventListener(event, e);
    return () => {
      component.removeEventListener(event, e);
    };
  }, [event, target]);

  return target;
};

export const Image = ({ src, ...rest }) => {
  const [trueSrc, setSrc] = useState(src);

  useEffect(() => setSrc(src), [src]);

  return <img {...rest} onError={() => setSrc(diy404Src)} src={trueSrc} />;
};
