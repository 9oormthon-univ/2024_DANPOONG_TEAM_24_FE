import { useState, useRef, useEffect } from 'react'
import Cn from '../utils/Cn'
import logo from '../assets/common/Logo.svg'
import logoText from '../assets/common/LogoText.svg'
import arrow from '../assets/common/Arrow.svg'
import user from '../assets/common/User.svg'
import search from '../assets/common/Search.svg'
import { useNavigate } from 'react-router-dom'
import useAddressStore from '../store/useAddressStore'

function Header() {
  const navigation = useNavigate()
  const { getSelectedAddress } = useAddressStore()

  const [searchResults, setSearchResults] = useState<any[]>([]) // 검색 결과 상태
  const [searchText, setSearchText] = useState('') // 입력된 검색어
  const [showResults, setShowResults] = useState(false) // 검색 결과 표시 여부

  const ps = new kakao.maps.services.Places()
  const resultsRef = useRef<HTMLDivElement | null>(null) // 검색 결과 리스트를 참조하는 ref

  // 검색어 변경 시 처리
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)

    if (value.trim() === '') {
      setSearchResults([]) // 검색어가 비었을 때 결과 초기화
      return
    }

    // 키워드 검색
    ps.keywordSearch(value, placesSearchCB)
    setShowResults(true) // 검색 결과 보이기
  }

  // 검색 결과 콜백
  const placesSearchCB = (data: any[], status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      setSearchResults(data) // 검색 결과 상태에 저장
    }
  }

  // 장소 클릭 시 처리
  const handlePlaceClick = (place: any) => {
    console.log('Selected place:', place)
    setShowResults(false) // 장소 클릭 시 검색 결과 닫기
  }

  // 외부 클릭 시 검색 결과 숨기기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setSearchText('')
        setShowResults(false) // 검색 결과 외부 클릭 시 닫기
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    // cleanup: 컴포넌트가 unmount되거나 효과가 재실행될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <header className="mt-7 ml-[17px] mr-[19px] w-[390px]">
        <div className="flex px-4 gap-[94px]">
          <div className="flex flex-row gap-[10px] items-center">
            <img src={logo} alt="logoIcon" className="w-9 h-9" />
            <img src={logoText} alt="logoText" className="w-[37.33px] h-7" />
          </div>
          <div className="flex flex-row gap-[14.5px] items-center">
            <div className="flex gap-2 items-center">
              <div className="font-SB00 text-[16px] text-ellipsis line-clamp-1">
                {getSelectedAddress()}
              </div>
              <img
                src={arrow}
                alt="Arrow"
                className="w-4 h-[6px] cursor-pointer"
                onClick={() => navigation('/address')}
              />
            </div>
            <img
              src={user}
              alt="userIcon"
              className="w-[19px] h-[19px] cursor-pointer"
              onClick={() => navigation('/mypage')}
            />
          </div>
        </div>

        {window.location.pathname === '/' ||
        window.location.pathname === '/around' ? (
          <div className="relative mt-[5.99px] mx-4">
            <input
              id="searchStore"
              type="text"
              placeholder="가맹점 이름을 검색해보세요"
              value={searchText} // 입력값 연결
              onChange={handleSearchChange} // 입력 시 검색
              className={Cn(
                'py-[13px] pl-[13px] pr-[27px] w-full font-R00 focus:outline-none',
                'border border-200 rounded-lg placeholder:text-200 placeholder:text-sm'
              )}
            />
            <img
              src={search}
              alt="searchIcon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
            />
          </div>
        ) : (
          ''
        )}

        {/* 검색 결과 리스트 */}
        {showResults && searchResults.length > 0 && (
          <div
            ref={resultsRef} // 검색 결과 리스트에 ref 추가
            className="absolute mx-4 mt-2 w-[358px] max-h-[200px] overflow-y-auto border border-200 bg-white z-10 shadow-lg rounded-lg"
          >
            {searchResults.map((place) => (
              <div
                key={place.id}
                className="p-3 cursor-pointer hover:bg-gray-200 border-b border-b-200"
                onClick={() => handlePlaceClick(place)}
              >
                <div className="font-M00">{place.place_name}</div>
                <div className="font-SB00 text-sm text-gray-500">
                  {place.address_name}
                </div>
                <div className="font-SB00 text-xs text-gray-400">
                  {place.phone}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  )
}

export default Header
