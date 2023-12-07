import { useState } from 'react'
import { apiGetNews } from '@/api/user.api'

interface ICriteria extends INewsFetchForm {
	offset?: number
	limit?: number
}

const useNews = () => {
	const [news, setNews] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [hasMore, setHasMore] = useState<boolean>(true)

	const fetchNews = async (criteria: ICriteria) => {
		try {
			setLoading(true)

			const params = Object.entries(criteria).map(([key, value]) => (value ? `${key}=${value}` : ''))

			const { news } = await apiGetNews(params)

			if (criteria.offset === 0) {
				setNews(news)
			} else {
				setNews((prev) => [...prev, ...news])
			}

			if (news.length < 24) {
				setHasMore(false)
			}
		} catch (err) {
			console.log(err)
			setHasMore(false)
		} finally {
			setLoading(false)
		}
	}

	return { news, fetchNews, loading, hasMore }
}

export default useNews
