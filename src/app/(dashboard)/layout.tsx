import MainLayout from '@/components/Layouts/MainLayout'

interface Props {
	children: React.ReactNode
}

export default function Layout({ children }: Props) {
	return <MainLayout>{children}</MainLayout>
}
