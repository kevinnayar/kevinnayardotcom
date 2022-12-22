export type WithKids = {
  children?: any
};

export type YearMonthTuple = [number, number];

export type WorkHistoryItem = {
  company: string;
  title: string;
  start: YearMonthTuple;
  stop: YearMonthTuple;
  score: 1 | 2 | 3 | 4 | 5; // 1 - tech, 5 - biz
};

export type SectionKey =
  | 'about'
  | 'work'
  | 'contact'
;




