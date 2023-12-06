import { useState } from 'react'
import { apiGetNews } from '@/api/user.api'

const useNews = () => {
	const [news, setNews] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	const fetchNews = async (criteria: INewsFetchForm) => {
		try {
			setLoading(true)

			const params = Object.entries(criteria).map(([key, value]) => (value ? `${key}=${value}` : ''))

			const { news } = await apiGetNews(params)

			setNews(news)
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return { news, fetchNews, loading }
}

export default useNews
