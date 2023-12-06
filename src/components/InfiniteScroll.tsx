import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SpinnerCircularSplit } from 'spinners-react'
import { API } from 'src/api'
import { LOAD_ITEMS_COUNT } from 'src/config/global'

interface MInfiniteScrollProps {
	listComponent?: React.FC<any>
	callbackParams?: any[] | any
	getDataCallback?: (...args: any[]) => any
	renderParams?: any[]
}

const MInfiniteScroll = (props: MInfiniteScrollProps) => {
	const { listComponent, callbackParams, getDataCallback, renderParams = [] } = props

	const [data, setData] = useState([])

	const [fetching, setFetching] = useState(false)
	const [hasMore, setHasMore] = useState(true)

	const fetchData = useCallback(
		async (forced = 0) => {
			if ((fetching && !forced) || !callbackParams) {
				return
			}

			setFetching(true)

			try {
				let params
				const tempData = forced === 1 ? [] : data.map((item) => item)
				const initialData = tempData.map((item) => item)

				if (getDataCallback === API.getAssets) {
					params = [
						{
							...callbackParams,
							offset: tempData.length,
							limit: LOAD_ITEMS_COUNT,
						},
					]
				} else {
					params = [...callbackParams, tempData.length, LOAD_ITEMS_COUNT]
				}

				const moreData = await getDataCallback(...params)

				if (moreData.length < LOAD_ITEMS_COUNT) {
					setHasMore(false)
				}

				moreData.forEach((item, index: number) => {
					if (tempData.length + index < initialData.length) {
						initialData[tempData.length + index] = item
					} else {
						initialData.push(item)
					}
				})

				setData(initialData)

				setFetching(false)
			} catch {
				setFetching(false)
				setHasMore(false)
			}
		},
		[data, fetching, callbackParams] //eslint-disable-line
	)

	useEffect(() => {
		if (callbackParams) {
			setHasMore(true)
			setData([])
			fetchData(1)
		}

		return () => {}
	}, [...renderParams, callbackParams]) //eslint-disable-line

	return (
		<InfiniteScroll
			dataLength={data.length}
			next={fetchData}
			hasMore={hasMore}
			loader={
				<div className='mt-2'>
					<div className='flex items-center justify-center'>
						<SpinnerCircularSplit
							size={35}
							thickness={110}
							color='var(--brand-500)'
							secondaryColor='var(--primary-palette-300)'
						/>
					</div>
				</div>
			}
			style={{ overflow: 'unset' }}
		>
			{listComponent(data)}
		</InfiniteScroll>
	)
}

export default MInfiniteScroll
