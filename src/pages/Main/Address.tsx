import { Link } from 'react-router-dom'
import Cn from '../../utils/Cn'
import search from '../../assets/common/Search.svg'
import track from '../../assets/address/Track.svg'
import arrow from '../../assets/common/Arrow.svg'
import AddressCard from '../../components/Main/AddressCard'
import { useAddress } from '../../hooks/Main/UseAddress'
import LoadingSplash from '../Splash/LoadingSplash'

export default function Address() {
  const { addresses, isLoading, handleSetCurrentLocation } = useAddress()

  return (
    <>
      {isLoading && <LoadingSplash />}
      <div className="flex flex-col items-center justify-center">
        <header>
          <div className="pt-7 pl-[17px] pr-[19px] pb-[6px] w-[390px]">
            <div className="flex flex-row gap-[130px] items-center">
              <Link to={'/'}>
                <img src={arrow} alt="arrow" className="rotate-90" />
              </Link>
              <div className="flex-grow font-SB00 text-[18px] leading-[140%] text-nowrap">
                주소 설정
              </div>
            </div>
            <div className="relative mt-[15px] w-full">
              <input
                id="searchStore"
                type="text"
                placeholder="지번, 도로명으로 검색해보세요"
                className={Cn(
                  'py-[13px] pl-[13px] pr-[27px] w-full font-R00 focus:outline-none',
                  'border border-200 rounded-lg placeholder:text-200 placeholder:text-sm'
                )}
              />
              <img
                src={search}
                alt="trackIcon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
              />
            </div>
          </div>
        </header>
        <section className="w-[390px] px-4">
          <article className="pt-[10px]">
            <button
              onClick={handleSetCurrentLocation} // 버튼 클릭 시 현재 위치 설정
              disabled={isLoading} // 로딩 중이면 버튼 비활성화
              className="w-full bg-Main rounded-xl cursor-pointer"
            >
              <div className="px-[83.5px] py-3 flex flex-row justify-between">
                <img src={track} alt="Track my location" />
                <div className="font-SB00 text-[16px]">
                  현재 위치로 설정하기
                </div>
              </div>
            </button>
          </article>
          <article className="pt-[11px]">
            {addresses.map((item, index) => (
              <AddressCard
                key={
                  item.isCurrentLocation
                    ? `${item.address}-${index}`
                    : `${index}`
                } // 각 주소마다 고유한 key 설정
                index={index}
                selected={item.selected}
                address={item.address}
                isLastAddress={index === addresses.length - 1}
              />
            ))}
          </article>
        </section>
      </div>
    </>
  )
}
