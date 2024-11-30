import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import Cn from '../../utils/Cn'
import search from '../../assets/common/Search.svg'
import track from '../../assets/address/Track.svg'
import arrow from '../../assets/common/Arrow.svg'
import AddressCard from '../../components/Main/AddressCard'
import { useAddress } from '../../hooks/Main/UseAddress'
import LoadingSplash from '../Splash/LoadingSplash'
import NoContents from '../../components/Community/NoContents'

// 장소 검색 결과 타입 정의
interface Place {
  id: string
  place_name: string
  address_name: string // 지번 주소
  road_address_name: string // 도로명 주소
  phone: string
  x: string // 경도
  y: string // 위도
}

export default function Address() {
  const {
    addresses,
    isLoading,
    handleSetCurrentLocation,
    fetchAddressList,
    addNewLocation,
  } = useAddress()

  // 새로 추가된 상태들
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Place[]>([])
  const [showResults, setShowResults] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchAddressList()
  }, [])

  // 검색어 정제 함수 추가
  const sanitizeSearchTerm = (term: string) => {
    // 특수 문자 제거, 여러 공백 제거, 양쪽 공백 트림
    return term
      .replace(/[^\w\s가-힣]/g, '') // 특수 문자 제거 (알파벳, 숫자, 한글, 공백 제외)
      .replace(/\s+/g, ' ') // 연속된 공백을 단일 공백으로 대체
      .trim()
  }

  // 입력 변경 핸들러 수정
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const value = sanitizeSearchTerm(rawValue)
    setSearchTerm(rawValue) // 원본 입력값 유지

    // 최소 2글자 이상일 때만 검색
    if (value.length >= 2) {
      const places = new window.kakao.maps.services.Places()

      places.keywordSearch(
        value,
        (result: Place[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setSearchResults(result)
            setShowResults(true)
          } else {
            setSearchResults([])
            setShowResults(false)
          }
        },
        {
          size: 5, // 최대 5개 결과만 가져오기
          location: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 서울 중심 좌표
        }
      )
    } else {
      setShowResults(false)
    }
  }

  // 장소 클릭 핸들러
  const handlePlaceClick = async (place: Place) => {
    try {
      // 선택된 장소의 좌표로 주소 추가
      await addNewLocation(
        parseFloat(place.y), // 위도
        parseFloat(place.x) // 경도
      )

      // 입력창 초기화 및 결과 숨기기
      setSearchTerm('')
      setShowResults(false)
    } catch (error) {
      console.error('위치 추가 중 오류:', error)
      alert('위치를 추가하는 중 오류가 발생했습니다.')
    }
  }

  // 외부 클릭 시 결과 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {isLoading && <LoadingSplash />}
      <div className="flex flex-col items-center justify-center">
        <header>
          <div className="pt-7 pl-[17px] pr-[19px] pb-[6px] w-[390px] relative">
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
                ref={inputRef}
                id="searchStore"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
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

              {showResults && searchResults.length > 0 && (
                <div
                  ref={resultsRef}
                  className="absolute mx-0 mt-2 w-full max-h-[200px] overflow-y-auto border border-200 bg-white z-20 shadow-lg rounded-lg"
                >
                  {searchResults.map((place) => (
                    <div
                      key={place.id}
                      className="p-3 cursor-pointer hover:bg-gray-200 border-b border-b-200"
                      onClick={() => handlePlaceClick(place)}
                    >
                      <div className="font-M00">{place.place_name}</div>
                      <div className="font-SB00 text-sm text-gray-500">
                        {place.road_address_name || place.address_name}
                      </div>
                      {place.phone && (
                        <div className="font-SB00 text-xs text-gray-400">
                          {place.phone}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
            {addresses.length > 0 ? (
              addresses.map((item, index) => (
                <AddressCard
                  key={
                    item.isCurrentLocation
                      ? `${item.address}-${index}`
                      : `${index}`
                  } // 각 주소마다 고유한 key 설정
                  id={item.id}
                  index={index}
                  selected={item.selected}
                  address={item.address}
                  isLastAddress={index === addresses.length - 1}
                />
              ))
            ) : (
              <NoContents subjectKey="address" />
            )}
          </article>
        </section>
      </div>
    </>
  )
}
