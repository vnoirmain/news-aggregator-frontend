'use client'

import { Provider } from 'react-redux'
import Modals from '@/components/Modals'
import store from '@/redux/store'

interface Props {
	children: React.ReactNode
}

export default function RootTemplate({ children }: Props) {
	return (
		<Provider store={store}>
			{children}
			<Modals />
		</Provider>
	)
}
