import { useEffect, useState, useRef } from 'react'
import FilterButton from './FilterButton'
import Filter from './Filter'
import useListFilterOptionStore from '../../store/UseListFilterOptionStore'
import LoadingSplash from '../../pages/Splash/LoadingSplash'
import defalutAxios from '../../api/defaultAxios'

interface Place {
  storeId: string
  storeName: string
  roadAddress: string
  latitude: number
  longitude: number
  distance: number 
}

const KakaoList = () => {
  const [userPosition, setUserPosition] = useState<{
    lat: number
    lng: number
  }>({ lat: 0, lng: 0 })
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(3)

  const [selectedFilter, setSelectedFilter] = useState<number | null>(1)
  // 24/11/20 희진 추가
  const { selectedFilterOption, setSelectedFilterOption } =
    useListFilterOptionStore()
  const filterContainerRef = useRef<HTMLDivElement | null>(null) // 필터 버튼 컨테이너를 참조하기 위한 useRef

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error('사용자 위치를 가져오는데 실패했습니다:', error)
          alert(
            '위치 정보를 가져오는데 실패했습니다. 위치 서비스가 활성화되었는지 확인하세요.'
          )
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, // 10초 후 타임아웃
          maximumAge: 0, // 항상 최신 위치를 가져옴
        }
      )
    } else {
      console.error('이 브라우저는 Geolocation을 지원하지 않습니다.')
      alert('이 브라우저는 위치 정보를 지원하지 않습니다.')
    }
  }, [])

  // 음식점 데이터 가져오기
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true) // 로딩 상태 활성화
        const response = await defalutAxios.get(
          `/stores/category/${selectedCategoryId}`
        )
        if (response.data.code === 200) {
          const updatedPlaces = response.data.data.map((place: Place) => ({
            ...place,
            distance: calculateDistance(
              userPosition.lat,
              userPosition.lng,
              place.latitude,
              place.longitude
            ),
          }));
          setPlaces(updatedPlaces);
        } else {
          console.error('음식점 데이터를 가져오는데 실패했습니다:', response.data)
        }
      } catch (error) {
        console.error('음식점 데이터를 가져오는 중 에러 발생:', error)
      } finally {
        setLoading(false)
      }
    }

    if (userPosition.lat !== 0 && userPosition.lng !== 0) {
      fetchStores()
    }
  }, [userPosition, selectedCategoryId])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (value: number): number => (value * Math.PI) / 180; // 도(degree)에서 라디안(radian) 변환
    const R = 6371e3; // 지구 반지름 (단위: m)
  
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // 거리 (단위: m)
  };


  // 24/11/20 희진 추가
  // 페이지 로드 시 선택된 필터 버튼이 가운데로 오도록 처리
  useEffect(() => {
    if (selectedFilterOption && filterContainerRef.current) {
      const selectedButton = document.getElementById(selectedFilterOption)
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          inline: 'center', // 버튼을 수평 중앙으로 위치
          block: 'nearest', // 수직 조정
        })
      }
    }
  }, [selectedFilterOption]) // selectedFilterOption이 변경될 때마다 실행

  // 24/11/20 희진 변경
  const handleFilterClick = (id: number, selected: string, categoryId?: number) => {
    setSelectedFilterOption(selected)
    setSelectedFilter(id === selectedFilter ? null : id)
    setSelectedCategoryId(categoryId || 3)
  }

  const handlePlaceClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="mt-2 pb-24">
      {loading ? (
        <LoadingSplash /> // 로딩 중일 때 로딩 스플래시 표시
      ) : (
        <>
          <div
            ref={filterContainerRef}
            className="[&::-webkit-scrollbar]:hidden mb-4 flex overflow-x-auto whitespace-nowrap space-x-2"
          >
            <div className="space-x-2">
              {Filter.map((filter) => (
                <FilterButton
                  key={filter.id}
                  id={filter.id}
                  label={filter.label}
                  category_id={filter.category_id ? filter.category_id : 0}
                  selectedFilter={selectedFilter}
                  selected={selectedFilterOption === filter.label}
                  onClick={() =>
                    handleFilterClick(filter.id, filter.label, filter.category_id)
                  }
                />
              ))}
            </div>
          </div>
          {places.length > 0 ? (
            <ul className="space-y-2 overflow-visible">
              {places.map((place) => (
                <li
                  key={place.storeId}
                  className="p-2 border-b border-200 bg-white cursor-pointer flex justify-between items-center"
                  style={{ width: '390px', height: '120px' }}
                  onClick={() => handlePlaceClick(place.storeId)}
                >
                  <div>
                    <p className="mb-0.5 text-xl font-M00">
                      {place.storeName}{' '}
                      <span className="text-sm text-point1">
                        {place.distance
                          ? `${Math.round(place.distance)}m`
                          : '거리 정보 없음'}
                      </span>
                    </p>
                    <p className="mb-[12px] text-sm font-R00">{place.roadAddress}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">표시할 음식점이 없습니다.</p>
          )}
        </>
      )}
    </div>
  )
}

export default KakaoList
