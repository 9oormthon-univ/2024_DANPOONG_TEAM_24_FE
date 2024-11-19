interface FilterButtonProps {
    id: number
    label: string
    selectedFilter: number | null
    onClick: (id: number) => void
  }
  
  const FilterButton = ({ id, label, selectedFilter, onClick }: FilterButtonProps) => {
    return (
      <button
        onClick={() => onClick(id)}
        className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-M00 
                    border border-200 transition-colors focus:outline-none 
                    focus-visible:ring-2 ${selectedFilter === id ? "bg-Main2 border-Main" : "bg-white"}`}
      >
        {label}
      </button>
    );
  };
  
  export default FilterButton
  