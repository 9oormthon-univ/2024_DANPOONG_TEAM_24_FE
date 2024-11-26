import useAddressStore from '../../store/useAddressStore'
import LocationIcon from '../../assets/address/Location.svg?react'
import deleteIcon from '../../assets/address/Close.svg'
import { useAddress } from '../../hooks/Main/UseAddress'

interface AddressCardProps {
  id: number
  index: number
  selected?: boolean
  address: string
  isLastAddress?: boolean
}

export default function AddressCard({
  id, // id 받기
  selected,
  address,
  isLastAddress,
}: AddressCardProps) {
  const { selectAddress } = useAddressStore()
  const { deleteLocation, updatePriority } = useAddress()

  const handleClick = async () => {
    selectAddress(id) // 주소 선택

    try {
      await updatePriority(id) // 우선순위 업데이트
    } catch (error) {
      console.error('우선순위 업데이트 중 오류 발생:', error)
    }
  }

  return (
    <div
      onClick={handleClick} // 기존대로 index 사용
      className={`px-[1px] py-5 w-full flex justify-between ${
        isLastAddress ? '' : 'border-b'
      } border-200 items-center cursor-pointer`}
    >
      <div className="flex flex-row gap-[10px] items-center">
        <LocationIcon
          style={{
            width: selected ? '24px' : '20px',
            height: selected ? '24px' : '20px',
            fill: selected ? '#F4635E' : '#CBCDD2',
          }}
        />
        <div
          className={`font-SB00 text-[14px] ${
            selected
              ? 'text-800 max-w-[159px] whitespace-normal break-words overflow-hidden text-ellipsis line-clamp-2 '
              : 'text-400'
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

      <img
        src={deleteIcon}
        alt="delete address"
        onClick={(e) => {
          e.stopPropagation() // 클릭 이벤트 전파 방지
          deleteLocation(id) // id 사용
        }}
        className="w-5 h-5"
      />
    </div>
  )
}
