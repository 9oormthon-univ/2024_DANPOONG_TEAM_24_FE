import Post from '../assets/mypage/Post.svg'
import Comment from '../assets/mypage/Comment.svg'
import Like from '../assets/mypage/Like.svg'
import Xbutton from '../assets/mypage/Xbutton.svg'
import { useNavigate } from 'react-router-dom'

function MyPage() {
    const navigation = useNavigate()

    const svgs = [
        { src: Post, alt: 'Post', description: '작성한 글' },
        { src: Comment, alt: 'Comment', description: '댓글 단 글' },
        { src: Like, alt: 'Like', description: '좋아요 누른 글' },
    ];

    return (
        <div>
            <div className="flex items-center justify-center p-3 relative">
                <p className="text-lg font-SB00 text-center">마이페이지</p>
                <button onClick={() => navigation(-1)} className="absolute right-4">
                    <img src={Xbutton} alt="Close"/>
                </button>
            </div>

            <div className="border-t border-200 bg-Main h-[212px] px-4 py-6 flex flex-col items-center justify-center">
                <div className="w-[96px] h-[96px] rounded-full bg-200 mb-[16px]">
                </div>
                <p className="font-SB00 mb-3">익명의 고슴도치</p>
            </div>
            <p className="px-4 pt-6 pb-2 font-SB00">활동내역</p>
            <div className="p-3 grid grid-cols-3 gap-3 h-36">
                {svgs.map((svg, index) => (
                    <button
                        key={index}
                        className="p-3 bg-100 border border-200 rounded-lg flex flex-col justify-between h-full"
                    >
                        <span className="font-SB00 text-sm text-left">{svg.description}</span>
                        <div className="self-end">
                            <img src={svg.src} alt={svg.alt} className="w-[24px] h-[24px] mb-1" />
                        </div>
                    </button>
                ))}
            </div>

            <div className="px-4">
                {['계정 정보', '서비스 이용약관', '개인정보처리 방침', '로그아웃'].map((text, index) => (
                    <div key={index} className="py-3 border-b border-200">
                        <a href="#" className="font-M00 text-m">{text}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyPage;
