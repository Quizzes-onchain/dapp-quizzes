'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

import clockIcon from '@/public/assets/icons/add-question/clock.svg'
import starIcon from '@/public/assets/icons/add-question/star.svg'

import closeIcon from '@/public/assets/icons/create-quizzes/close.svg'
import pencilIcon from '@/public/assets/icons/create-quizzes/pencil.svg'
import uploadImgGif from '@/public/assets/images/add-question/upload-img.gif'
import UploadImageModal from '@/src/components/modal/upload-image-modal'
import Select, { OptionProps } from '../field/select'

type ImageUploaderProps = {
  image: string | null
  setImage: Dispatch<SetStateAction<string | null>>
  timeSelected?: OptionProps | null
  setTimeSelected?: Dispatch<SetStateAction<OptionProps | null>>
  pointSelected?: OptionProps | null
  setPointSelected?: Dispatch<SetStateAction<OptionProps | null>>
}

export const timeSelectedData: OptionProps[] = [
  {
    value: 10,
    label: '10 sec',
    icon: <Image src={clockIcon} width={24} height={24} alt='' />,
  },
  {
    value: 20,
    label: '20 sec',
    icon: <Image src={clockIcon} width={24} height={24} alt='' />,
  },
  {
    value: 30,
    label: '30 sec',
    icon: <Image src={clockIcon} width={24} height={24} alt='' />,
  },
  {
    value: 40,
    label: '40 sec',
    icon: <Image src={clockIcon} width={24} height={24} alt='' />,
  },
  {
    value: 50,
    label: '50 sec',
    icon: <Image src={clockIcon} width={24} height={24} alt='' />,
  },
]

export const pointSelectedData: OptionProps[] = [
  {
    value: 1,
    label: '1 point',
    icon: <Image src={starIcon} width={24} height={24} alt='' />,
  },
  {
    value: 2,
    label: '2 point',
    icon: <Image src={starIcon} width={24} height={24} alt='' />,
  },
  {
    value: 3,
    label: '3 point',
    icon: <Image src={starIcon} width={24} height={24} alt='' />,
  },
  {
    value: 4,
    label: '4 point',
    icon: <Image src={starIcon} width={24} height={24} alt='' />,
  },
  {
    value: 5,
    label: '5 point',
    icon: <Image src={starIcon} width={24} height={24} alt='' />,
  },
]

const ImageUploader = ({
  image,
  setImage,
  timeSelected,
  setTimeSelected,
  pointSelected,
  setPointSelected,
}: ImageUploaderProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const openModal = () => {
    setOpen(true)
  }

  return (
    <div
      className='relative z-10 flex items-center justify-center min-h-60 rounded-xl border border-[#0085DD]'
      onClick={openModal}
    >
      {image && <Image className='rounded-xl' src={image} fill objectFit='cover' alt='' />}
      {!image && (
        <div className='flex flex-col items-center gap-1'>
          <Image className='size-[60px]' src={uploadImgGif} alt='' />

          <p className='text-sm font-semibold text-black'>Add Media</p>
        </div>
      )}
      <div className='absolute inset-0 opacity-0 cursor-pointer' />

      <div className='absolute flex items-center gap-4 bottom-0 left-0 p-4'>
        {timeSelected && setTimeSelected && (
          <Select
            buttonClassName='!px-2 !py-[6px] !bg-[#0085DD1A] !h-9 min-w-[100px] !backdrop-blur-md !ring-0'
            textClassName='!text-white !text-sm !leading-5 !font-medium'
            arrow={false}
            data={timeSelectedData}
            selected={timeSelected}
            setSelected={setTimeSelected}
          />
        )}

        {pointSelected && setPointSelected && (
          <Select
            buttonClassName='!px-2 !py-[6px] !bg-[#FADB141A] !h-9 min-w-[100px] !backdrop-blur-md !ring-0'
            textClassName='!text-[#FADB14] !text-sm !leading-5 !font-medium'
            arrow={false}
            data={pointSelectedData}
            selected={pointSelected}
            setSelected={setPointSelected}
          />
        )}
      </div>

      {image && (
        <div className='absolute  flex items-center bottom-4 right-4 gap-4'>
          <div className='flex size-[30px] cursor-pointer items-center justify-center rounded-full bg-[#0000001A] hover:opacity-75'>
            <Image src={pencilIcon} alt='pencil' />
          </div>

          <div
            className='flex size-[30px] cursor-pointer items-center justify-center rounded-full bg-[#0000001A] hover:opacity-75'
            onClick={(e) => {
              e.stopPropagation()

              setImage(null)
            }}
          >
            <Image src={closeIcon} alt='close' />
          </div>
        </div>
      )}
      <UploadImageModal isOpen={open} setOpen={setOpen} setImage={setImage} />
    </div>
  )
}

export default ImageUploader
