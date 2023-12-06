import { useId } from 'react'
import { cx } from '@/helpers/classNames'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	label?: string
	input?: any
	meta?: any
}

const InputForm: React.FC<Props> = ({ className, label, input, ...props }) => {
	const id = useId()

	return (
		<div className={cx(className)}>
			{label && (
				<label htmlFor={id} className='mb-1 block text-sm'>
					{label}
				</label>
			)}
			<input
				type='text'
				className='w-full rounded px-3 py-2 text-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-primary-300'
				id={id}
				{...input}
				{...props}
			/>
		</div>
	)
}

export default InputForm
