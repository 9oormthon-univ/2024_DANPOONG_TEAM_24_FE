import { Component } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CarouselSlide from './CarouselSlide'
import ArrowIcon from '../../assets/common/Arrow.svg?react'
import '../../styles/Slick.css'

// 커스텀 Arrow용 타입 정의
interface customArrowProps {
  onClick?: () => void
}

// 커스텀 Next Arrow
function SampleNextArrow(props: customArrowProps) {
  const { onClick } = props
  return (
    <div
      className="absolute right-[37px] -rotate-90 top-[17px]"
      onClick={onClick}
    >
      <ArrowIcon className="w-4 h-[6px]" />
    </div>
  )
}

export default class CarouselSlider extends Component {
  render() {
    const settings: Settings = {
      dots: true,
      infinite: true,
      nextArrow: <SampleNextArrow />,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: 'linear',
      appendDots: (dots) => (
        <div
          style={{
            position: 'absolute',
            left: '177px',
            paddingBottom: '8px',
            bottom: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ul> {dots} </ul>
        </div>
      ),
      dotsClass: 'dots_custom',
    }
    return (
      <div>
        <Slider {...settings}>
          <CarouselSlide index={1} />
          <CarouselSlide index={2} />
          <CarouselSlide index={3} />
          <CarouselSlide index={4} />
        </Slider>
      </div>
    )
  }
}
