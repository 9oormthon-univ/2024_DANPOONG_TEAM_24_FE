import { useState, useEffect, useRef } from 'react'

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]) // 검색 결과 상태
  const [searchText, setSearchText] = useState('') // 입력된 검색어
  const [showResults, setShowResults] = useState(false) // 검색 결과 표시 여부

  const ps = new kakao.maps.services.Places()
  const resultsRef = useRef<HTMLDivElement | null>(null) // 검색 결과 리스트를 참조하는 ref

  // 검색어 변경 시 처리
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)

    if (value.trim() === '') {
      setSearchResults([]) // 검색어가 비었을 때 결과 초기화
      return
    }

    ps.keywordSearch(value, placesSearchCB)
    setShowResults(true) // 검색 결과 보이기
  }

  // 검색 결과 콜백
  const placesSearchCB = (data: any[], status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      setSearchResults(data) // 검색 결과 상태에 저장
    }
  }

  // 외부 클릭 시 검색 결과 숨기기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setSearchText('')
        setShowResults(false) // 검색 결과 외부 클릭 시 닫기
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return {
    searchText,
    setSearchText,
    searchResults,
    showResults,
    handleSearchChange,
    resultsRef,
    setShowResults,
  }
}
