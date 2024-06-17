import { Event } from "../../data/schedule.data"
import { EventCard } from "./EventCard"

export interface DaySectionProps {
  date: string
  events: Event[]
}

export const DaySection = (props: DaySectionProps) => {
  const {
    date,
    events
  } = props

  return (
    <section className="DaySection">
      <h2>{date}</h2>
      <ul>
        {
          events
            .filter(event => event.date === date)
            .map(event => {
              return (
                <EventCard
                  key={event.sessionTitle}
                  event={event}
                />
              )
            })
        }
      </ul>
    </section>
  )
}