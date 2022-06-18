export type WithKids = {
  children?: any
}

export type ProjectType = {
  title: string;
  content: string;
  link: string;
  tags: string[];
}

export type MonthYearTuple = [number, number];

export type WorkHistoryItem = {
  company: string;
  title: string;
  description: string;
  beginDate: MonthYearTuple;
  endDate: MonthYearTuple;
  score: 1 | 2 | 3 | 4 | 5; // 1 - tech, 5 - biz
}

export type ContactInfo = {
  title: string;
  href: string;
}

export type SectionKey =
  | 'about'
  | 'projects'
  | 'work'
  | 'contact'


