'use client'

import { useRouter } from 'next/navigation'
import { Field, Form } from 'react-final-form'
import { apiUpdateUserPreferences } from '@/api/user.api'
import SelectForm from '@/components/Forms/SelectForm'
import PageLoader from '@/components/PageLoader'
import { dataSources } from '@/constants/dataSource'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { setPreferences } from '@/redux/slices/auth.slice'
import { setLoading } from '@/redux/slices/modal.slice'

export default function Profile() {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const { user, isLoggedIn, loading } = useAppSelector((state) => state.auth)

	console.log(user)

	const handleSubmit = async (preferences: IPreferencesForm) => {
		try {
			dispatch(setLoading(true))

			const { data } = await apiUpdateUserPreferences(preferences)

			dispatch(setPreferences(data))

			router.push('/')
		} catch (err) {
			console.log(err)
		} finally {
			dispatch(setLoading(false))
		}
	}

	if (loading) {
		return <PageLoader />
	}

	if (!isLoggedIn) {
		router.push('/')
		return <></>
	}

	return (
		<div className='container'>
			<div className='py-10'>
				<Form
					initialValues={{
						source: user.preferences.source,
						category: user.preferences.category,
					}}
					onSubmit={handleSubmit}
					render={({ handleSubmit, values }) => (
						<form className='mx-auto flex w-full max-w-md flex-col space-y-4' onSubmit={handleSubmit}>
							<h1 className='text-3xl font-bold'>Your preferences</h1>
							<Field name='source' className='w-full'>
								{(props) => (
									<SelectForm
										label='Data source'
										options={dataSources.map((source) => ({ label: source.name, value: source.value }))}
										placeholder='Select data source'
										{...props}
									/>
								)}
							</Field>
							<Field name='category' className='w-full'>
								{(props) => (
									<SelectForm
										label='Category'
										options={
											values.source
												? dataSources
														.filter((source) => source.value === values.source)[0]
														.categories.map((category) => ({ label: category.name, value: category.id }))
												: []
										}
										placeholder='Select category'
										{...props}
									/>
								)}
							</Field>
							<button
								type='submit'
								className='rounded bg-primary-600 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50'
							>
								Update
							</button>
						</form>
					)}
				/>
			</div>
		</div>
	)
}
