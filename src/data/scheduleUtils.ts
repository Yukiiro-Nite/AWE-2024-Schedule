import { Schedule, Event } from "./schedule.data"

export const getUnique = (events: Schedule, attrName: keyof Event) => Object.keys(Object.fromEntries(events.map(event => [event[attrName]])))

export const getTracks = (events: Schedule) => getUnique(events, 'track')

export const getLocations = (events: Schedule) => getUnique(events, 'location')

export const getTimes = (events: Schedule) => Object.keys(Object.fromEntries(
  getUnique(events, 'startTime')
    .concat(getUnique(events, 'endTime'))
    .map(time => [time])
))

export const timeToMinutes = (timeStr: string): number => {
  const [time, period] = timeStr.split(' ')
  const [hours, minutes] = time.split(':')

  const periodMinutes = period === 'PM' ? 12 * 60 : 0
  const hourMinutes = hours === '12' ? 0 : parseInt(hours) * 60

  return periodMinutes + hourMinutes + parseInt(minutes)
}