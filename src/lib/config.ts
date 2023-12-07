export const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export enum DataSource {
	Guardian = 'guardian',
	NewsAPI = 'newsapi',
	NYTimes = 'nytimes',
}
