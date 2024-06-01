import { ReactNode } from 'react'

const EmptyLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return children ? (
    children
  ) : (
    <div className='flex items-center justify-center text-xl font-semibold h-screen'>Page Not Found</div>
  )
}

export default EmptyLayout
