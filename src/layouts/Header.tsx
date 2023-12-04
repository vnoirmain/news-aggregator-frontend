import Navigation from 'components/Navigation';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='sticky top-0 z-[150] flex h-20 min-h-[80px] items-center bg-background lg:h-[68px] lg:min-h-[68px] shadow-sm bg-white'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <Link to='/'>
            <img src='/assets/icons/Logo.svg' alt='logo' className='h-10' />
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
