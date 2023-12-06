import { Link } from 'react-router-dom'
import Navigation from 'components/Navigation'

const Header = () => {
	return (
		<header className='sticky top-0 z-50 flex items-center bg-gradient-to-tl from-gray-300/20 via-gray-400/20 to-gray-500/20'>
			<div className='container'>
				<div className='flex h-20 items-center justify-between'>
					<Link to='/'>
						<img src='/assets/icons/Logo.svg' alt='logo' className='h-10' />
					</Link>
					<Navigation />
				</div>
			</div>
		</header>
	)
}

export default Header
