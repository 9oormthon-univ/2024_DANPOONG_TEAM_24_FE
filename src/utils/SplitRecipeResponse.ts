interface ParsedRecipe {
  recommendedItems: string[] // 추천 제품 목록
  total: string | null // 총합
  recommendation: string | null // 추천 구성
}

interface RecipeItemProps {
  name: string
  price: string
  description: string
}

export default function parseRecipeParagraphs(
  paragraphs: string[]
): ParsedRecipe {
  const recommendedItems: string[] = []
  let total: string | null = null
  let recommendation: string | null = null

  paragraphs.forEach((paragraph) => {
    if (paragraph.startsWith('1. 추천 제품 목록:')) {
      // 추천 제품 목록에서 아이템 분리
      const items = paragraph
        .split('\n') // 줄바꿈 기준으로 분리
        .slice(1) // 첫 줄("1. 추천 제품 목록:") 제외
        .map((item) => item.trim()) // 양쪽 공백 제거
      recommendedItems.push(...items)
    } else if (paragraph.startsWith('2. 총합:')) {
      // 총합 저장
      total = paragraph.replace('2. 총합:', '').trim()
    } else if (paragraph.startsWith('3. 추천 구성:')) {
      // 추천 구성 저장
      recommendation = paragraph.replace('3. 추천 구성:', '').trim()
    }
  })

  return {
    recommendedItems,
    total,
    recommendation,
  }
}

export function parseRecipeItems(data: string[]): RecipeItemProps[] {
  return data.map((item) => {
    // 정규식으로 이름, 가격, 설명 추출
    const match = item.match(/- (.+?) \(([\d,]+원)\): (.+)/)
    if (match) {
      return {
        name: match[1], // 이름
        price: match[2], // 가격
        description: match[3], // 설명
      }
    }
    return {
      name: '알 수 없는 아이템',
      price: '가격 정보 없음',
      description: '설명 없음',
    }
  })
}
