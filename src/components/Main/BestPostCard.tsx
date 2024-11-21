import preProfile from '../../assets/common/PreProfileImg.svg'
import viewSvg from '../../assets/common/Views.svg'
import likeSvg from '../../assets/common/Likes.svg'
import commentSvg from '../../assets/common/Comments.svg'
import Label from '../Community/Label'

interface bestPostCardProps {
  contents: string
  writer: string
  updatedAt: string
  category: string
  likes: number
  views: number
  comments: number
}

export default function BestPostCard({
  contents,
  writer,
  updatedAt,
  category,
  likes,
  views,
  comments,
}: bestPostCardProps) {
  return (
    <>
      <div className="relative mt-[10px] px-[10px] py-4 bg-100 flex flex-col rounded-xl border border-200">
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-[10px]">
            <img src={preProfile} alt="pre profile img" />
            <div className="flex flex-col">
              <div className="font-SB00 text-[14px]">{writer}</div>
              <div className="font-L00 text-xs text-C400">{updatedAt}</div>
            </div>
          </div>
          <Label category={category} />
        </div>

        <div className="pt-3 font-R00 text-[14px] leading-[135%]">
          {contents}
        </div>
        <div className="pt-[10px] flex flex-row gap-[10px] font-M00 text-[10px] text-400 self-end">
          <div className="flex flex-row gap-[6px] items-center">
            <img src={viewSvg} alt="view count" />
            <div>{views}</div>
          </div>
          <div className="flex flex-row gap-[6px] items-center">
            <img src={likeSvg} alt="like count" />
            <div>{likes}</div>
          </div>
          <div className="flex flex-row gap-[6px] items-center">
            <img src={commentSvg} alt="comment count" />
            <div>{comments}</div>
          </div>
        </div>
      </div>
    </>
  )
}
