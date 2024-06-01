interface BackdropLayoutProps {
  children: React.ReactNode
}

const BackdropLayout = ({ children }: BackdropLayoutProps) => {
  return <div className="h-full bg-[url('/assets/images/layout/auth-layout.png')]">{children}</div>
}

export default BackdropLayout
