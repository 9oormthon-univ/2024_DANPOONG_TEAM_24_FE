import { create } from 'zustand'

interface ListFilterOptionState {
  selectedFilterOption: string
  setSelectedFilterOption: (selected: string) => void
}

const useListFilterOptionStore = create<ListFilterOptionState>((set) => ({
  selectedFilterOption: '전체',
  setSelectedFilterOption: (selected) =>
    set({ selectedFilterOption: selected }),
}))

export default useListFilterOptionStore
