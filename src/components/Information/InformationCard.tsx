import True from '../../assets/information/True.svg'
import False from '../../assets/information/False.svg'

interface informationCardProps {
  title: string
  description: string
  isAccepted?: boolean
}

function InformationCard({
  title,
  description,
  isAccepted,
}: informationCardProps) {
  const iconSrc = isAccepted ? True : False

  return (
    <div className="flex items-start px-[18px] py-[14px] gap-[0.5625rem] border border-200 rounded-xl">
      <img src={iconSrc} alt="Information of Card" />
      <div>
        <div
          className={`font-SB00 text-800 text-[16px] leading-[140%] whitespace-pre-line ${
            isAccepted ? 'text-nowrap' : ''
          }`}
        >
          {title}
        </div>
        <div className="mt-2 font-M00 text-400 text-xs leading-[140%] -tracking-[0.8px] whitespace-pre-line">
          {description}
        </div>
      </div>
    </div>
  )
}

export default InformationCard
