interface QuizzesFooterContainerProps {
  className?: string
  children: React.ReactNode
}

const QuizzesFooterContainer = ({ className, children }: QuizzesFooterContainerProps) => {
  return (
    <div
      className={`flex w-full items-center justify-between gap-3 bg-white p-4 shadow-[-4px_-4px_4px_0_#00000005] ${className}`}
    >
      {children}
    </div>
  )
}

export default QuizzesFooterContainer
