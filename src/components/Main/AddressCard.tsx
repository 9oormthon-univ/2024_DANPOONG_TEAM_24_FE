import useAddressStore from '../../store/useAddressStore'
import LocationIcon from '../../assets/address/Location.svg?react'

interface AddressCardProps {
  index: number
  selected?: boolean
  address: string
  isLastAddress?: boolean
}

export default function AddressCard({
  index,
  selected,
  address,
  isLastAddress,
}: AddressCardProps) {
  const { selectAddress } = useAddressStore()

  return (
    <div
      onClick={() => selectAddress(index)}
      className={`py-5 w-full flex flex-row gap-[10px] ${
        isLastAddress ? '' : 'border-b'
      } border-200 items-center cursor-pointer`}
    >
      <LocationIcon
        style={{
          width: selected ? '24px' : '20px',
          height: selected ? '24px' : '20px',
          fill: selected ? '#F4635E' : '#CBCDD2',
        }}
      />
      <div
        className={`font-SB00 text-[16px] ${
          selected ? 'text-800' : 'text-400'
        }`}
      >
        {address}
      </div>
      {selected && (
        <div className="p-[6px] bg-100 text-400 text-[10px] rounded-[20px] border border-200">
          현재 설정된 주소
        </div>
      )}
    </div>
  )
}
