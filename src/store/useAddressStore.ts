import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Address from '../pages/Main/Address'

export interface Address {
  id: number // 고유 식별자 추가
  address: string
  selected?: boolean
  isCurrentLocation?: boolean
  priority?: number // 우선순위 필드 추가
  coordinates?: {
    latitude: number
    longitude: number
  }
}

interface AddressStore {
  addresses: Address[]
  setAddresses: (addresses: Address[]) => void
  selectAddress: (id: number) => void
  addAddress: (
    id: number,
    address: string,
    isCurrentLocation?: boolean,
    coordinates?: { latitude: number; longitude: number },
    priority?: number
  ) => void
  removeAddress: (id: number) => void
  updatePriority: (id: number, priority: number) => void
  getSelectedAddress: () => string | undefined
  checkDuplicateCoordinates: (latitude: number, longitude: number) => boolean
}

const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],

      // 외부 데이터를 받아 상태 업데이트
      setAddresses: (addresses) => {
        set((state) => {
          // 이미 선택된 데이터가 있는지 확인
          const currentSelected = state.addresses.find((addr) => addr.selected)

          // 새로운 데이터에 기존 선택 상태 적용
          const updatedAddresses = addresses.map((addr, index) => ({
            ...addr,
            selected: currentSelected
              ? currentSelected.id === addr.id
              : index === 0, // 없으면 첫 번째 데이터 선택
          }))

          return { addresses: updatedAddresses }
        })
      },

      // 특정 주소 선택
      selectAddress: (id) => {
        set((state) => {
          const newAddresses = state.addresses.map((address) => ({
            ...address,
            selected: address.id === id,
          }))
          return { addresses: newAddresses }
        })
      },

      // 새로운 주소 추가
      addAddress: (
        id,
        address,
        isCurrentLocation = false,
        coordinates,
        priority = 0
      ) => {
        set((state) => {
          return {
            addresses: [
              ...state.addresses,
              {
                id,
                address,
                selected: true,
                isCurrentLocation,
                coordinates,
                priority,
              },
            ],
          }
        })
      },

      // 특정 주소 삭제
      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((address) => address.id !== id),
        }))
      },

      // 우선순위 업데이트
      updatePriority: (id, priority) => {
        set((state) => ({
          addresses: state.addresses.map((address) =>
            address.id === id
              ? { ...address, priority } // 우선순위 업데이트
              : address
          ),
        }))
      },

      // 선택된 주소 반환
      getSelectedAddress: () => {
        const state = get()
        const addresses = Array.isArray(state.addresses) ? state.addresses : [] // 방어적 체크
        const selectedAddress = addresses.find((address) => address.selected)
        return selectedAddress ? selectedAddress.address : undefined
      },

      // 좌표 중복 여부 확인
      checkDuplicateCoordinates: (latitude, longitude) => {
        return get().addresses.some(
          (addr) =>
            addr.coordinates?.latitude === latitude &&
            addr.coordinates?.longitude === longitude
        )
      },
    }),
    {
      name: 'selectedAddress', // 로컬스토리지 키 이름
      partialize: (state) => {
        // 선택된 주소만 저장
        const selectedAddress = state.addresses.find(
          (address) => address.selected
        )
        return selectedAddress
          ? { addresses: [selectedAddress] }
          : { addresses: [] }
      },
    }
  )
)

export default useAddressStore
