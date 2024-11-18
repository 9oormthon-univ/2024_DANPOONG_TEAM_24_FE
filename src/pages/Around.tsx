import Header from "../components/Header";
import Footer from "../components/Footer";
import KaKaoMap from "../components/Around/KakaoMap";

function Around() {
    return (
      <>
        <Header />
        <section className="mt-[7.49px]">
          <div className="flex flex-col justify-center">
              <KaKaoMap/>
          </div>
        </section>
        <Footer />
      </>
    )
  }
  export default Around