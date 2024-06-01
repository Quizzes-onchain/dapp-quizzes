import Image from 'next/image'

type UploadOptionItemProps = {
  iconPath: string
  name: string
  children?: React.ReactNode
}

const UploadOptionItem = ({ iconPath, name, children }: UploadOptionItemProps) => {
  return (
    <div className='relative flex flex-col items-center size-[79px] justify-center gap-3 p-4 rounded-2xl bg-white shadow-md shadow-[#0000001A] cursor-pointer hover:opacity-75'>
      <Image src={iconPath} alt={name} />

      <span className='text-xs leading-[10px] font-semibold text-black'>{name}</span>

      {children}
    </div>
  )
}

export default UploadOptionItem
