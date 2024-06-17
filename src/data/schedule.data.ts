export interface Event {
  date: string
  startTime: string
  endTime: string
  location: string
  track: string
  sessionTitle: string
  sessionLink: string
  sessionId: string
  speakers: Speaker[]
}

export interface Speaker {
  speaker: string
  speakerCompany: string
  speakerLink: string
}

export type Schedule = Event[]