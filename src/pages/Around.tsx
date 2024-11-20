import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import KakaoMap from "../components/Around/KakaoMap"
import KakaoList from "../components/Around/KakaoList"
import { ToggleIconList, ToggleIconMap } from "../assets/around/ToggleIcon"
import Cn from "../utils/Cn"

function Around() {
  const [isMapView, setIsMapView] = useState(true)

  // 뷰 전환 함수
  const toggleView = () => {
    setIsMapView(!isMapView)
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <section className="w-full mt-[7.49px] flex flex-col items-center">
        <div className="w-full max-w-[390px] mx-auto">
          {isMapView ? <KakaoList /> : <KakaoMap />}
        </div>
        <div className="fixed bottom-40 z-50">
          <button
            onClick={toggleView}
            className={Cn(
              "relative w-[118px] h-16 bg-white rounded-full shadow-md",
              "transition-all duration-300 ease-in-out"
            )}
          >
            <div
              className={Cn(
                "absolute top-1 w-14 h-14 bg-Main rounded-full border border-ToggleBorder",
                "transition-all duration-300 ease-in-out",
                isMapView ? "left-1" : "left-[59px]"
              )}
            ></div>
            <div className="absolute inset-0 flex items-center justify-between px-3">
              <svg
                className={Cn(
                  "w-10 h-10 transition-opacity duration-300",
                  isMapView ? "opacity-100" : "opacity-20"
                )}
                viewBox="0 0 38 38"
              >
                <path
                  d={ToggleIconList}
                  fill="#121212"
                />
              </svg>
              <svg
                className={Cn(
                  "w-10 h-10 transition-opacity duration-300",
                  isMapView ? "opacity-20" : "opacity-100"
                )}
                viewBox="0 0 38 38"
              >
                <path
                  d={ToggleIconMap}
                  fill="#121212"
                />
              </svg>
            </div>
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Around;
