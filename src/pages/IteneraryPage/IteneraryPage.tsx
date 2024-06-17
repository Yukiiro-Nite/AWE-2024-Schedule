import { useMemo, useState } from "react"
import { getStoredItenerary } from "../../utils/storageUtils"
import schedule from '../../data/schedule.json'
import { Event } from "../../data/schedule.data"
import { timeToMinutes } from "../../data/scheduleUtils"
import { DaySection } from "./DaySection"
const eventsByTitle = Object.fromEntries(
  schedule.map(event => [event.sessionTitle, event])
) as Record<string, Event>

export const IteneraryPage = () => {
  const [itenerary] = useState<string[]>(getStoredItenerary())
  const events = useMemo(() => {
    return itenerary
      .sort((a, b) => {
        const eventA = eventsByTitle[a]
        const eventB = eventsByTitle[b]
        if (!eventA) return 1
        if (!eventB) return -1

        const dateCompare = eventA.date.localeCompare(eventB.date)
        if (dateCompare !== 0) return dateCompare

        const minutesA = timeToMinutes(eventA.startTime)
        const minutesB = timeToMinutes(eventB.startTime)

        return minutesA - minutesB
      })
      .map(title => eventsByTitle[title])
      .filter(Boolean)
  }, [itenerary])

  return (
    <main className="IteneraryPage">
      <h1>Itenerary</h1>
      <DaySection date="Jun 18" events={events} />
      <DaySection date="Jun 19" events={events} />
      <DaySection date="Jun 20" events={events} />
    </main>
  )
}