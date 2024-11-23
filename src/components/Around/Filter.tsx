import all from '../../assets/main/All.svg'
import korean from '../../assets/main/Korean.svg'
import chinese from '../../assets/main/Chinese.svg'
import western from '../../assets/main/Western.svg'
import bunsic from '../../assets/main/Bunsik.svg'
import fastfood from '../../assets/main/Fastfood.svg'
import convenience from '../../assets/main/Convenience.svg'
import japanese from '../../assets/main/Japanese.svg'
import cafe from '../../assets/main/Cafe.svg'
import etc from '../../assets/main/Etc.svg'

interface Filter {
  id: number
  label: string
  category_id?: number
  image?: string;
}

// 24/11/22 희진 category_id 추가
const Filter: Filter[] = [
  { id: 1, label: '전체', category_id: 3, image: all },
  { id: 2, label: '검증된 맛집', category_id: 11 },
  { id: 3, label: '한식', category_id: 1, image: korean },
  { id: 4, label: '중식', category_id: 8, image: chinese },
  { id: 5, label: '양식', category_id: 9, image: western },
  { id: 6, label: '일식', category_id: 7, image: japanese },
  { id: 7, label: '분식', category_id: 10, image: bunsic },
  { id: 8, label: '패스트푸드', category_id: 5, image: fastfood },
  { id: 9, label: '편의점', category_id: 4, image: convenience },
  { id: 10, label: '카페', category_id: 6, image: cafe },
  { id: 11, label: '기타', category_id: 2, image: etc },
]

export default Filter
