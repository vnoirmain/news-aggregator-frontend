import type { Config } from 'tailwindcss'

const colors = require('tailwindcss/colors')

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			lg: { max: '1024px' },
			md: { max: '896px' },
			sm: { max: '767px' },
			xs: { max: '575px' },
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				background: '#323B54',
				primary: colors.indigo,
				secondary: '',
				modal: '#263040',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
export default config
