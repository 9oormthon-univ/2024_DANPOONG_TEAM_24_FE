import React from 'react'
import { Link } from 'react-router-dom'
import MapIcon from '../assets/common/Map.svg?react'
import FileIcon from '../assets/common/File.svg?react'
import HomeIcon from '../assets/common/Home.svg?react'
import RecipeIcon from '../assets/common/Recipe.svg?react'
import CommunityIcon from '../assets/common/Community.svg?react'
import { useLocation } from 'react-router-dom'

interface FooterOptionProps {
  title: string
}

function FooterOption({ title }: FooterOptionProps) {
  const location = useLocation()

  const iconMap: { [key: string]: JSX.Element } = {
    내주변: <MapIcon />,
    정보: <FileIcon />,
    홈: <HomeIcon />,
    레시피: <RecipeIcon />,
    커뮤니티: <CommunityIcon />,
  }

  const iconComponent = iconMap[title] || null

  const getIconColor = () => {
    switch (location.pathname) {
      case '/around':
        return title === '내주변' ? '#1C1D1F' : '#A0A4A8'
      case '/information':
        return title === '정보' ? '#1C1D1F' : '#A0A4A8'
      case '/':
        return title === '홈' ? '#1C1D1F' : '#A0A4A8'
      case '/community':
        return title === '커뮤니티' ? '#1C1D1F' : '#A0A4A8'
      case '/recipe':
        return title === '레시피' ? '#1C1D1F' : '#A0A4A8'
      default:
        return '#A0A4A8'
    }
  }

  const iconColor = getIconColor()

  const getLinkPath = () => {
    switch (title) {
      case '내주변':
        return '/around'
      case '정보':
        return '/information'
      case '홈':
        return '/'
      case '커뮤니티':
        return '/community'
      case '레시피':
        return '/recipe'
      default:
        return '/'
    }
  }

  return (
    <Link to={getLinkPath()}>
      <div
        className={`flex h-[53px] cursor-pointer ${
          title === '홈'
            ? 'relative gap-0 z-30'
            : 'flex-col gap-1 items-center justify-between w-full'
        } `}
      >
        <div
          className={`flex flex-col items-center  ${
            title === '홈'
              ? 'bg-Main rounded-full pt-[15px] w-[68px] h-[68px]'
              : 'justify-center'
          }`}
        >
          {iconComponent &&
            React.cloneElement(iconComponent, {
              style: { stroke: iconColor },
              className: title === '홈' ? 'w-[24.19px] h-[27.13px]' : '',
            })}
          {title === '홈' && (
            <span className="pt-[4.87px] font-M00 text-xs text-C400 text-nowrap">
              {title}
            </span>
          )}
        </div>
        {title !== '홈' && (
          <span className="font-M00 text-xs text-C400 text-nowrap">
            {title}
          </span>
        )}
      </div>
    </Link>
  )
}

export default FooterOption
