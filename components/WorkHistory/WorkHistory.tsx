import { useState, useCallback } from 'react';
import { WorkHistoryItem, YearMonthTuple } from '../../types/base-types';

function getTotalMonths(dateTuple: YearMonthTuple) {
  const [year, months] = dateTuple;
  return (year * 12) + months;
}

function getMonthDiff(startTuple: YearMonthTuple, stopTuple: YearMonthTuple) {
  const startMonths = getTotalMonths(startTuple);
  const stopMonths = getTotalMonths(stopTuple);
  return stopMonths - startMonths;
}

function getStartStopYears(items: WorkHistoryItem[]): [YearMonthTuple, YearMonthTuple] {
  const start = items[0];
  const stop = items[items.length - 1];  
  return [
    [start.start[0], 0], // [startYear, 0 month]
    [stop.stop[0] + 1, stop.stop[1]], // [stopYear + 1, stopMonth]
  ];
}

const items: WorkHistoryItem[] = [
  {
    title: 'Software Engineer',
    company: 'Kasasa',
    start: [2009, 8],
    stop: [2010, 8],
    score: 1
  },
  {
    title: 'Sr. Implementation Engineer',
    company: 'Bazaarvoice',
    start: [2010, 8],
    stop: [2013, 9],
    score: 2
  },
  {
    title: 'Manager, Solutions Consulting',
    company: 'Spredfast',
    start: [2013, 9],
    stop: [2016, 8],
    score: 4
  },
  {
    title: 'Director, Technical Solutions',
    company: 'Spredfast',
    start: [2016, 8],
    stop: [2018, 4],
    score: 3
  },
  {
    company: 'Dropbox',
    title: 'Manager, Technical Architecture',
    start: [2018, 4],
    stop: [2019, 3],
    score: 3
  },
  {
    title: 'Sr. Software Engineer',
    company: 'IQVIA',
    start: [2019, 3],
    stop: [2022, 3],
    score: 1
  },
  {
    title: 'Sr. Software Engineer',
    company: 'AllStripes',
    start: [2022, 3],
    stop: [new Date().getFullYear(), new Date().getMonth() + 1],
    score: 1,
  }
];

const WorkHistory = () => {
  const [width, setWidth] = useState(860);
  const labelsWidth = 136;
  const chartWidth = width - labelsWidth;

  const itemHeight = 36;
  const height = itemHeight * 5;

  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const [min, max] = getStartStopYears(items);
  const months = getMonthDiff(min, max);
  const monthlyIncrements = chartWidth / months;
  const classPrefix = 'work-history';

  return (
    <div
      ref={measuredRef}
      className={classPrefix}
      style={{ height, width: '100%' }}
    >
      <div className={`${classPrefix}__labels`} style={{ width: labelsWidth }}>
        <p className={`${classPrefix}__label`}>Engineering ↑</p>
        <p className={`${classPrefix}__label`}>Management ↓</p>
      </div>

      <div className={`${classPrefix}__items`} style={{ width: chartWidth }}>
        {items.map(({ title, company, start, stop, score }, index) => {
          const x1 = getMonthDiff(min, start) * monthlyIncrements;
          const x2 = getMonthDiff(min, stop) * monthlyIncrements;
          const y = (height / 5) * score;

          console.log({
            start,
            stop,
            x1,
            x2,
            min, max,
            y,
          });

          return (
            <div
              key={`${title}.${company}`}
              className={`${classPrefix}__item ${classPrefix}__item${index % 2 === 0 ? "-odd" : "-even"}`}
              style={{
                left: x1,
                width: x2 - x1,
                top: y,
                height: itemHeight,
                marginTop: -itemHeight / 2,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkHistory;
