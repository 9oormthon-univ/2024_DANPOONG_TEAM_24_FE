import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KakaoMap from "../components/Around/KakaoMap";
import KakaoList from "../components/Around/KakaoList";

function Around() {
  const [isMapView, setIsMapView] = useState(true);

  // 뷰 전환 함수
  const toggleView = () => {
    setIsMapView(!isMapView);
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
            className="px-4 py-1 bg-Main2 border border-Main text-black text-sm font-SB00 rounded-full"
          >
            {isMapView ? "지도" : "목록"}
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Around;