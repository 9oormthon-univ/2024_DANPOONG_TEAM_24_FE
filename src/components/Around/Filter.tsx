interface Filter {
    id: number
    label: string
  }
  
  const Filter: Filter[] = [
    { id: 1, label: "전체" },
    { id: 2, label: "영업중" },
    { id: 3, label: "검증된 맛집" },
    { id: 4, label: "한식" },
    { id: 5, label: "중식" },
    { id: 6, label: "양식" },
    { id: 7, label: "일식" },
    { id: 8, label: "패스트푸드" },
    { id: 9, label: "편의점" },
    { id: 10, label: "제과점" },
  ];
  
  export default Filter
  