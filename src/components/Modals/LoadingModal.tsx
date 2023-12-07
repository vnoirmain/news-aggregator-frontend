import { ClipLoader } from 'react-spinners'
import useAppSelector from '@/hooks/useAppSelector'

const LoadingModal = () => {
	const loading = useAppSelector((state) => state.modal.loading)

	return loading ? (
		<div className='fixed inset-0 z-[200] flex items-center justify-center'>
			<ClipLoader color='white' />
		</div>
	) : (
		<></>
	)
}

export default LoadingModal
