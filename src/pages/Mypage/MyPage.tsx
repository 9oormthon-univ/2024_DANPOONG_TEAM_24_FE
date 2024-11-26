import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Post from '../../assets/mypage/Post.svg'
import Comment from '../../assets/mypage/Comment.svg'
import Like from '../../assets/mypage/Like.svg'
import Xbutton from '../../assets/mypage/Xbutton.svg'
import useMypage from '../../hooks/MyPage/useMyPage'
import Assignment from '../../assets/mypage/assignment.svg'
import Service from '../../assets/mypage/document.svg'
import Privacy from '../../assets/mypage/privacy.svg'
import Logout from '../../assets/mypage/logout.svg'

interface SvgItem {
  src: string
  alt: string
  description: string
  path: string
  category: string
}

interface BottomSvgItem {
  src: string
  subject: string
}

function MyPage() {
  const navigate = useNavigate()
  const { profileInfo, fetchGetProfile } = useMypage()

  const svgs: SvgItem[] = [
    {
      src: Post,
      alt: 'Post',
      description: '작성한 글',
      path: '/mypage/writtenpost',
      category: 'my_post',
    },
    {
      src: Comment,
      alt: 'Comment',
      description: '댓글 단 글',
      path: '/mypage/commentpost',
      category: 'commented',
    },
    {
      src: Like,
      alt: 'Like',
      description: '좋아요 누른 글',
      path: '/mypage/likepost',
      category: 'liked',
    },
  ]

  const bottomSvgs: BottomSvgItem[] = [
    {
      src: Assignment,
      subject: '계정 정보',
    },
    {
      src: Service,
      subject: '서비스 이용약관',
    },
    {
      src: Privacy,
      subject: '개인정보 처리 방침',
    },
  ]

  useEffect(() => {
    fetchGetProfile()
  }, [])

  const handleClick = () => {
    navigate('/preparingSplash')
  }

  const handleLogout = () => {
    localStorage.clear()
    location.reload()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[390px]">
        <div className="w-full flex items-center justify-center p-3 relative pt-[20px]">
          <p className="text-lg font-SB00 text-center">마이페이지</p>
          <button onClick={() => navigate(-1)} className="absolute right-4">
            <img src={Xbutton} alt="Close" />
          </button>
        </div>
        <div className="w-full h-[200px] flex flex-col items-center justify-center bg-Main2 gap-[10px]">
          <img
            src={profileInfo?.profileUrl}
            alt="프로필 사진"
            className="w-[96px] h-[96px] rounded-full border-[5px] border-point1"
          />
          <p className="font-SB00 mb-3 text-xl">{profileInfo?.name}</p>
        </div>
        <p className="w-full px-4 pt-6 pb-2 font-SB00">활동내역</p>
        <div className="p-3 grid grid-cols-3 gap-3 h-36">
          {svgs.map((svg, index) => (
            <button
              key={index}
              className="p-3 bg-100 border border-200 rounded-lg flex flex-col justify-between h-full"
              onClick={() =>
                navigate(svg.path, { state: { category: svg.category } })
              }
            >
              <span className="font-SB00 text-sm text-left">
                {svg.description}
              </span>
              <div className="self-end">
                <img
                  src={svg.src}
                  alt={svg.alt}
                  className="w-[24px] h-[24px] mb-1"
                />
              </div>
            </button>
          ))}
        </div>

        <div className="px-4">
          {bottomSvgs.map((svg, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-4 py-3 border-b border-200 text-800"
              onClick={handleClick}
            >
              <img src={svg.src} />
              <a className="font-M00 text-m">{svg.subject}</a>
            </div>
          ))}
          <div
            className="flex items-center justify-start gap-4 py-3 border-b border-200 cursor-pointer"
            onClick={handleLogout}
          >
            <img src={Logout} alt="로그아웃" />
            <span className="font-M00 text-m">로그아웃</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage
