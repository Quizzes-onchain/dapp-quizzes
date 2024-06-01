import closeIcon from '@/public/assets/icons/common/close.svg'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Dispatch, Fragment, SetStateAction } from 'react'

interface CenterContainerModalProps {
  isTitleCenter?: boolean
  title: string | React.ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

const CenterContainerModal = ({ isTitleCenter, title, isOpen, setIsOpen, children }: CenterContainerModalProps) => {
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed flex items-center justify-center inset-0 overflow-y-auto'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel
              className='flex w-full max-w-[calc(414px_-_32px)] mx-4 flex-col gap-4 rounded-2xl pb-6 bg-white'
              onClick={(e) => e.stopPropagation()}
            >
              <Dialog.Title className='flex items-center justify-between rounded-2xl p-4'>
                {isTitleCenter && <div className='w-6 h-1' />}

                <span className='text-base font-semibold leading-5 text-black'>{title}</span>

                <Image className='cursor-pointer hover:opacity-75' src={closeIcon} alt='close' onClick={closeModal} />
              </Dialog.Title>

              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CenterContainerModal
