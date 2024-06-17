import { ChangeEvent, useCallback, useMemo, useState } from "react"
import { getStoredItenerary, setStoredItenerary } from "../../utils/storageUtils"
import schedule from '../../data/schedule.json'
import { Event } from "../../data/schedule.data"
import { timeToMinutes } from "../../data/scheduleUtils"
import { DaySection } from "./DaySection"
import './IteneraryPage.css'

const eventsByTitle = Object.fromEntries(
  schedule.map(event => [event.sessionTitle, event])
) as Record<string, Event>

export const IteneraryPage = () => {
  const [itenerary, setItenerary] = useState<string[]>(getStoredItenerary())
  const dataExport = useMemo(() => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(JSON.stringify(itenerary, undefined, 2))
    const byteString = Array.from(bytes, (byte) =>
      String.fromCodePoint(byte),
    ).join("")
    return `data:application/json;base64,${btoa(byteString)}`
  }, [itenerary])
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

  const handleImport = useCallback(async (event: ChangeEvent) => {
    const importFileEl = event.target as HTMLInputElement
    const importFileBlob = importFileEl.files?.[0]
    const reader = new FileReader()
    const importData = await new Promise<string>((resolve) => {
      reader.addEventListener('load', readerEvent => { resolve(readerEvent?.target?.result as string) })

      if (importFileBlob !== undefined) {
        reader.readAsText(importFileBlob)
      } else {
        resolve('')
      }
    })

    try {
      const itenerary = JSON.parse(importData)
      setItenerary(itenerary)
      setStoredItenerary(itenerary)
    } catch (error) {
      console.error('Invalid import file: ', error)
    }
  }, [setItenerary])

  return (
    <main className="IteneraryPage">
      <h1>Itenerary</h1>
      <details>
        <summary>Import / Export</summary>
        <div className="IOContainer">
          <label>
            <span>Import</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
            />
          </label>
          <a
            download="itenerary.json"
            href={dataExport}
          >Export</a>
        </div>
      </details>
      <DaySection date="Jun 18" events={events} />
      <DaySection date="Jun 19" events={events} />
      <DaySection date="Jun 20" events={events} />
    </main>
  )
}