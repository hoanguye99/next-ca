import { LayoutProps } from '@/pages/_app'
import MetaHeader from './meta-header'

export function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <MetaHeader />
      {children}
    </>
  )
}
