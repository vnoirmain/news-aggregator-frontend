'use client'

import { useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PropagateLoader } from 'react-spinners'
import InputForm from '@/components/Forms/InputForm'
import SelectForm from '@/components/Forms/SelectForm'
import News from '@/components/News'
import { dataSources } from '@/constants/dataSource'
import useAppSelector from '@/hooks/useAppSelector'
import useNews from '@/hooks/useNews'

export default function Dashboard() {
	const { news, fetchNews, loading, hasMore } = useNews()
	const [page, setPage] = useState<number>(0)
	const [form, setForm] = useState<INewsFetchForm>()
	const user = useAppSelector((state) => state.auth.user)

	useEffect(() => {
		fetchNews({})
	}, []) //eslint-disable-line

	const handleSubmit = (values: INewsFetchForm) => {
		fetchNews({ ...values, offset: 0 })
		setForm(values)
	}

	const fetchMoreNews = () => {
		fetchNews({ ...form, offset: (page + 1) * 24 })
		setPage((prev) => prev + 1)
	}

	return (
		<div className='container'>
			<div className='space-y-10 py-10 xs:space-y-5 xs:py-5'>
				<Form
					initialValues={{ source: user?.preferences?.source, category: user?.preferences?.category }}
					onSubmit={handleSubmit}
					render={({ handleSubmit, values }) => (
						<form className='flex gap-2 md:flex-wrap sticky top-0 bg-background py-2' onSubmit={handleSubmit}>
							<Field name='source' className='w-full md:w-[calc(50%-4px)] xs:w-full'>
								{(props) => (
									<SelectForm
										options={dataSources.map((source) => ({ label: source.name, value: source.value }))}
										placeholder='Select data source'
										{...props}
									/>
								)}
							</Field>
							<Field name='category' className='w-full md:w-[calc(50%-4px)] xs:w-full'>
								{(props) => (
									<SelectForm
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
							<Field name='keyword' className='w-full md:w-full'>
								{(props) => <InputForm placeholder='Keyword' {...props} />}
							</Field>
							<button
								type='submit'
								className='rounded bg-primary-600 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 md:w-full'
								disabled={loading}
							>
								View
							</button>
						</form>
					)}
				/>
				<InfiniteScroll
					dataLength={news.length}
					hasMore={hasMore}
					loader={
						<div className='flex justify-center pt-5'>
							<PropagateLoader size={12} color='white' />
						</div>
					}
					next={fetchMoreNews}
					scrollableTarget='__next'
					scrollThreshold={0.8}
				>
					<div className='grid grid-cols-3 gap-5 md:grid-cols-2 xs:grid-cols-1'>
						{news.map((news) => (
							<News news={news} key={news.title} />
						))}
					</div>
				</InfiniteScroll>
			</div>
		</div>
	)
}
