import { Link } from 'react-router-dom'

import yellow from '../../assets/main/Yellow.svg'
import blue from '../../assets/main/Blue.svg'
import green from '../../assets/main/Green.svg'
import pink from '../../assets/main/Pink.svg'

interface carouselSlideProps {
  index: Number
}

export default function CarouselSlide({ index }: carouselSlideProps) {
  const getImgSrc = () => {
    switch (index) {
      case 1:
        return yellow
      case 2:
        return blue
      case 3:
        return green
      default:
        return pink
    }
  }

  const imgSrc = getImgSrc()

  return (
    <>
      <Link to={'/information'}>
        <div>
          <img
            src={imgSrc}
            alt={`Slide ${index}`}
            className="w-full cursor-pointer"
          />
        </div>
      </Link>
    </>
  )
}
