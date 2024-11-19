import { create } from 'zustand'

interface AddressStore {
  addresses: { address: string; selected: boolean }[]
  selectAddress: (index: number) => void
  selectedAddress: string | null
  getSelectedAddress: () => string | null // 외부에서 현재 선택된 주소를 가져오기 위한 메서드
}

const useAddressStore = create<AddressStore>((set, get) => ({
  // 더미 주소 데이터입니다.
  addresses: [
    { address: '광진구 능동로 209', selected: true },
    { address: '광진구 능동로 210', selected: false },
  ],
  selectedAddress: '서울 광진구 능동로 209',

  selectAddress: (index) =>
    set((state) => {
      const newAddresses = state.addresses.map((addr, i) => ({
        ...addr,
        selected: i === index,
      }))
      const newSelected = newAddresses[index].address
      console.log('Selected Address:', newSelected) // 선택된 주소를 콘솔에 출력
      return { addresses: newAddresses, selectedAddress: newSelected }
    }),

  getSelectedAddress: () => get().selectedAddress, // 현재 선택된 주소 반환
}))

export default useAddressStore
