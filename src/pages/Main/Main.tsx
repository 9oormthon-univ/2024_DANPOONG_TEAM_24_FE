import { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CarouselSlider from '../../components/Main/CarouselSlider'
import all from '../../assets/main/All.svg'
import korean from '../../assets/main/Korean.svg'
import chinese from '../../assets/main/Chinese.svg'
import western from '../../assets/main/Western.svg'
import fastfood from '../../assets/main/Fastfood.svg'
import convenience from '../../assets/main/Convenience.svg'
import bakery from '../../assets/main/Bakery.svg'
import japanese from '../../assets/main/Japanese.svg'
import introRecipe from '../../assets/main/IntroRecipe.svg'
import BestPostCard from '../../components/Main/BestPostCard'
import BackRecipeCarouselSlider from '../../components/Main/BackRecipeCarouselSlider'
import { Link, useNavigate } from 'react-router-dom'
import Splash from '../Splash'
import useAuthStore from '../../store/UseAuthStore'
import useListFilterOptionStore from '../../store/UseListFilterOptionStore'

function Main() {
  const navigate = useNavigate()
  const { showSplash, setLoggedIn, setShowSplash } = useAuthStore()
  const { setSelectedFilterOption } = useListFilterOptionStore()

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn')
    if (loginStatus === 'true') {
      setTimeout(() => {
        setShowSplash(false) // 스플래시 2초 후 숨기기
      }, 2000)
      setLoggedIn(true) // 로그인 상태 설정
    } else {
      setShowSplash(true) // 스플래시 화면 유지
    }
  }, [setLoggedIn, setShowSplash])

  if (showSplash) {
    // 스플래시 화면 표시
    return <Splash />
  }

  const svgs = [
    { src: all, alt: 'All', description: '전체' },
    { src: korean, alt: 'Korean', description: '한식' },
    { src: chinese, alt: 'Chinese', description: '중식' },
    { src: western, alt: 'Western', description: '양식' },
    { src: fastfood, alt: 'Fastfood', description: '패스트푸드' },
    { src: convenience, alt: 'Convenience', description: '편의점' },
    { src: bakery, alt: 'Bakery', description: '제과점' },
    { src: japanese, alt: 'Japanese', description: '일식' },
  ]

  const bestPosts = [
    {
      contents:
        '00님 편의점 레시피 시도했는데 맛있어요! 먹기 좋은 편의점 위치도 공유합니다',
      writer: '익명의 카피바라',
      updatedAt: '7시간 전',
      category: '레시피 공유',
      views: 17,
      likes: 17,
      comments: 17,
    },
    {
      contents:
        '01님 편의점 레시피 시도했는데 맛있어요! 먹기 좋은 편의점 위치도 공유합니다',
      writer: '익명의 개똥벌레',
      updatedAt: '7시간 전',
      category: '일상',
      views: 17,
      likes: 17,
      comments: 17,
    },
  ]

  const handleSvgClick = (description: string) => {
    setSelectedFilterOption(description)
    navigate('/around')
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Header />
        <div className="mb-[31.5px] w-[390px] ">
          <section className="mt-[17px]">
            <CarouselSlider />
          </section>
          <section className="mt-5">
            <div className="mx-3 px-4 pb-[18px] flex flex-wrap justify-center bg-100 border-[0.4px] border-200 rounded-lg">
              {svgs.map((svg, index) => (
                <div
                  key={index}
                  className="mt-4 w-1/4 flex flex-col gap-[7px] justify-center items-center"
                >
                  <div
                    className="p-2 w-[50px] h-[50px] bg-[#ffffff] flex justify-center border border-200 rounded-[5px] cursor-pointer"
                    onClick={() => handleSvgClick(svg.description)}
                  >
                    <img src={svg.src} alt={svg.alt} />
                  </div>
                  <div className="font-M00 text-sm leading-[135%]">
                    {svg.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="mt-5 px-4">
            <Link to={'/recipe'}>
              <img
                src={introRecipe}
                alt="Introduce Recipe"
                className="cursor-pointer"
              />
            </Link>
          </section>
          <section className="mt-[30px]">
            <div className="px-[18px] font-M00 text-[18px]">요번주 인기글</div>
            <div className="px-4">
              {bestPosts.map((bestPost, index) => (
                <BestPostCard
                  key={index}
                  contents={bestPost.contents}
                  writer={bestPost.writer}
                  updatedAt={bestPost.updatedAt}
                  category={bestPost.category}
                  views={bestPost.views}
                  likes={bestPost.likes}
                  comments={bestPost.comments}
                />
              ))}
            </div>
          </section>
          <section className="mt-[30px] mb-[117px] max-w-[367px]">
            <div className="px-[18px] mb-[10px] font-M00 text-[18px]">
              정부 추천 편의점 건강 레시피
            </div>
            <BackRecipeCarouselSlider />
          </section>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Main
