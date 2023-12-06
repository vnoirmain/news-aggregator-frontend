import { useEffect, useId, useState } from 'react'
import { Icon } from '@iconify/react'
import { cx } from '@/helpers/classNames'
import useClickOutside from '@/hooks/useClickOutside'

interface Props {
	className?: string
	label?: string
	options: { label: string; value: any; [key: string]: any }[]
	placeholder: string
	input?: any
	meta?: any
}

const SelectForm: React.FC<Props> = ({ className, label, options, placeholder, input }) => {
	const id = useId()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const ref = useClickOutside(() => setIsOpen(false))

	useEffect(() => {
		if (input.value) {
			const index = options.findIndex((option) => option.value === input.value)
			index === -1 && input.onChange('')
		}
	}, [input, options])

	const handleSelect = (value: any) => {
		input.onChange(value)
		setIsOpen(false)
	}

	return (
		<div className={cx(className)}>
			{label && (
				<label htmlFor={id} className='mb-1 block text-sm'>
					{label}
				</label>
			)}
			<div className='relative' ref={ref}>
				<div
					className='flex cursor-pointer items-center justify-between gap-2 rounded px-3 py-2 ring-1 ring-gray-500'
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<span className='overflow-hidden text-ellipsis whitespace-nowrap text-sm'>
						{options.find((option) => option.value === input.value)?.label || (
							<span className='text-gray-400'>{placeholder || 'Please select'}</span>
						)}
					</span>
					<Icon icon='system-uicons:chevron-down' className={cx(isOpen ? 'rotate-180' : '')} height={20} />
				</div>
				<div
					className={cx(
						'absolute -bottom-2 z-10 max-h-60 w-full translate-y-full cursor-pointer overflow-hidden overflow-y-auto rounded bg-background py-1 ring-1 ring-gray-500 transition',
						isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
					)}
				>
					{options.map((option, i) => (
						<div
							className='overflow-hidden text-ellipsis whitespace-nowrap px-3 py-2 text-sm hover:bg-gray-600'
							key={i}
							onClick={() => handleSelect(option.value)}
						>
							{option.label}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default SelectForm
