import { DataSource } from '@/lib/config'

export {}

declare global {
	export interface IUser {
		name: string
		email: string
		preferences?: {
			source: DataSource
			category?: string
			author?: string
		}
	}

	export interface ILoginForm {
		email: string
		password: string
	}

	export interface IRegisterForm {
		name: string
		email: string
		password: string
	}

	export interface INewsFetchForm {
		source?: string
		category?: string
		author?: string
		keyword?: string
	}

	export interface IPreferencesForm {
		source: DataSource
		category: string
	}
}
