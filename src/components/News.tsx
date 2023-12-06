import Link from 'next/link'

interface Props {
	news: Record<string, any>
}

const News: React.FC<Props> = ({ news }) => {
	return (
		<Link
			href={news.webUrl}
			className='cursor-pointer space-y-2 rounded border-2 border-gray-400/40 p-5 transition duration-300 hover:border-white/80'
			target='_blank'
			title={news.title}
		>
			<img
				src={news.thumbnail || 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'}
				alt=''
				className='h-48 w-full flex-shrink-0 rounded object-cover'
			/>
			<div className='flex flex-col justify-between space-y-4'>
				<p className='line-clamp-2 text-lg'>{news.title}</p>
				<div className='flex justify-between gap-2'>
					{news.publishedAt && (
						<p className='whitespace-nowrap text-xs text-gray-300'>
							{new Date(news.publishedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
						</p>
					)}
					{news.author && <p className='truncate text-xs text-gray-300'>{news.author}</p>}
				</div>
			</div>
		</Link>
	)
}

export default News
