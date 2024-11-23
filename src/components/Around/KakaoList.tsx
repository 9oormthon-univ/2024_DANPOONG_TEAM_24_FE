import { useEffect, useState, useRef } from 'react'
import FilterButton from './FilterButton'
import Filter from './Filter'
import useListFilterOptionStore from '../../store/UseListFilterOptionStore'
import LoadingSplash from '../../pages/Splash/LoadingSplash'
import defaultAxios from '../../api/defaultAxios'
import useAddressStore from '../../store/useAddressStore'
import defaultimg from '../../assets/around/DefaultImg.svg' 
import NoContents from '../Community/NoContents'

interface Place {
  storeId: string
  storeName: string
  roadAddress: string
  latitude: number
  longitude: number
  distance: number
  phone: string
  imageUrl: string
}

interface KakaoListProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const KakaoList: React.FC<KakaoListProps> = ({ isLoading, setIsLoading }) => {
  const [userPosition, setUserPosition] = useState<{
    lat: number
    lng: number
  }>({ lat: 0, lng: 0 })
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(3)
  const getSelectedAddress = useAddressStore((state) => state.getSelectedAddress)

  const [selectedFilter, setSelectedFilter] = useState<number | null>(1)
  // 24/11/20 희진 추가
  const { selectedFilterOption, setSelectedFilterOption } =
    useListFilterOptionStore()
  const filterContainerRef = useRef<HTMLDivElement | null>(null) // 필터 버튼 컨테이너를 참조하기 위한 useRef

  // 사용자 위치 가져오기
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
      return;
    }
    const selectedAddress = getSelectedAddress();
    if (selectedAddress) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(selectedAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const newPosition = {
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          };
          setUserPosition(newPosition);
        } else {
          console.error('주소 검색 실패:', status);
        }
      });
    } else {
      alert('주소 설정을 완료 해주세요!');
    }
  }, [getSelectedAddress]);

  // 음식점 데이터 가져오기
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setIsLoading(true)
        // 조건에 따라 URL 생성
        const url =
          selectedCategoryId === 3
            ? `/stores?latitude=${userPosition.lat}&longitude=${userPosition.lng}` // 전체 카테고리
            : selectedCategoryId === 11
              ? `/stores?options=score>=4&latitude=${userPosition.lat}&longitude=${userPosition.lng}` // 검증된 맛집 카테고리
              : `/stores/category/${selectedCategoryId}?latitude=${userPosition.lat}&longitude=${userPosition.lng}` // 나머지 카테고리

        const response = await defaultAxios.get(url)

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
          setPlaces(updatedPlaces)
        } else {
          console.error('음식점 데이터를 가져오는데 실패했습니다:', response.data)
        }
      } catch (error) {
        console.error('음식점 데이터를 가져오는 중 에러 발생:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (userPosition.lat !== 0 && userPosition.lng !== 0) {
      fetchStores()
    }
  }, [userPosition, selectedCategoryId])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (value: number): number => (value * Math.PI) / 180 // 도(degree)에서 라디안(radian) 변환
    const R = 6371e3 // 지구 반지름 (단위: m)

    const φ1 = toRad(lat1)
    const φ2 = toRad(lat2)
    const Δφ = toRad(lat2 - lat1)
    const Δλ = toRad(lon2 - lon1)

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c // 거리 (단위: m)
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

  const handlePlaceClick = (placeName: string) => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
      return;
    }

    const places = new kakao.maps.services.Places();
    // 장소 검색 요청
    places.keywordSearch(placeName, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const placeId = result[0].id; // 검색 결과의 첫 번째 장소 ID
        const placeUrl = `https://place.map.kakao.com/${placeId}`;
        window.open(placeUrl, '_blank', 'noopener,noreferrer'); // 카카오맵 상세 페이지로 이동
      } else {
        console.error('카카오맵 장소 검색 실패:', status);
        alert('해당 장소의 상세 정보를 찾을 수 없습니다.');
      }
    });
  };
  return (
    <div className="mt-2 pb-24">
      {isLoading ? (
        <LoadingSplash />
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
                  onClick={() => handlePlaceClick(place.storeName)}
                >
                  <div className="flex-1">
                    <p className="mb-0.5 text-xl font-M00">
                      {place.storeName}{' '}
                      <span className="text-sm text-point1">
                        {place.distance
                          ? `${Math.round(place.distance)}m`
                          : '거리 정보 없음'}
                      </span>
                    </p>
                    <p className="mb-[12px] text-sm font-R00">{place.roadAddress}</p>
                    {place.phone && (
                      <p className="text-sm font-R00 text-600">전화번호: {place.phone}</p>
                    )}
                  </div>
                  <div className="w-24 h-24 rounded-md bg-cover bg-center ml-4">
                    <img
                    src={place.imageUrl || defaultimg} // 이미지가 없으면 기본 이미지 사용
                    alt={place.storeName}
                    className="w-full h-full rounded-md object-cover"
                  />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <NoContents subjectKey="store" />
          )}
        </>
      )}
    </div>
  )
}

export default KakaoList