import FooterOption from './FooterOption'

function Footer() {
  return (
    <footer className="fixed bottom-0 z-10 w-[390px]">
      <div
        className="relative bg-cover bg-center h-[100px]"
        style={{ backgroundImage: 'url(/FooterBack.svg)' }}
      >
        <div className="flex flex-row pt-4 justify-between relative z-10">
          <div className="pt-[11px] pb-[27px] pl-7 pr-[21px] w-full flex flex-row gap-[34px] items-center justify-center">
            <FooterOption title="내주변" />
            <FooterOption title="정보" />
          </div>
          <div className="flex flex-col items-center relative">
            <div className="-mt-[6.5px]">
              <FooterOption title="홈" />
            </div>
          </div>
          <div className="pt-[11px] pb-[27px] pl-[21px] pr-7 w-full flex flex-row gap-[34px] items-center justify-center">
            <FooterOption title="레시피" />
            <FooterOption title="커뮤니티" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
