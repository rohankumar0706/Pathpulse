import { create } from 'zustand'

export interface GpsPoint {
  lat:       number
  lng:       number
  speed:     number
  heading:   number
  altitude:  number
  timestamp: string
}

export interface ActiveJourney {
  id:            string
  title:         string
  transportMode: string
  startTime:     string
  status:        'ACTIVE' | 'PAUSED'
  currentLat?:   number
  currentLng?:   number
  totalDistance: number
  currentSpeed:  number
  maxSpeed:      number
  duration:      number
  route:         GpsPoint[]
}

interface JourneyState {
  activeJourney:    ActiveJourney | null
  isTracking:       boolean
  wsConnected:      boolean
  setActiveJourney: (j: ActiveJourney | null) => void
  updatePosition:   (point: GpsPoint) => void
  setTracking:      (v: boolean) => void
  setWsConnected:   (v: boolean) => void
  incrementDuration:() => void
}

export const useJourneyStore = create<JourneyState>((set) => ({
  activeJourney:   null,
  isTracking:      false,
  wsConnected:     false,

  setActiveJourney: (j) => set({ activeJourney: j }),

  updatePosition: (point) =>
    set((state) => {
      if (!state.activeJourney) return {}
      const route = [...state.activeJourney.route, point]
      return {
        activeJourney: {
          ...state.activeJourney,
          currentLat:   point.lat,
          currentLng:   point.lng,
          currentSpeed: point.speed,
          maxSpeed:     Math.max(state.activeJourney.maxSpeed, point.speed),
          route,
        },
      }
    }),

  setTracking:      (v) => set({ isTracking: v }),
  setWsConnected:   (v) => set({ wsConnected: v }),
  incrementDuration:() =>
    set((state) => ({
      activeJourney: state.activeJourney
        ? { ...state.activeJourney, duration: state.activeJourney.duration + 1 }
        : null,
    })),
}))
