import { useEffect, useRef, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import FilterButton from './FilterButton'
import Filter from './Filter'
import UserLocationButton from '../../assets/around/UserLocationButton.svg'
import useListFilterOptionStore from '../../store/UseListFilterOptionStore'
import defaultAxios from '../../api/defaultAxios'
import useMapStore from '../../store/useMapStore'

const KaKaoMap = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null) // Map 객체를 참조하기 위한 useRef
  const { userPosition, setUserPosition, places, setPlaces } = useMapStore()

  const [selectedFilter, setSelectedFilter] = useState<number | null>(1)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(3)

  // 24/11/20 희진 추가
  const { selectedFilterOption, setSelectedFilterOption } =
    useListFilterOptionStore()
  const filterContainerRef = useRef<HTMLDivElement | null>(null) // 필터 버튼 컨테이너를 참조하기 위한 useRef

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserPosition(newPosition)

          // 맵 객체가 있을 경우, 사용자의 위치로 이동
          if (mapRef.current) {
            mapRef.current.panTo(
              new kakao.maps.LatLng(newPosition.lat, newPosition.lng)
            )
          }
        },
        (error) => {
          console.error('사용자 위치를 가져오는데 실패했습니다.', error)
        }
      )
    } else {
      console.error('이 브라우저는 Geolocation을 지원하지 않습니다.')
    }
  }, [])

  // 음식점 데이터 가져오기
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const url =
          selectedCategoryId === 3
            ? `/stores?latitude=${userPosition.lat}&longitude=${userPosition.lng}` // 전체 카테고리
            : selectedCategoryId === 11
              ? `/stores?options=score>=4&latitude=${userPosition.lat}&longitude=${userPosition.lng}` // 검증된 맛집 카테고리
              : `/stores/category/${selectedCategoryId}?latitude=${userPosition.lat}&longitude=${userPosition.lng}` // 나머지 카테고리

        const response = await defaultAxios.get(url)
        if (response.data.code === 200) {
          setPlaces(response.data.data)
        } else {
          console.error('음식점 데이터를 가져오는데 실패했습니다:', response.data)
        }
      } catch (error) {
        console.error('음식점 데이터를 가져오는 중 에러 발생:', error)
      }
    }

    fetchStores();
  }, [userPosition, selectedCategoryId, selectedFilter, setPlaces]);

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

  const resetMapToUserLocation = () => {
    if (mapRef.current) {
      mapRef.current.panTo(
        new kakao.maps.LatLng(userPosition.lat, userPosition.lng)
      )
    }
  }

  return (
    <div className="relative">
      <div id="map" className="max-w-[390px]">
        <Map
          center={userPosition}
          style={{ width: '100%', height: '80vh' }}
          level={3}
          ref={mapRef} // Map 객체에 ref 연결
        >
          <MapMarker position={userPosition} />

          {places.map((place) => (
            <MapMarker
              key={place.storeId}
              position={{ lat: place.latitude, lng: place.longitude }}
              title={place.storeName}
            />
          ))}
        </Map>
        <div
          ref={filterContainerRef}
          className="[&::-webkit-scrollbar]:hidden absolute top-2 left-0 right-0 overflow-x-auto whitespace-nowrap z-10"
        >
          <div className="inline-flex space-x-2">
            {Filter.map((filter) => (
              <FilterButton
                key={filter.id}
                id={filter.id}
                label={filter.label}
                category_id={filter.category_id ? filter.category_id : 0} // 24/11/22 희진 추가
                selectedFilter={selectedFilter}
                selected={selectedFilterOption === filter.label} // 24/11/20 희진 추가
                onClick={() => handleFilterClick(filter.id, filter.label, filter.category_id)} // 24/11/20 희진 추가
              />
            ))}
          </div>
        </div>
        <img
          src={UserLocationButton}
          alt="User Location Button"
          className="absolute bottom-32 right-4 w-[72px] h-[72px] cursor-pointer z-10"
          onClick={resetMapToUserLocation} // 버튼 클릭 시 사용자 위치로 이동
        />
      </div>
    </div>
  )
}

export default KaKaoMap
