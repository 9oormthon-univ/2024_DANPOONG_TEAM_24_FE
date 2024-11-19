import { Component } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import BackRecipeCarouselSlide from './BackRecipeCarouselSlide'
import '../../styles/Slick.css'

export default class BackRecipeCarouselSlider extends Component {
  render() {
    const settings: Settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: 'linear',
      variableWidth: true,
    }

    return (
      <div className="pl-4 w-[384px] overflow-hidden">
        <Slider {...settings}>
          <BackRecipeCarouselSlide />
          <BackRecipeCarouselSlide />
          <BackRecipeCarouselSlide />
          <BackRecipeCarouselSlide />
        </Slider>
      </div>
    )
  }
}
