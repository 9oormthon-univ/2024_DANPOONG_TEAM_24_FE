import { Link } from 'react-router-dom'
import { recommendRecipeResponse } from '../../types/Main/RecommendRecipeResponse'

interface BackRecipeCarouselSlideProps {
  recipe: recommendRecipeResponse
}
export default function BackRecipeCarouselSlide({
  recipe,
}: BackRecipeCarouselSlideProps) {
  return (
    <>
      <Link to={recipe.videoUrl}>
        <div className={'mr-[10px]'}>
          <img
            src={recipe.imageUrl}
            alt={recipe.recipeName}
            className="w-[169px] h-[130px] cursor-pointer"
          />
          <div className="py-[10px] w-[169px] h-[54px] flex flex-row gap-[70px] bg-100 rounded-b-lg border border-200">
            <div className="pl-[13px]">
              <div className="max-w-[108px] w-fit text-nowrap font-SB00 text-[14px] text-800">
                {recipe.recipeName}
              </div>
              <div className="font-L00 text-[10px] text-400">
                {recipe.description}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
