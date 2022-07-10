import { useState } from 'react'
import {
  formatDate,
  getKeyFromDate,
  getDateFromKey,
  getTimelinePeriodMap, 
  getTimelinePeriodsBetween,
} from '../../utils/baseUtils'
import { WorkHistoryItem, WithKids } from '../../types/typeDefs'

const WorkHistoryHalves = ({ height }: { height: number }) => (
  <div className="work-history__halves" style={{ height }}>
    {['eng', 'mgmt'].map((a) => <div key={a}className={`work-history__half ${a}`} />)}
  </div>
)

const WorkHistoryHalfTitles = () => (
  <>
    <p className="work-history__half-title eng">Eng &uarr;</p>
    <p className="work-history__half-title mgmt">Mgmt &darr;</p>
  </>
)

type PeriodsProps = {
  periodKeys: string[],
  periodWidth: number,
}

const WorkHistoryPeriods = ({ periodKeys, periodWidth }: PeriodsProps) => (
  <div className="work-history__periods">
    {periodKeys.map((key, index) => {
      const [month, year] = getDateFromKey(key)
      const visibilityClass = index % 12 === 0 ? 'visible' : 'hidden'
      return (
        <div
          style={{ width: `${periodWidth}%` }}
          className={`work-history__period ${visibilityClass}`}
          key={`${month}.${year}`}
        >
          <p className={`work-history__period-label ${visibilityClass}`}>
            {year}
          </p>
        </div>
      )
    })}
  </div>
)

type ModalProps = {
  modalItem: WorkHistoryItem,
  closeModalItem: () => void,
}

const WorkHistoryModal = ({ modalItem: { title, company, description, beginDate, endDate }, closeModalItem }: ModalProps) => (
  <div className="work-history__modal">
    <p className="work-history__modal-title">
      {title},{' '}
      <span>{company}</span>{' '}
      <span>({formatDate(beginDate)} - {formatDate(endDate)})</span>
    </p>
    <p className="work-history__modal-subtitle">{description}</p>
    <div className="work-history__modal-close" onClick={closeModalItem}>+</div>
  </div>
)

type ItemsProps = {
  workHistory: WorkHistoryItem[],
  periodMap: Record<string, number>,
  periodWidth: number,
  height: number,
}

const WorkHistoryItems = ({ workHistory, periodMap, periodWidth, height }: ItemsProps) => {
  const [modalItem, setModalItem] = useState<null | WorkHistoryItem>(null)
  const openModalItem = (item: WorkHistoryItem) => setModalItem(item)
  const closeModalItem = () => setModalItem(null)

  return (
    <>
      <div className="work-history__items">
        {workHistory.map((item) => {
          const { company, title, beginDate, endDate, score } = item
          const periodsBetween = getTimelinePeriodsBetween(beginDate, endDate)
          const firstIndex = periodMap[getKeyFromDate(periodsBetween[0])]
          const style = {
            left: `${periodWidth * firstIndex}%`,
            width: `${periodWidth * periodsBetween.length}%`,
            top: `${((score - 1) * (height / 2))}px`,
          }

          return (
            <div
              className={`work-history__item ${score < 2 ? 'eng' : 'mgmt'}`}
              key={`${company}.${title}`}
              style={style}
              onClick={() => openModalItem(item)}
            />
          )
        })}
      </div>
      {modalItem && (
        <WorkHistoryModal modalItem={modalItem} closeModalItem={closeModalItem} />
      )}
    </>
  )
}

const WorkHistoryTimeline = ({ children }: WithKids) => (
  <div className="work-history__timeline">{children}</div>
)

const WorkHistory = ({ workHistory }: { workHistory: WorkHistoryItem[] }) => {
  const periodMap = getTimelinePeriodMap(workHistory)
  const periodKeys = Object.keys(periodMap)
  const height = 160
  const periodWidth = 100 / periodKeys.length

  return (
    <div className="work-history">
      <WorkHistoryTimeline>
        <WorkHistoryHalves height={height} />
        <WorkHistoryPeriods periodKeys={periodKeys} periodWidth={periodWidth} /> 
        <WorkHistoryHalfTitles />
        <WorkHistoryItems
          workHistory={workHistory}
          periodMap={periodMap}
          periodWidth={periodWidth}
          height={height}
        />
      </WorkHistoryTimeline>
    </div>
  )
}

export default WorkHistory
