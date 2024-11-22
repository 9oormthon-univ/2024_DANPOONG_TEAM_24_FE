import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Address {
  address: string
  selected?: boolean
  isCurrentLocation?: boolean
  coordinates?: {
    latitude: number
    longitude: number
  }
}

interface AddressStore {
  addresses: Address[]
  selectAddress: (index: number) => void
  addAddress: (
    address: string,
    isCurrentLocation?: boolean,
    coordinates?: { latitude: number; longitude: number }
  ) => void
  getSelectedAddress: () => string | undefined
}

const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],

      // 현재 설정된 주소
      selectAddress: (index) => {
        set((state) => {
          const newAddresses = [...state.addresses]
          newAddresses.forEach((item, idx) => {
            item.selected = idx === index
          })
          return { addresses: newAddresses }
        })
      },

      // 새로운 받아온 주소가 추가된 주소 리스트
      addAddress: (address: string, isCurrentLocation = false, coordinates) => {
        set((state) => ({
          addresses: [
            ...state.addresses,
            {
              address,
              selected: false,
              isCurrentLocation,
              coordinates, // 좌표 정보 저장
            },
          ],
        }))
      },

      // 현재 설정된 주소 반환
      getSelectedAddress: () => {
        const state = get()
        const selectedAddress = state.addresses.find(
          (address) => address.selected
        )
        return selectedAddress ? selectedAddress.address : undefined
      },
    }),
    {
      name: 'selectedAddress', // 로컬스토리지 키 이름
      partialize: (state) => ({ addresses: state.addresses }), // 저장할 상태만 선택
    }
  )
)

export default useAddressStore
