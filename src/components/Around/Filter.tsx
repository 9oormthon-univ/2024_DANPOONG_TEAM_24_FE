interface Filter {
  id: number
  label: string
  category_id?: number
}

// 24/11/22 희진 category_id 추가
const Filter: Filter[] = [
  { id: 1, label: '전체', category_id: 3 },
  { id: 2, label: '검증된 맛집', category_id: 11 },
  { id: 3, label: '한식', category_id: 1 },
  { id: 4, label: '중식', category_id: 8 },
  { id: 5, label: '양식', category_id: 9 },
  { id: 6, label: '일식', category_id: 7 },
  { id: 7, label: '분식', category_id: 10 },
  { id: 8, label: '패스트푸드', category_id: 5 },
  { id: 9, label: '편의점', category_id: 4 },
  { id: 10, label: '카페', category_id: 6 },
  { id: 11, label: '기타', category_id: 2 },
]

export default Filter
