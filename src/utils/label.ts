export interface LabelStyle {
  label: string
  style: string
}

const label: Record<string, LabelStyle> = {
  recommend_store: {
    label: '추천 가맹점',
    style: 'bg-[#E1FFEE] border-[#3BB000] text-[#3BB000]',
  },
  recipe: {
    label: '레시피 공유',
    style: 'bg-[#FFE1E1] border-[#FF6264] text-[#FF6264]',
  },
}

export default label
