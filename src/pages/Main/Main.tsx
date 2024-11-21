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
import BackRecipeCarouselSlider from '../../components/Main/BackRecipeCarouselSlider'
import { Link, useNavigate } from 'react-router-dom'
import Splash from '../Splash'
import useAuthStore from '../../store/UseAuthStore'
import useListFilterOptionStore from '../../store/UseListFilterOptionStore'
import Contents from '../../components/Community/Contents'
import useCommunity from '../../hooks/Community/useCommmunity'

function Main() {
  const navigate = useNavigate()
  const { showSplash, setLoggedIn, setShowSplash } = useAuthStore()
  const { setSelectedFilterOption } = useListFilterOptionStore()
  const { popularInfo, fetchGetPopularList } = useCommunity()

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

  useEffect(() => {
    fetchGetPopularList()
  }, [])

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
            <div className="px-[18px] font-M00 text-[18px] mb-5">
              요번주 인기글
            </div>
            <div className="flex flex-col gap-[10px] items-center">
              {popularInfo?.data.map((content) => (
                <Contents
                  key={content.post_id}
                  nickname={content.author}
                  title={content.title}
                  content={content.content}
                  updateHour={content.created_at}
                  imgUrl={content.author_profile_url}
                  postId={content.post_id}
                  category={content.post_category}
                  likes={content.like_user.length}
                  comments={content.comment_count}
                  isLabel
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
