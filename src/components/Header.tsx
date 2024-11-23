import Cn from '../utils/Cn'
import logo from '../assets/common/Logo.svg'
import logoText from '../assets/common/LogoText.svg'
import arrow from '../assets/common/Arrow.svg'
import user from '../assets/common/User.svg'
import search from '../assets/common/Search.svg'
import { useNavigate } from 'react-router-dom'
import useAddressStore from '../store/useAddressStore'
import { useSearch } from '../hooks/UseSearch'
import useMapStore from '../store/useMapStore'

function Header() {
  const navigation = useNavigate()
  const { getSelectedAddress } = useAddressStore()
  const { setSelectedPlace } = useMapStore()

  // useSearch 커스텀 훅 사용
  const {
    searchText,
    setSearchText,
    searchResults,
    showResults,
    handleSearchChange,
    resultsRef,
    setShowResults,
  } = useSearch()

  // 장소 클릭 시 처리
  const handlePlaceClick = (place: any) => {
    console.log('place:', place)
    const selectedPlace = {
      storeId: place.id,
      storeName: place.place_name,
      roadAddress: place.road_address_name,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
      store_url: place.place_url,
    }

    // 전역 상태 업데이트
    setSelectedPlace(selectedPlace)

    // 나머지 상태 업데이트
    setSearchText('')
    setShowResults(false) // 장소 클릭 시 검색 결과 닫기

    // 페이지 이동
    navigation('/around', {
      state: {
        isMapView: true,
        selectedPlace, // 이제 생성된 selectedPlace 객체를 전달
      },
    })
  }

  return (
    <>
      <header className="mt-7 ml-[17px] mr-[19px] w-[390px]">
        <div className="flex px-4 gap-[94px] justify-between">
          <div
            className="flex flex-row gap-[10px] items-center cursor-pointer"
            onClick={() => navigation('/')}
          >
            <img src={logo} alt="logoIcon" className="w-9 h-9" />
            <img src={logoText} alt="logoText" className="w-[37.33px] h-7" />
          </div>
          <div className="flex flex-row gap-[14.5px] items-center">
            <div className="flex gap-2 items-center">
              <div className="font-SB00 text-[16px] text-ellipsis line-clamp-1">
                {getSelectedAddress() || '주소 설정하기'}
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
            className="absolute mx-4 mt-2 w-[358px] max-h-[200px] overflow-y-auto border border-200 bg-white z-20 shadow-lg rounded-lg"
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