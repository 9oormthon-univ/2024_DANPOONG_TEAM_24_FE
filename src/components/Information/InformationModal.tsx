import close from '../../assets/information/Close.svg'

type InformationModalProps = {
  onClose: () => void
}

export default function InformationModal({ onClose }: InformationModalProps) {
  return (
    <div className="fixed top-0  w-[390px] h-full bg-black/50 flex items-center justify-center z-50">
      <div className="mx-4 px-4 py-[18px] flex flex-col gap-5 bg-white rounded-lg shadow-lg font-M00 text-[14px] text-800">
        {/* 2024 서울시 지원단가 */}
        <article className="flex flex-row justify-between">
          <div>
            <div className="font-SB00 text-base">2024 서울시 지원단가</div>
            <div>
              1식 <span className="text-point1">9,000원</span>
            </div>
            <div>
              일일 사용한도액 <span className="text-point1">27,000원</span>
            </div>
          </div>
          <img
            src={close}
            alt="close button"
            onClick={onClose}
            className="self-start"
          />
        </article>
        {/* 카드이용 가능시간 */}
        <article>
          <div className="font-SB00 text-base">카드이용 가능시간</div>
          <div>
            평일 휴일 모두 <span className="text-point1">06:00~23:00</span>
          </div>
        </article>
        {/* 잔액 및 거래내역 조회 */}
        <article>
          <div className="font-SB00 text-base">잔액 및 거래내역 조회</div>
          <div>
            1. 카드 뒷면의 QR코드를 카메라로 인식해서 잔액 및 거래내역 조회
            가능한 모바일 웹 화면으로 이동해요
          </div>
          <div className="text-C400">
            ※ QR 코드 읽기: 네이버 및 기타 모든 QR 리더기 활용 가능
          </div>
          <div className="pt-5">
            2. 모바일 웹 화면에서 정보를 입력해 조회가 가능해요
          </div>
          <div className="text-C400">(카드번호, 유효연월, CVC 값)</div>
        </article>
        {/* 정기 충전일 */}
        <article>
          <div className="font-SB00 text-base">정기 충전일</div>
          <div className="text-point1">
            매월 1일 새벽에 시스템 자동으로 충전돼요
          </div>
          <div className="text-C400">
            ※ 매월 1일 06:00 이후 QR코드 통한 잔액조회로 충전금액 확인 가능해요
          </div>
          <div className="text-C400">
            ※ 매월 1일 충전 시 지난 달에 남은 금액은 모두 회수돼요
          </div>
        </article>
        {/* 기타 */}
        <article>
          <div className="font-SB00 text-base">기타</div>
          <div>1. 가맹점 단말기: 일반 신용카드 단말기 사용</div>
          <div>
            2. 분실/훼손에 따른 카드 정지 및 교체 문의 : 각 동주민센터 담당자
            문의
          </div>
        </article>
      </div>
    </div>
  )
}
