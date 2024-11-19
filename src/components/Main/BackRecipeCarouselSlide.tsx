import { Link } from 'react-router-dom'
import preBackRecipeImg from '../../assets/main/PreBackRecipeImg.svg'
import likes from '../../assets/common/Likes.svg'

export default function BackRecipeCarouselSlide() {
  return (
    <>
      <Link to={'/'}>
        <div className={'mr-[10px]'}>
          <img
            src={preBackRecipeImg}
            className="w-[169px] h-[130px] cursor-pointer"
          />
          <div className="py-[10px] w-[169px] h-[54px] flex flex-row gap-[70px] bg-200 rounded-b-lg border border-200">
            <div className="pl-[13px]">
              <div className="max-w-[108px] w-fit text-nowrap font-SB00 text-[14px] text-800">
                마크정식
              </div>
              <div className="font-L00 text-[10px] text-400">7분 전</div>
            </div>
            <div className="flex felx-row gap-1 items-center font-R00 text-[10px] text-800 self-end">
              <img src={likes} alt="like count" className="w-[14px] h-[14px]" />
              <div>17</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
