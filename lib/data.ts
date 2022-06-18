import { WorkHistoryItem, ProjectType, ContactInfo } from '../types/typeDefs'

export const stack = [
  'Typescript', // col 1
  'Next.js',
  'Redis',
  'NoSQL',
  'React', // col 2
  'Redux/RTK',
  'Pulsar/Kafka',
  'React Native',
  'Node', // col 3
  'Postgres',
  'Kinesis',
  'Golang',
  'Express/NestJS', // col 4
  'AWS/GCP',
  'Temporal.io',
  'Jest'
]

export const projects: ProjectType[] = [
  {
    title: 'whiskypick',
    link: 'https://whiskypick.com',
    content:
      'A collection of ratings for whiskies that we\'ve tasted in our local whisky club in Austin, Texas.',
    tags: ['React/Redux', 'Firebase']
  },
  {
    title: 'temporis',
    link: 'https://github.com/kevinnayar/temporis#readme',
    content:
      'An open-source node module to capture app state and implement redo/undo in Javascript contexts.',
    tags: ['NPM', 'Typescript']
  },
  {
    title: 'aggregarian',
    link: 'https://github.com/kevinnayar/aggregarian',
    content:
      'A Raspberry Pi powered server sending soil moisture sensor data from plants to Google Cloud.',
    tags: ['Golang', 'Raspberry Pi']
  }
]

export const workHistory: WorkHistoryItem[] = [
  {
    company: 'Kasasa',
    title: 'Frontend Engineer',
    description: 'Lead developer in charge writing scaleable front-end code and creating rich and reusable Javascript components.',
    beginDate: [8, 2009],
    endDate: [9, 2010],
    score: 1
  },
  {
    company: 'Bazaarvoice',
    title: 'Senior Implementation Consultant',
    description: 'Technical consultant for deployments of Bazaarvoice\'s platform and usage of their APIs/SDK for strategic enterprise customers.',
    beginDate: [9, 2010],
    endDate: [9, 2013],
    score: 2
  },
  {
    company: 'Khoros',
    title: 'Senior Manager - Solutions Consulting',
    description: 'Built and managed the global developer advocacy practice within Spredfast to provide best-in-class services to enterprise customers.',
    beginDate: [9, 2013],
    endDate: [8, 2016],
    score: 3
  },
  {
    company: 'Khoros',
    title: 'Director - Technical Solutions',
    description: 'Led the Technical Solutions group with consultants and engineers responsible for developer advocacy and custom product development.',
    beginDate: [8, 2016],
    endDate: [4, 2018],
    score: 3
  },
  {
    company: 'Dropbox',
    title: 'Manager - Technical Architecture',
    description: 'Led the Technical Architecture team that implemented large scale deployments for enterprise customers and supported them via Dropbox\'s APIs and SDKs.',
    beginDate: [4, 2018],
    endDate: [3, 2019],
    score: 4
  },
  {
    company: 'IQVIA',
    title: 'Senior Software Engineer',
    description: 'Product engineering with a React/Redux frontend, Express/Postgres backend, React Native for mobile, and Pulsar & Kinesis for the event-driven architecture.',
    beginDate: [3, 2019],
    endDate: [3, 2022],
    score: 1
  },
  {
    company: 'AllStripes',
    title: 'Senior Software Engineer',
    description: 'Product engineering with a React/Next.js frontend, Nest.js/Express backend and Prisma-wrapped Postgres for the persistence layer.',
    beginDate: [3, 2022],
    endDate: [new Date().getMonth() + 1, new Date().getFullYear()],
    score: 1
  }
]

export const contactList: ContactInfo[] = [
  { title: 'Email', href:' mailto:kevin.nayar@gmail.com' },
  { title: 'Github', href:' http://github.com/kevinnayar' },
  { title: 'LinkedIn', href:' http://linkedin.com/in/kevinnayar' },
]
