import { Field, Form } from 'react-final-form'
import { cx } from '@/helpers/classNames'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { login } from '@/redux/slices/auth.slice'
import { setLoading, setSignInModalOpen } from '@/redux/slices/modal.slice'
import InputForm from '../Forms/InputForm'

const LoginModal = () => {
	const dispatch = useAppDispatch()
	const isOpen = useAppSelector((state) => state.modal.isSignInModalOpen)

	const closeModal = () => {
		dispatch(setSignInModalOpen(false))
	}

	const handleLogin = async (user: ILoginForm) => {
		try {
			dispatch(setLoading(true))

			await dispatch(login(user))

			closeModal()
		} catch (err) {
			console.log(err)
		} finally {
			dispatch(setLoading(false))
		}
	}

	return (
		<div
			className={cx(
				'fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-500/20 p-5 transition duration-300',
				isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
			)}
		>
			<div className='absolute inset-0 -z-10' onClick={closeModal} />
			<Form
				onSubmit={handleLogin}
				render={({ handleSubmit }) => (
					<form
						className='relative mx-auto w-full max-w-lg space-y-4 rounded bg-modal p-5 shadow-md'
						onSubmit={handleSubmit}
					>
						<h1>Login to your account</h1>
						<Field name='email'>{(props) => <InputForm label='Email' {...props} />}</Field>
						<Field name='password'>{(props) => <InputForm type='password' label='Password' {...props} />}</Field>
						<div className='flex items-center justify-end gap-2'>
							<button
								type='button'
								className='rounded border border-gray-400 px-3 py-2 text-sm font-medium'
								onClick={closeModal}
							>
								Cancel
							</button>
							<button type='submit' className='rounded bg-primary-500 px-3 py-2 text-sm font-medium'>
								Login
							</button>
						</div>
					</form>
				)}
			/>
		</div>
	)
}

export default LoginModal
