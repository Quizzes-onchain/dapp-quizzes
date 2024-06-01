import Image from 'next/image'

import bulbIcon from '@/public/assets/icons/modal/bulb.svg'
import plusIcon from '@/public/assets/icons/modal/plus.png'
import sheetIcon from '@/public/assets/icons/modal/sheet.svg'
import thunderIcon from '@/public/assets/icons/modal/thunder.svg'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import BottomContainerModal from './bottom-container-modal'

interface CreateQuizzesModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface OptionItemProps {
  iconPath: string
  title: string
  description: string
  aiAssisted?: boolean
  href: string
}

const optionData: OptionItemProps[] = [
  {
    iconPath: bulbIcon,
    title: 'Question Generator',
    description: 'Question Generator',
    aiAssisted: true,
    href: '/create-quizzes',
  },
  {
    iconPath: sheetIcon,
    title: 'Templates',
    description: 'Pre-made Quizzes on-chain ',
    href: '/create-quizzes',
  },
  {
    iconPath: plusIcon,
    title: 'Blank canvas',
    description: 'Create from scratch',
    href: '/create-quizzes',
  },
]

const CreateQuizzesModal = ({ isOpen, setIsOpen }: CreateQuizzesModalProps) => {
  return (
    <BottomContainerModal isOpen={isOpen} setIsOpen={setIsOpen} title='Create'>
      <div className='flex flex-col gap-4 px-4 pb-6'>
        {optionData.map((option, index) => (
          <Link
            key={index}
            href={option.href}
            className='flex items-center gap-3 rounded-lg bg-[#F8F8F8] p-4 outline-none'
          >
            <Image src={option.iconPath} alt='icon' />

            <div className='flex flex-1 items-center justify-between'>
              <div className='flex flex-col gap-1 '>
                <span className='text-base font-medium leading-5 text-[#18191B]'>{option.title}</span>

                <p className='text-sm font-normal leading-[18px] text-[#A5A5B5]'>{option.description}</p>
              </div>

              {option.aiAssisted && (
                <div className='flex items-center gap-[6px] rounded-md border border-[#E3E3E3] p-[6px]'>
                  <Image src={thunderIcon} alt='thunder' />

                  <span className='text-xs font-normal leading-[15px] text-[#18191B]'>AI assisted</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </BottomContainerModal>
  )
}

export default CreateQuizzesModal
