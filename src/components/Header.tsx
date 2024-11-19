import Cn from '../utils/Cn'
import logo from '../assets/common/Logo.svg'
import logoText from '../assets/common/LogoText.svg'
import arrow from '../assets/common/Arrow.svg'
import user from '../assets/common/User.svg'
import search from '../assets/common/Search.svg'
import { useNavigate } from 'react-router-dom'
import useAddressStore from '../store/useAddressStore'

function Header() {
  const navigation = useNavigate()
  const { getSelectedAddress } = useAddressStore()

  return (
    <>
      <header className="mt-7 ml-[17px] mr-[19px] w-[390px]">
        <div className="flex px-4 gap-[94px]">
          <div className="flex flex-row gap-[10px] items-center">
            <img src={logo} alt="logoIcon" className="w-9 h-9" />
            <img src={logoText} alt="logoText" className="w-[37.33px] h-7" />
          </div>
          <div className="flex flex-row gap-[14.5px] items-center">
            <div className="flex gap-2 items-center">
              <div className="font-SB00 text-[16px] text-ellipsis line-clamp-1">
                {getSelectedAddress()}
              </div>
              <img
                src={arrow}
                alt="Arrow"
                className="w-4 h-[6px] cursor-pointer"
                onClick={() => navigation('/address')}
              />
            </div>
            <img
              src={user}
              alt="userIcon"
              className="w-[19px] h-[19px] cursor-pointer"
              onClick={() => navigation('/mypage')}
            />
          </div>
        </div>

        {window.location.pathname === '/' ||
        window.location.pathname === '/around' ? (
          <div className="relative mt-[5.99px] mx-4">
            <input
              id="searchStore"
              type="text"
              placeholder="가맹점 이름을 검색해보세요"
              className={Cn(
                'py-[13px] pl-[13px] pr-[27px] w-full font-R00',
                'border border-200 rounded-lg placeholder:text-200 placeholder:text-sm'
              )}
            />
            <img
              src={search}
              alt="searchIcon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
            />
          </div>
        ) : (
          ''
        )}
      </header>
    </>
  )
}

export default Header
