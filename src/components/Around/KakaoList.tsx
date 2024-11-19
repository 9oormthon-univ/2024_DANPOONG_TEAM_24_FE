import { useEffect, useState } from 'react'
import FilterButton from './FilterButton'
import Filter from './Filter'

interface Place {
  id: string
  place_name: string
  address_name: string
  phone?: string
  place_url: string
  distance: string
}

const KakaoList = () => {
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 })
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedFilter, setSelectedFilter] = useState<number | null>(1)
  
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
          alert('위치 정보를 가져오는데 실패했습니다. 위치 서비스가 활성화되었는지 확인하세요.')
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

  // 주변 음식점 검색
  useEffect(() => {
    if (userPosition.lat !== 0 && userPosition.lng !== 0) {
      const { kakao } = window as any
      if (!kakao || !kakao.maps) return

      const placesService = new kakao.maps.services.Places()
      const userLocation = new kakao.maps.LatLng(userPosition.lat, userPosition.lng)

      // 장소 검색 수행
      placesService.categorySearch(
        'FD6', // 카테고리 코드: 음식점
        (result: Place[], status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            setPlaces(result)
          }
        },
        {
          location: userLocation,
          radius: 1000, // 검색 반경 1000m
        }
      )
    }
  }, [userPosition])

  const handleFilterClick = (id: number) => {
    setSelectedFilter(id === selectedFilter ? null : id)
  }

  const handlePlaceClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="p-4 w-full">
      <div className="[&::-webkit-scrollbar]:hidden mb-4 flex overflow-x-auto whitespace-nowrap space-x-2">
        <div className="space-x-2">
          {Filter.map((filter) => (
            <FilterButton
              key={filter.id}
              id={filter.id}
              label={filter.label}
              selectedFilter={selectedFilter}
              onClick={handleFilterClick}
            />
          ))}
        </div>
      </div>
      {places.length > 0 ? (
        <ul className="space-y-2">
          {places.map((place) => (
            <li
              key={place.id}
              className="p-2 border-b border-200 bg-white cursor-pointer flex justify-between items-center"
              style={{ height: '120px' }}
              onClick={() => handlePlaceClick(place.place_url)}
            >
              <div>
                <p className="mb-0.5 text-xl font-M00">
                  {place.place_name} <span className="text-sm text-point1">{place.distance}m</span>
                </p>
                <p className="mb-[12px] text-sm font-R00">{place.address_name}</p>
                {place.phone && <p className="text-sm font-R00">{place.phone}</p>}
              </div>
              <div
                className="w-24 h-24 rounded-xl"
                style={{
                  backgroundColor: '#d3d3d3',
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-800">음식점을 불러오는 중입니다...</p>
      )}
    </div>
  )
}

export default KakaoList