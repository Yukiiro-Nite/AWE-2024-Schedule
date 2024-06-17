import fs from 'node:fs'
import jsdom from 'jsdom'
const { JSDOM } = jsdom

const sessionIdRegexp = new RegExp(/https:\/\/events\.awexr\.com\/usa-2024\/session\/(\d+)/)

const getSchedule = (document) => {
  return Array.from(document.querySelectorAll('.card__agenda')).map(cardEl => {
    const timeEl = cardEl.querySelector('.card__agenda-header--time')
    const [startTimeEl, endTimeEl] = timeEl.querySelectorAll('span')
    const sessionLocationEl = cardEl.querySelector('.session-location')
    const trackEl = cardEl.querySelector('.track-id')
    const dateEl = cardEl.querySelector('.date-tag')
    const sessionEl = cardEl.querySelector('.session_name')
    const speakerCardEls = cardEl.querySelectorAll('.speaker-card')
    const sessionId = sessionIdRegexp.exec(sessionEl.href)?.[1] ?? ''

    return {
      date: dateEl.textContent.trim(),
      startTime: startTimeEl.textContent.trim(),
      endTime: endTimeEl.textContent.trim(),
      location: sessionLocationEl.textContent.trim(),
      track: trackEl.textContent.trim(),
      sessionTitle: sessionEl.textContent.trim(),
      sessionLink: sessionEl.href,
      sessionId,
      speakers: Array.from(speakerCardEls)
        .map(speakerCard => {
          const speakerEl = speakerCard.querySelector('.agenda-speakers')
          if (!speakerEl) return

          const speakerText = speakerEl.textContent
          const [speakerName, speakerCompany] = speakerText.split(' - ')

          return {
            speaker: speakerName.trim(),
            speakerCompany: speakerCompany.trim(),
            speakerLink: speakerCard.href
          }
        })
        .filter(Boolean)
    }
  })
}

const url = 'https://events.awexr.com/usa-2024/agenda'
fetch(url)
  .then(res => res.text())
  .then(html => {
    const dom = new JSDOM(html)
    const schedule = getSchedule(dom.window.document)

    fs.writeFileSync('src/data/schedule.json', JSON.stringify(schedule, undefined, 2))
    console.log('Wrote schedule to: src/data/schedule.json')
  })