interface QuizzesHeaderContainerProps {
  children: React.ReactNode
}

const QuizzesHeaderContainer = ({ children }: QuizzesHeaderContainerProps) => {
  return (
    <div className='flex w-full items-center justify-between bg-white p-4 shadow-[0_4px_6px_-4px_#0000001A]'>
      {children}
    </div>
  )
}

export default QuizzesHeaderContainer
