import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import KakaoMap from '../components/Around/KakaoMap'
import KakaoList from '../components/Around/KakaoList'
import { ToggleIconList, ToggleIconMap } from '../assets/around/ToggleIcon'
import Cn from '../utils/Cn'
import useMapStore from '../store/useMapStore'

function Around() {
  const location = useLocation()
  const [isMapView, setIsMapView] = useState(location.state?.isMapView || false)
  const [isLoading, setIsLoading] = useState(false)
  const { setSelectedPlace } = useMapStore() // useMapStore에서 필요한 함수 가져오기

  // location.state에서 selectedPlace 가져오기
  const selectedPlace = location.state?.selectedPlace

  // 뷰 전환 함수
  const toggleView = () => {
    setSelectedPlace(null)
    setIsMapView(!isMapView)
  }

  // selectedPlace가 있을 경우 전역 상태에 설정
  useEffect(() => {
    if (selectedPlace) {
      setSelectedPlace(selectedPlace)
      if (isMapView) {
        return
      } else {
        console.log(selectedPlace)
        window.open(selectedPlace.store_url)
        setIsMapView(!isMapView)
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 선택된 장소 초기화
      setSelectedPlace(null)
    }
  }, [selectedPlace, setSelectedPlace])

  return (
    <div className="flex flex-col items-center">
      <Header />
      <section className="w-[390px] mt-[7.49px] flex flex-col items-center bg-100 min-h-screen">
        <div className="w-full max-w-[390px] mx-auto">
          {isMapView ? <KakaoMap /> : <KakaoList setIsLoading={setIsLoading} />}
        </div>
        {!isLoading && ( // 로딩 중일 때 버튼 숨김
          <div className="fixed bottom-40 z-50">
            <button
              onClick={toggleView}
              className={Cn(
                'relative w-[118px] h-16 bg-white rounded-full shadow-md',
                'transition-all duration-300 ease-in-out'
              )}
            >
              <div
                className={Cn(
                  'absolute top-1 w-14 h-14 bg-Main rounded-full border border-ToggleBorder',
                  'transition-all duration-300 ease-in-out',
                  !isMapView ? 'left-1' : 'left-[59px]'
                )}
              ></div>
              <div className="absolute inset-0 flex items-center justify-between px-3">
                <svg
                  className={Cn(
                    'w-10 h-10 transition-opacity duration-300',
                    !isMapView ? 'opacity-100' : 'opacity-20'
                  )}
                  viewBox="0 0 38 38"
                >
                  <path d={ToggleIconList} fill="#121212" />
                </svg>
                <svg
                  className={Cn(
                    'w-10 h-10 transition-opacity duration-300',
                    !isMapView ? 'opacity-20' : 'opacity-100'
                  )}
                  viewBox="0 0 38 38"
                >
                  <path d={ToggleIconMap} fill="#121212" />
                </svg>
              </div>
            </button>
          </div>
        )}
      </section>
      <Footer />
    </div>
  )
}

export default Around
