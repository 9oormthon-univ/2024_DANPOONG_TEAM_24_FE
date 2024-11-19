import { Link } from 'react-router-dom'
import preBackRecipeImg from '../../assets/main/PreBackRecipeImg.svg'

export default function BackRecipeCarouselSlide() {
  return (
    <>
      <Link to={'/'}>
        <div className={'mr-[10px]'}>
          <img
            src={preBackRecipeImg}
            className="w-[169px] h-[130px] cursor-pointer"
          />
          <div className="py-[10px] w-[169px] h-[54px] flex flex-row gap-[70px] bg-100 rounded-b-lg border border-200">
            <div className="pl-[13px]">
              <div className="max-w-[108px] w-fit text-nowrap font-SB00 text-[14px] text-800">
                치치렌또
              </div>
              <div className="font-L00 text-[10px] text-400">
                #저속노화 레시피
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
