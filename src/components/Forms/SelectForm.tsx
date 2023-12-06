import { useId, useState } from 'react'
import { Icon } from '@iconify/react'
import { cx } from 'helpers/classNames'
import useClickOutside from 'hooks/useClickOutside'

interface Props {
	className?: string
	label?: string
	options: { label: string; value: any; [key: string]: any }[]
	input?: any
	meta?: any
}

export default function SelectForm({ className, label, options, input, meta }: Props) {
	const id = useId()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const ref = useClickOutside(() => setIsOpen(false))

	const handleSelect = (value: any) => {
		input.onChange(value)
		setIsOpen(false)
	}

	return (
		<div className={cx(className)}>
			{label && <label htmlFor={id}>{label}</label>}
			<div className='relative' ref={ref}>
				<div
					className='flex cursor-pointer items-center justify-between rounded px-2 py-1.5 ring-1 ring-gray-500'
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<span className='text-sm'>
						{options.find((option) => option.value === input.value)?.label ?? 'Please select'}
					</span>
					<Icon icon='system-uicons:chevron-down' className={cx(isOpen ? 'rotate-180' : '')} height={20} />
				</div>
				<div
					className={cx(
						'absolute -bottom-2 w-full translate-y-full cursor-pointer overflow-hidden rounded py-1 ring-1 ring-gray-500 transition',
						isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
					)}
				>
					{options.map((option, i) => (
						<div className='px-2 py-1.5 text-sm hover:bg-gray-200' key={i} onClick={() => handleSelect(option.value)}>
							{option.label}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
