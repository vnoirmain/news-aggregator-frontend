export const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export enum DataSource {
	NewsAPI = 'newsapi',
	Guardian = 'guardian',
	NYTimes = 'nytimes',
}
