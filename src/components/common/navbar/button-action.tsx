interface ButtonActionProps {
  children: React.ReactNode
  Icon?: React.FC<{ active: boolean }> | string
  active: boolean
  onClick: () => void
}

const ButtonAction = ({ children, Icon, active, onClick }: ButtonActionProps) => {
  return (
    <button
      onClick={onClick}
      className='relative flex flex-1 cursor-pointer flex-col items-center gap-[6px] px-3 pb-[9px] pt-[18px] transition-all hover:opacity-75'
    >
      {active && (
        <div className='absolute left-1/2 top-3 -translate-x-1/2 transform'>
          <svg width={18} height={2} viewBox='0 0 18 2' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <line x1='0.5' y1='1.25' x2='17.5' y2='1.25' stroke='#00C4FF' strokeWidth='1.5' />
          </svg>
        </div>
      )}

      {Icon && <Icon active={active} />}
      <div className={`text-[14px] ${active ? 'text-[#0085DD] ' : 'text-[#9DB2CE]'} `}>{children}</div>
    </button>
  )
}
export default ButtonAction
