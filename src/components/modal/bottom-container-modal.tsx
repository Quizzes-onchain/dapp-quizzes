import closeIcon from '@/public/assets/icons/common/close.svg'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Dispatch, Fragment, SetStateAction } from 'react'

interface BottomContainerModalProps {
  title: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

const BottomContainerModal = ({ title, isOpen, setIsOpen, children }: BottomContainerModalProps) => {
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

        <div className='fixed inset-0 overflow-y-hidden'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-200'
            enterFrom='opacity-0 translate-y-[50%]'
            enterTo='opacity-100 translate-y-0'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-[50%]'
          >
            <Dialog.Panel className='absolute bottom-0 left-[50%] w-full max-w-[414px] -translate-x-[50%] rounded-t-2xl bg-white'>
              <Dialog.Title className='flex items-center justify-between rounded-2xl p-4'>
                <div className='w-6 h-1' />

                <p className='text-base font-semibold leading-5 text-black'>{title}</p>

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

export default BottomContainerModal
