import { ClipLoader } from 'react-spinners'

const PageLoader = () => {
	return (
		<div className='flex w-full items-center justify-center py-10'>
			<ClipLoader color='white' />
		</div>
	)
}

export default PageLoader
