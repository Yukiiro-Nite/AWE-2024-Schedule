import { Link } from "react-router-dom"
import { Event } from "../../data/schedule.data"

export interface EventCardProps {
  event: Event
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <li className="EventCard">
      <h3 className="SessionTitle">
        <a href={event.sessionLink}>{event.sessionTitle}</a>
      </h3>
      <div className="TimeSection">
        <time className="StartTime">{event.startTime}</time>{' - '}
        <time className="EndTime">{event.endTime}</time>
      </div>
      <Link to={`/map?location=${event.location}`} className="Location">{event.location}</Link>
    </li>
  )
}