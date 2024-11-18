import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import FilterButton from './FilterButton'
import Filter from './Filter'

const KaKaoMap = () => {
  const [userPosition, setUserPosition] = useState({
    lat: 33.450701,
    lng: 126.570667,
  })
  const [selectedFilter, setSelectedFilter] = useState<number | null>(1)

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
          console.error('사용자 위치를 가져오는데 실패했습니다.', error)
        }
      )
    } else {
      console.error('이 브라우저는 Geolocation을 지원하지 않습니다.')
    }
  }, [])

  const handleFilterClick = (id: number) => {
    setSelectedFilter(id === selectedFilter ? null : id)
  }

  return (
    <div className="relative w-full">
      <div id="map" className="w-full">
        <Map
          center={userPosition}
          style={{ width: '100vw', height: '80vh' }}
        >
          <MapMarker position={userPosition}></MapMarker>
        </Map>
        <div className="[&::-webkit-scrollbar]:hidden absolute top-4 left-0 right-0 overflow-x-auto whitespace-nowrap px-4 z-10">
          <div className="inline-flex space-x-2">
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
      </div>
    </div>
  )
}

export default KaKaoMap
