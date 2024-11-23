import { create } from 'zustand'

interface Place {
  storeId: string
  storeName: string
  roadAddress: string
  latitude: number
  longitude: number
  distance?: number
}

interface MapState {
  userPosition: {
    lat: number
    lng: number
  }
  setUserPosition: (position: { lat: number; lng: number }) => void
  places: Place[]
  setPlaces: (places: Place[]) => void
  selectedPlace: Place | null
  setSelectedPlace: (place: Place | null) => void
}

const useMapStore = create<MapState>((set) => ({
  userPosition: { lat: 0, lng: 0 },
  setUserPosition: (position) => set({ userPosition: position }),
  places: [],
  setPlaces: (places) => set({ places }),
  selectedPlace: null, // 선택된 장소 초기값
  setSelectedPlace: (place) => set({ selectedPlace: place }), // 선택된 장소 설정 함수
}))

export default useMapStore
