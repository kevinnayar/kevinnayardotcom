import { MonthYearTuple, WorkHistoryItem } from '../types/typeDefs'

export function formatDate(date: MonthYearTuple): string {
  const isCurrent = new Date().getMonth() + 1 === date[0] && new Date().getFullYear() === date[1]
  if (isCurrent) return 'Current'

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthIndex = date[0] - 1
  const month = months[monthIndex]
  return `${month} ${date[1]}`
}

export function getKeyFromDate(tuple: MonthYearTuple): string {
  const [month, year] = tuple
  return `key_${month}_${year}`
}

export function getDateFromKey(key: string): MonthYearTuple {
  const [_prefix, month, year] = key.split('_').map(s => Number(s))
  return [month, year]
}

export function getTimelinePeriodMap(workHistory: WorkHistoryItem[]) {
  let beginYear: undefined | number = undefined
  let endYear: undefined | number = undefined

  for (const { beginDate, endDate } of workHistory) {
    if (!beginYear) beginYear = beginDate[1]
    if (!endYear) endYear = endDate[1]

    if (beginYear && beginDate[1] < beginYear) {
      beginYear = beginDate[1]
    }

    if (endYear && endDate[1] > endYear) {
      endYear = endDate[1]
    }
  }

  if (!beginYear || !endYear) {
    throw new Error('Could not calculate begin or end')
  }

  let index = 0
  let currentDate: undefined | MonthYearTuple = [1, beginYear]
  
  const periodMap: Record<string, number> = {
    [`${getKeyFromDate(currentDate)}`]: 0
  }

  while (currentDate) {
    if (currentDate) {
      const month = currentDate[0]
      const year = currentDate[1]

      if (month < 12 && year <= endYear) {
        currentDate[0] += 1
        index += 1
        periodMap[`${getKeyFromDate(currentDate)}`] = index
      } else if (month === 12 && year < endYear) {
        currentDate[0] = 1
        currentDate[1] += 1
        index += 1
        periodMap[`${getKeyFromDate(currentDate)}`] = index
      } else {
        currentDate = undefined
      }
    }
  }

  return periodMap
}

export function getTimelinePeriodsBetween(beginDate: MonthYearTuple, endDate: MonthYearTuple) {
  let currentDate: undefined | MonthYearTuple = [...beginDate]
  const periods: MonthYearTuple[] = [[...currentDate]]

  while (currentDate) {
    if (currentDate) {
      const month = currentDate[0]
      const year = currentDate[1]

      if (
        (month < 12 && year === currentDate[1] && year !== endDate[1]) ||
        (year === endDate[1] && month < endDate[0])
      ) {
        currentDate[0] += 1
        periods.push([...currentDate])
      } else if (month === 12 && year < endDate[1]) {
        currentDate[0] = 1
        currentDate[1] += 1
        periods.push([...currentDate])
      } else {
        currentDate = undefined
      }
    }
  }

  return periods
}
