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
  const iconSrc = isAccepted
    ? '../src/assets/information/YellowDot.svg'
    : '../src/assets/information/RedDot.svg'

  return (
    <div className="h-[120px] flex items-start px-[18px] py-[27px] gap-[0.5625rem] border border-200 rounded-xl">
      <img src={iconSrc} alt="informationDot" />
      <div>
        <div
          className={`font-SB00 text-800 text-[16px] leading-[140%] whitespace-pre-line ${
            isAccepted ? 'text-nowrap' : ''
          }`}
        >
          {title}
        </div>
        <div className="mt-2 font-M00 text-400 text-xs leading-[140%] -tracking-[0.8px]">
          {description}
        </div>
      </div>
    </div>
  )
}

export default InformationCard
