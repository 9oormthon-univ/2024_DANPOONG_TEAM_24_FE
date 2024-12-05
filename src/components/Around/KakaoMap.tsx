import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import FilterButton from './FilterButton'
import Filter from './Filter'
import UserLocationButton from '../../assets/around/UserLocationButton.svg'
import useListFilterOptionStore from '../../store/UseListFilterOptionStore'
import defaultAxios from '../../api/defaultAxios'
import useMapStore from '../../store/useMapStore'
import useAddressStore from '../../store/useAddressStore'
import searchIcon from '../../assets/around/SearchLocation.svg'

const KaKaoMap = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null) // Map 객체를 참조하기 위한 useRef
  const {
    userPosition,
    setUserPosition,
    places,
    setPlaces,
    selectedPlace,
    setSelectedPlace,
  } = useMapStore()
  const getSelectedAddress = useAddressStore(
    (state) => state.getSelectedAddress
  )

  const [selectedFilter, setSelectedFilter] = useState<number | null>(1)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(3)

  // 24/11/20 희진 추가
  const { selectedFilterOption, setSelectedFilterOption } =
    useListFilterOptionStore()
  const filterContainerRef = useRef<HTMLDivElement | null>(null) // 필터 버튼 컨테이너를 참조하기 위한 useRef

  const navigate = useNavigate()

  const handleMarkerClick = (placeName: string) => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API가 로드되지 않았습니다.')
      return
    }

    const places = new kakao.maps.services.Places()
    // 장소 검색 요청
    places.keywordSearch(placeName, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const placeId = result[0].id // 검색 결과의 첫 번째 장소 ID
        const placeUrl = `https://place.map.kakao.com/${placeId}`
        window.open(placeUrl, '_blank', 'noopener,noreferrer') // 카카오맵 상세 페이지로 이동
      } else {
        console.error('카카오맵 장소 검색 실패:', status)
        alert('해당 장소의 상세 정보를 찾을 수 없습니다.')
      }
    })
  }

  useEffect(() => {
    if (selectedFilterOption) {
      let filter
      if (selectedFilterOption === `선한영향력\n가게`) {
        filter = Filter.find(
          (f) => normalizeText(f.label) === normalizeText(selectedFilterOption)
        )
      } else {
        filter = Filter.find((f) => f.label === selectedFilterOption)
      }
      console.log('bug:', filter)
      if (filter) {
        setSelectedCategoryId(filter.category_id || 3)
      }
    }
  }, [selectedFilterOption])

  useEffect(() => {
    const selectedAddress = getSelectedAddress()
    if (selectedAddress) {
      const geocoder = new kakao.maps.services.Geocoder()
      geocoder.addressSearch(selectedAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const newPosition = {
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          }
          setUserPosition(newPosition)

          if (mapRef.current && !selectedPlace) {
            // selectedPlace가 없을 때만 이동
            mapRef.current.panTo(
              new kakao.maps.LatLng(newPosition.lat, newPosition.lng)
            )
          }
        } else {
          console.error('주소 변환 실패:', status)
        }
      })
    } else {
      alert('주소 설정을 완료해 주세요!')
      navigate('/address')
    }
  }, [getSelectedAddress, setUserPosition, selectedPlace])

  // 음식점 데이터 가져오기
  useEffect(() => {
    let ignore = false
    const fetchStores = async () => {
      try {
        const url =
          selectedCategoryId === 3
            ? `/stores?latitude=${userPosition.lat}&longitude=${userPosition.lng}`
            : selectedCategoryId === 12
            ? `/stores?options=score>=4&latitude=${userPosition.lat}&longitude=${userPosition.lng}` // 검증된 맛집 카테고리
            : `/stores/category/${selectedCategoryId}?latitude=${userPosition.lat}&longitude=${userPosition.lng}` // 나머지 카테고리

        const response = await defaultAxios.get(url)
        if (response.data.code === 200 && !ignore) {
          setPlaces(response.data.data) // ignore가 false일 때만 상태 업데이트
        } else if (!ignore) {
          console.error(
            '음식점 데이터를 가져오는데 실패했습니다:',
            response.data
          )
        }
      } catch (error) {
        if (!ignore) {
          console.error('음식점 데이터를 가져오는 중 에러 발생:', error)
        }
      }
    }
    fetchStores()

    return () => {
      ignore = true
    }
  }, [
    userPosition,
    selectedCategoryId,
    selectedFilter,
    setPlaces,
    selectedFilterOption,
  ])

  // 24/11/20 희진 추가
  // 페이지 로드 시 선택된 필터 버튼이 가운데로 오도록 처리
  useEffect(() => {
    if (selectedFilterOption && filterContainerRef.current) {
      let selectedButton
      if (selectedFilterOption === `선한영향력\n가게`) {
        selectedButton = document.getElementById(
          normalizeText(selectedFilterOption)
        )
      } else {
        selectedButton = document.getElementById(selectedFilterOption)
      }
      console.log('selectedFilterOption:', selectedFilterOption)
      console.log('selectedButton: ', selectedButton)
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          inline: 'center', // 버튼을 수평 중앙으로 위치
          block: 'nearest', // 수직 조정
        })
      }
    }
  }, [selectedFilterOption]) // selectedFilterOption이 변경될 때마다 실행

  const normalizeText = (text: string) => {
    return text
      .replace(/\s+/g, '') // 공백 제거
      .replace(/[^a-zA-Z가-힣0-9]/g, '') // 특수 문자 제거
      .concat('😇')
  }

  useEffect(() => {
    if (selectedPlace && mapRef.current) {
      console.log('map:', selectedPlace)
      const position = new kakao.maps.LatLng(
        selectedPlace.latitude,
        selectedPlace.longitude
      )
      mapRef.current.setCenter(position) // panTo 대신 setCenter 사용
      mapRef.current.setLevel(3)
    }
  }, [selectedPlace])

  // 24/11/20 희진 변경
  const handleFilterClick = (
    id: number,
    selected: string,
    categoryId?: number
  ) => {
    setSelectedFilterOption(selected)
    setSelectedFilter(id === selectedFilter ? null : id)
    setSelectedCategoryId(categoryId || 3)
  }

  // userPosition이 변경되어도 selectedPlace가 우선되도록 처리
  const resetMapToUserLocation = () => {
    if (mapRef.current) {
      mapRef.current.panTo(
        new kakao.maps.LatLng(userPosition.lat, userPosition.lng)
      )
      setSelectedPlace(null) // 사용자 위치로 돌아갈 때 선택된 장소 초기화
    }
  }

  return (
    <div className="relative">
      <div id="map" className="max-w-[390px]">
        <Map
          center={
            selectedPlace
              ? {
                  lat: selectedPlace.latitude,
                  lng: selectedPlace.longitude,
                }
              : userPosition
          }
          style={{ width: '100%', height: '80vh' }}
          level={3}
          ref={mapRef} // Map 객체에 ref 연결
        >
          <MapMarker position={userPosition} />

          {selectedPlace && (
            <MapMarker
              position={{
                lat: selectedPlace.latitude,
                lng: selectedPlace.longitude,
              }}
              title={selectedPlace.storeName}
              image={{
                src: searchIcon, // 카테고리 이미지, 없으면 기본 이미지
                size: {
                  width: 60,
                  height: 80,
                },
              }}
              onClick={() => handleMarkerClick(selectedPlace.storeName)}
            />
          )}

          {places.map((place) => {
            // 카테고리 ID에 맞는 필터 항목 찾기
            const category = Filter.find(
              (f) => f.category_id === selectedCategoryId
            )

            return (
              <MapMarker // 마커 찍어주기
                key={place.storeId}
                position={{ lat: place.latitude, lng: place.longitude }}
                title={place.storeName}
                image={{
                  src: category?.image || '/images/default.svg', // 카테고리 이미지, 없으면 기본 이미지
                  size: {
                    width: 60,
                    height: 80,
                  },
                }}
                onClick={() => handleMarkerClick(place.storeName)}
              />
            )
          })}
        </Map>
        <div
          ref={filterContainerRef}
          className="[&::-webkit-scrollbar]:hidden absolute top-2 left-0 right-0 overflow-x-auto whitespace-nowrap z-10"
        >
          <div className="px-4 inline-flex space-x-2">
            {Filter.map((filter) => (
              <FilterButton
                key={filter.id}
                id={filter.id}
                label={filter.label}
                category_id={filter.category_id ? filter.category_id : 0} // 24/11/22 희진 추가
                selectedFilter={selectedFilter}
                selected={
                  normalizeText(selectedFilterOption) ===
                  normalizeText(filter.label)
                } // 24/11/20 희진 추가
                onClick={() =>
                  handleFilterClick(filter.id, filter.label, filter.category_id)
                } // 24/11/20 희진 추가
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
