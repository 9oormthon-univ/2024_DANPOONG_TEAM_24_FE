import { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CarouselSlider from '../../components/Main/CarouselSlider'
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
import introRecipe from '../../assets/main/IntroRecipe.svg'
import BackRecipeCarouselSlider from '../../components/Main/BackRecipeCarouselSlider'
import { Link, useNavigate } from 'react-router-dom'
import Splash from '../Splash/Splash'
import useAuthStore from '../../store/UseAuthStore'
import useListFilterOptionStore from '../../store/UseListFilterOptionStore'
import Contents from '../../components/Community/Contents'
import useCommunity from '../../hooks/Community/useCommmunity'
import useRecipe from '../../hooks/Main/useRecipe'

function Main() {
  const navigate = useNavigate()
  const { showSplash, setLoggedIn, setShowSplash } = useAuthStore()
  const { setSelectedFilterOption } = useListFilterOptionStore()
  const { popularInfo, fetchGetPopularList } = useCommunity()
  const { recipeList, fetchGetRecipeList } = useRecipe()

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
    fetchGetRecipeList()
  }, [])

  if (showSplash) {
    // 스플래시 화면 표시
    return <Splash />
  }

  const svgs = [
    { src: all, alt: 'All', description: '전체', category_id: 3 },
    { src: korean, alt: 'Korean', description: '한식', category_id: 1 },
    { src: chinese, alt: 'Chinese', description: '중식', category_id: 8 },
    { src: western, alt: 'Western', description: '양식', category_id: 9 },
    { src: japanese, alt: 'Japanese', description: '일식', category_id: 7 },
    { src: bunsic, alt: 'Bunsic', description: '분식', category_id: 10 },
    {
      src: fastfood,
      alt: 'Fastfood',
      description: '패스트푸드',
      category_id: 5,
    },
    {
      src: convenience,
      alt: 'Convenience',
      description: '편의점',
      category_id: 4,
    },
    { src: cafe, alt: 'Cafe', description: '카페', category_id: 6 },
    { src: etc, alt: 'Etc', description: '기타', category_id: 2 },
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
            <div className="mx-3 px-[10px] pb-[11px] flex flex-wrap justify-center bg-[#F4F5F7] border border-200 rounded-lg">
              {svgs.map((svg, index) => (
                <div
                  key={index}
                  className="mt-4 w-1/5 flex flex-col gap-[7px] justify-center items-center"
                >
                  <div
                    className="p-2 w-[50px] h-[50px] bg-white flex justify-center border border-200 rounded-[5px] cursor-pointer"
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
              이번주 인기글
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
            <BackRecipeCarouselSlider recipeList={recipeList?.data} />
          </section>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Main
