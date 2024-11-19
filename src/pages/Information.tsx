import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InformationCard from '../components/Information/InformationCard'
import InformationModal from '../components/Information/InformationModal'
import arrow from './../assets/common/RightArrow.svg'

function Information() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className="mb-[53px] relative">
        <Header />
        <section className="mt-[7.49px] pb-[92px] border-t border-200">
          <button
            onClick={openModal}
            className="mt-[20.05px] mx-4 px-[13px] py-[18px] w-[358px] flex justify-between bg-Main2 border border-Main rounded-xl cursor-pointer"
          >
            <div className="flex flex-col gap-1 text-start">
              <div className="font-SB00 text-base">
                아동급식카드 이용 총정리
              </div>
              <div className="font-M00 text-xs text-400">
                카드 이용에 관한 안내를 한눈에 보여드릴게요
              </div>
            </div>
            <img src={arrow} alt="arrow" className="self-start" />
          </button>
          <div className="px-[18px] pt-[30px] pb-[53px] flex flex-col gap-5 justify-center">
            <InformationCard
              title="편의점에서는 종량제 봉투를 결제할 수 있어요"
              description="원칙상 1장씩만 구매가 가능해요"
              isAccepted={true}
            />
            <InformationCard
              title="건강에 유해한 품목은 구매가 어려워요"
              description={`주류,담배 등 아동청소년 판매 금지 품목, 커피, 에너지 음료\n(고카페인 함유 음료) 탄산음료(콜라,사이다 등)`}
              isAccepted={false}
            />
            <InformationCard
              title="한끼식사로 볼 수 없는 간식,조미류는 구매가 어려워요"
              description="과자류,초콜릿,사탕,아이스크림,안주류,간장 등 양념 종류의 조미료"
              isAccepted={false}
            />
            <InformationCard
              title={`학용품 등 급식과 관련 없는 제품은 구매가\n어려워요`}
              description="생활용품,학용품,기타소품 등 식품이 아닌 제품"
              isAccepted={false}
            />
          </div>
        </section>
        <Footer />

        {/* 모달 */}
        {isModalOpen && <InformationModal onClose={closeModal} />}
      </div>
    </>
  )
}

export default Information
