import { useSearchParams } from "react-router-dom"
import './MapPage.css'
import classNames from "classnames"
import schedule from '../../data/schedule.json'
import { getLocations } from "../../data/scheduleUtils"

const locations = getLocations(schedule)
  .filter(Boolean)
  .map (location => ({
    src: `images/locations/${location}.png`,
    location
  }))

export const MapPage = () => {
  const [params] = useSearchParams()
  const location = params.get('location')
  
  const mainImageClasses = classNames('MapImage MainMap', { faded: location })

  return (
    <main className="MapPage">
      <img className={mainImageClasses} src="images/AWE-2024_map.png" />
      {
        locations.map(locationImg => {
          const locationClassnames = classNames('MapImage location', { selected: locationImg.location === location })
          return (
            <img
              key={locationImg.location}
              className={locationClassnames}
              src={locationImg.src}
            />
          )
        })
      }
    </main>
  )
}