import { useNavigate } from 'react-router-dom';
import Backbutton from '../../assets/mypage/Backbutton.svg';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center pt-[20px] py-[11px]">
      <button onClick={() => navigate(-1)} className="absolute left-[16px]">
        <img src={Backbutton} alt="back" />
      </button>
      <p className="text-lg font-SB00 text-center">{title}</p>
    </div>
  );
};

export default Header;
