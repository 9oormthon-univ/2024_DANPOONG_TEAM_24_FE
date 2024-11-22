import { create } from 'zustand'

interface Address {
  address: string
  selected?: boolean
  isCurrentLocation?: boolean
}

interface AddressStore {
  addresses: Address[]
  selectAddress: (index: number) => void
  addAddress: (address: string, isCurrentLocation?: boolean) => void
  getSelectedAddress: () => string | undefined
}

const useAddressStore = create<AddressStore>((set, get) => ({
  addresses: JSON.parse(localStorage.getItem('addresses') || '[]'),

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
  addAddress: (address, isCurrentLocation = false) => {
    set((state) => {
      const newAddress = { address, selected: false, isCurrentLocation }
      const newAddresses = [...state.addresses, newAddress]
      return { addresses: newAddresses }
    })
  },

  // 현재 설정된 주소 반환
  getSelectedAddress: () => {
    const state = get()
    const selectedAddress = state.addresses.find((address) => address.selected)
    return selectedAddress ? selectedAddress.address : undefined
  },
}))

export default useAddressStore
