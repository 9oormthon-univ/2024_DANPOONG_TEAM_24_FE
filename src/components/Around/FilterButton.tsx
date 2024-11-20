interface FilterButtonProps {
  id: number
  label: string
  selectedFilter: number | null
  onClick: (id: number) => void
  selected: boolean // 24/11/20 희진 추가: 선택된 요소인지 판별
}

const FilterButton = ({
  id,
  label,
  selectedFilter,
  onClick,
  selected, // 24/11/20 희진 추가
}: FilterButtonProps) => {
  return (
    <button
      id={label} // 24/11/20 희진 추가
      onClick={() => onClick(id)}
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-M00 
                    border border-200 transition-colors focus:outline-none 
                    focus-visible:ring-2 ${
                      selected ? 'bg-Main2 border-Main' : 'bg-white' // 24/11/20 희진 selectedFilter 사용에서 selected로 변경
                    }`}
    >
      {label}
    </button>
  )
}

export default FilterButton
