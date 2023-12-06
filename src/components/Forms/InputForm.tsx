import { useId } from 'react'
import { cx } from 'helpers/classNames'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	label?: string
	input?: any
	meta?: any
}

export default function InputForm({ className, label, input, meta, ...props }: Props) {
	const id = useId()

	return (
		<div className={cx(className)}>
			{label && (
				<label htmlFor={id} className='mb-1 block text-base'>
					{label}
				</label>
			)}
			<input
				type='text'
				className='w-full rounded px-2 py-1.5 text-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-indigo-500'
				id={id}
				{...input}
				{...props}
			/>
		</div>
	)
}
