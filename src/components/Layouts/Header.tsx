'use client'

import Link from 'next/link'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { logout } from '@/redux/slices/auth.slice'
import { setSignInModalOpen, setSignUpModalOpen } from '@/redux/slices/modal.slice'

export default function Header() {
	const dispatch = useAppDispatch()
	const { isLoggedIn } = useAppSelector((state) => state.auth)

	return (
		<header className='bg-background shadow'>
			<div className='container'>
				<div className='flex h-20 items-center justify-between'>
					<Link href='/'>
						<img src='/images/logo.png' alt='logo' className='h-20 invert' />
					</Link>
					{!isLoggedIn ? (
						<nav className='space-x-8'>
							<span className='cursor-pointer' onClick={() => dispatch(setSignInModalOpen(true))}>
								Login
							</span>
							<span className='cursor-pointer' onClick={() => dispatch(setSignUpModalOpen(true))}>
								Register
							</span>
						</nav>
					) : (
						<div className='space-x-8'>
							<Link href='/profile'>Profile</Link>
							<span className='cursor-pointer' onClick={() => dispatch(logout())}>
								Logout
							</span>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}
