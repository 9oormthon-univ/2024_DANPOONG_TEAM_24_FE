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
          // 현재 선택된 주소 찾기
          const currentSelectedAddress = state.addresses.find(
            (addr) => addr.selected
          )

          // 새로운 주소 목록에 선택된 주소 상태 적용
          const updatedAddresses = addresses.map((newAddr) => {
            // 만약 현재 선택된 주소와 ID가 같다면 selected 상태 유지
            if (
              currentSelectedAddress &&
              currentSelectedAddress.id === newAddr.id
            ) {
              return {
                ...newAddr,
                selected: true,
              }
            }
            return {
              ...newAddr,
              selected: false, // 다른 모든 주소는 선택 해제
            }
          })

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
          // 좌표 중복 확인
          const isDuplicate = state.addresses.some(
            (addr) =>
              addr.coordinates?.latitude === coordinates?.latitude &&
              addr.coordinates?.longitude === coordinates?.longitude
          )
          if (isDuplicate) {
            console.warn('이미 동일한 좌표의 주소가 존재합니다.')
            return state
          }

          return {
            addresses: [
              ...state.addresses,
              {
                id,
                address,
                selected: false, // 새 주소는 기본적으로 선택되지 않음
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
