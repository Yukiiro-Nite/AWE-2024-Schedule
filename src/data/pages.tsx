import { IteneraryPage } from "../pages/IteneraryPage/IteneraryPage"
import { MapPage } from "../pages/MapPage/MapPage"
import { ScheduleOverview } from "../pages/ScheduleOverview/ScheduleOverview"

export interface Page {
  href: string,
  title: string,
  description: string,
  element: JSX.Element
}

export const pages = [
  {
    href: '/schedule-overview',
    title: 'Schedule Overview',
    description: 'View the entire schedule for AWE 2024',
    element: <ScheduleOverview />
  },
  {
    href: '/itenerary',
    title: 'Itenerary',
    description: 'View the events you play to attend at AWE 2024',
    element: <IteneraryPage />
  },
  {
    href: '/map',
    title: 'Venue Map',
    description: 'Venue map for AWE 2024',
    element: <MapPage />
  }
]