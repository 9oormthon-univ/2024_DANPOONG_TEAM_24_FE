import { Link } from 'react-router-dom'
import Cn from '../../utils/Cn'
import search from '../../assets/common/Search.svg'
import track from '../../assets/address/Track.svg'
import arrow from '../../assets/common/Arrow.svg'
import AddressCard from '../../components/Main/AddressCard'

export default function Address() {
  // 더미 주소 데이터입니당
  const addresses = [
    { address: '서울 광진구 능동로 209', selected: true },
    { address: '서울 광진구 능동로 209', selected: false },
  ]

  return (
    <>
      <header>
        <div className="pt-7 pl-[17px] pr-[19px] pb-[6px]">
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
      <section className="w-full px-4">
        <article className="pt-[10px]">
          <button className="w-full bg-Main rounded-xl cursor-pointer">
            <div className="px-[83.5px] py-3 flex flex-row justify-between">
              <img src={track} alt="Track my location" />
              <div className="font-SB00 text-[16px]">현재 위치로 설정하기</div>
            </div>
          </button>
        </article>
        <article className="pt-[11px]">
          {addresses.map((item, index) => (
            <AddressCard
              key={index}
              selected={item.selected}
              address={item.address}
              isLastAddress={index === addresses.length - 1}
            />
          ))}
        </article>
      </section>
    </>
  )
}
