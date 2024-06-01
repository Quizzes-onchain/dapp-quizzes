import Link from 'next/link'

interface IProps {
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  disabled?: boolean
  className?: string
  href?: string
  variant?: 'outlined' | 'contained'
  onClick?: () => void
}
const MainButton = ({ type, children, disabled, className, href, variant = 'contained', onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${disabled ? 'opacity-75 ' : 'hover:opacity-85 '} relative w-full rounded-lg px-6 py-3 text-sm leading-[18px] font-medium ${variant === 'contained' ? 'bg-gradient-to-r from-[#00C4FF] to-[#0085DD] text-white' : ''} ${variant === 'outlined' ? 'bg-white text-[#262626] border border-[#E3E3E3]' : ''} ${className}`}
    >
      {children}

      {href && <Link className='absolute inset-0' href={href} />}
    </button>
  )
}

export default MainButton
