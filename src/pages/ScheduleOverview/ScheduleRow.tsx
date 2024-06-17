import classNames from "classnames"
import { Event } from "../../data/schedule.data"
import './ScheduleRow.css'
import { timeToMinutes } from '../../data/scheduleUtils'

export interface ScheduleRowProps {
  availableTimes: string[]
  time: string
  timeIndex: number
  availableTracks: string[]
  filteredEvents: Event[]
  itenerary: string[]
  iteneraryAdd: (sessionTitle: string) => void
  iteneraryRemove: (sessionTitle: string) => void
}

export const ScheduleRow = (props: ScheduleRowProps) => {
  const {
    availableTimes,
    time,
    timeIndex,
    availableTracks,
    filteredEvents,
    itenerary,
    iteneraryAdd,
    iteneraryRemove
  } = props

  const trackCells = availableTracks.map((track) => {
    const cellEvents = filteredEvents.filter(event => event.startTime === time && event.track === track)
    const timeSpan = cellEvents
      .map((event) => availableTimes.slice(timeIndex).findIndex((time) => time === event.endTime))
      .reduce((max, val) => Math.max(max, val), 1)
    const containsEvent = filteredEvents
      .filter(event => {
        if (event.track !== track) return false
        
        const startTimeMin = timeToMinutes(event.startTime)
        const endTimeMin = timeToMinutes(event.endTime)
        const timeMin = timeToMinutes(time)

        return startTimeMin < timeMin && endTimeMin >= timeMin
      }).length > 0
    
    if (containsEvent) return

    const hasEventInItenerary = cellEvents.some(event => itenerary.includes(event.sessionTitle))
    const eventCellClasses = classNames('EventCell', { hasContent: cellEvents.length > 0, inItenerary: hasEventInItenerary })
    return (
      <td
        className={eventCellClasses}
        key={`${time}-${track}`}
        rowSpan={timeSpan}
      >
        {
          cellEvents.map(event => {
            const isInItenerary = itenerary.includes(event.sessionTitle)
            return (
              <p key={event.sessionTitle}>
                <a href={event.sessionLink}>{event.sessionTitle}</a>
                <div>{event.startTime} - {event.endTime}</div>
                <button
                  onClick={() => isInItenerary ? iteneraryRemove(event.sessionTitle) : iteneraryAdd(event.sessionTitle)}
                >
                  {
                    isInItenerary ? 'Remove': 'Add'
                  }
                </button>
              </p>
            )
          })
        }
      </td>
    )
  })

  return (
    <tr className="ScheduleRow">
      <td>{time}</td>
      {trackCells}
    </tr>
  )
}