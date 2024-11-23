import { Component } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import BackRecipeCarouselSlide from './BackRecipeCarouselSlide'
import '../../styles/Slick.css'
import { recommendRecipeResponse } from '../../types/Main/RecommendRecipeResponse'

interface BackRecipeCarouselSliderProps {
  recipeList?: recommendRecipeResponse[]
}

export default class BackRecipeCarouselSlider extends Component<BackRecipeCarouselSliderProps> {
  render() {
    const { recipeList } = this.props
    const settings: Settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: 'linear',
      variableWidth: true,
    }

    return (
      <div className="pl-4 w-[384px] overflow-hidden">
        <Slider {...settings}>
          {recipeList?.map((recipe) => (
            <BackRecipeCarouselSlide key={recipe.recipeId} recipe={recipe} />
          ))}
        </Slider>
      </div>
    )
  }
}
