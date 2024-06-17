import { useCallback, useMemo, useState } from 'react'
import { FilterList } from '../../components/FilterList/FilterList'
import schedule from '../../data/schedule.json'
import { ScheduleRow } from './ScheduleRow'
import { getLocations, getTimes, getTracks, getUnique, timeToMinutes } from '../../data/scheduleUtils'
import { getStoredItenerary, setStoredItenerary } from '../../utils/storageUtils'
import './ScheduleOverview.css'

const tracks = getTracks(schedule)
const locations = getLocations(schedule)
const days = getUnique(schedule, 'date')

export const ScheduleOverview = () => {
  const [filterTracks, setFilterTracks] = useState<string[]>([])
  const [filterLocations, setFilterLocations] = useState<string[]>([])
  const [filterDate, setFilterDate] = useState<string>(days[0])
  const [itenerary, setItenerary] = useState<string[]>(getStoredItenerary())
  const filteredEvents = useMemo(() => {
    let events = schedule.filter(event => event.date === filterDate)

    if (filterTracks.length > 0) {
      events = events.filter(event => filterTracks.includes(event.track))
    }

    if (filterLocations.length > 0) {
      events = events.filter(event => filterLocations.includes(event.location))
    }

    return events
  }, [filterTracks, filterLocations, filterDate])
  const availableTracks = useMemo(() => getTracks(filteredEvents).sort((a,b) => a.localeCompare(b)), [filteredEvents])
  const availableTimes = useMemo(() => {
    return getTimes(filteredEvents)
      .sort((a,b) => {
        const minutesA = timeToMinutes(a)
        const minutesB = timeToMinutes(b)

        return minutesA - minutesB
      })
  }, [filteredEvents])

  const handleIteneraryAdd = useCallback((sessionTitle: string) => {
    const newItenerary = Object.keys(Object.fromEntries(itenerary.concat(sessionTitle).map((title) => [title])))
    setStoredItenerary(newItenerary)
    setItenerary(newItenerary)
  }, [itenerary, setItenerary])

  const handleIteneraryRemove = useCallback((sessionTitle: string) => {
    const newItenerary = itenerary.filter((title) => title !== sessionTitle)
    setStoredItenerary(newItenerary)
    setItenerary(newItenerary)
  }, [itenerary, setItenerary])

  return (
    <main>
      <h1>Schedule Overview</h1>
      <details>
        <summary>
          <h2>Filters</h2>
        </summary>

        <label>
          <span>Day</span>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
            {
              days.map(day => (<option key={day} value={day}>{day}</option>))
            }
          </select>
        </label>

        <FilterList
          displayName='Tracks'
          name='tracks'
          items={tracks}
          onChange={setFilterTracks}
        />

        <FilterList
          displayName='Locations'
          name='locations'
          items={locations}
          onChange={setFilterLocations}
        />
      </details>
      <table
        className="ScheduleTable"
      >
        <thead className="ScheduleHeader">
          <tr>
            <th>Time</th>
            {availableTracks.map(track => (<th key={track}>{track}</th>))}
          </tr>
        </thead>
        <tbody>
          {
            availableTimes.map((time, i) => (
              <ScheduleRow
                key={time}
                availableTimes={availableTimes}
                time={time}
                timeIndex={i}
                availableTracks={availableTracks}
                filteredEvents={filteredEvents}
                itenerary={itenerary}
                iteneraryAdd={handleIteneraryAdd}
                iteneraryRemove={handleIteneraryRemove}
              />
            ))
          }
        </tbody>
      </table>
    </main>
  )
}
