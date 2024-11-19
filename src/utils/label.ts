export interface LabelStyle {
  label: string
  style: string
}

const label: Record<string, LabelStyle> = {
  인기글: {
    label: '인기글',
    style: 'bg-[#FFF8BE] border-[#F80] text-[#F80]',
  },
  '추천 가맹점': {
    label: '추천 가맹점',
    style: 'bg-[#E1FFEE] border-[#3BB000] text-[#3BB000]',
  },
  '레시피 공유': {
    label: '레시피 공유',
    style: 'bg-[#FFE1E1] border-[#FF6264] text-[#FF6264]',
  },
  일상: {
    label: '일상',
    style: 'bg-[#D5F2FF] border-[#0080DB] text-[#0080DB]',
  },
}

export default label
