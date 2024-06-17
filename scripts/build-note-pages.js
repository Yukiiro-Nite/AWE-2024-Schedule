import fs from 'node:fs'
import path from 'node:path'
import filenamify from 'filenamify';

const scheduleFile = fs.readFileSync('src/data/schedule.json')
const schedule = JSON.parse(scheduleFile)

const eventsByTitle = Object.fromEntries(
  schedule.map(event => [event.sessionTitle, event])
)

const getFileSafeStr = (str) => filenamify(str, {replacement: '_'});

export const buildNotePages = (itenerary) => {
  itenerary
    .map(sessionTitle => eventsByTitle[sessionTitle])
    .filter(Boolean)
    .map(event => {
      const day = event.date.split(" ")[1]
      const fileSafeTitle = getFileSafeStr(event.sessionTitle)
      return {
        fileName: `2024-06-${day}_${fileSafeTitle}.md`,
        content: `# ${event.sessionTitle}\n## ${event.date} ${event.startTime} - ${event.endTime}\n### ${event.location}`
      }
    })
    .forEach(note => {
      // eslint-disable-next-line no-undef
      fs.writeFileSync(path.join(process.cwd(), 'output', note.fileName), note.content)
    })
}

// eslint-disable-next-line no-undef
const iteneraryPath = process.argv.slice(2)[0]
if (iteneraryPath) {
  const iteneraryFile = fs.readFileSync(iteneraryPath, 'utf-8')
  const itenerary = JSON.parse(iteneraryFile)

  buildNotePages(itenerary)
}