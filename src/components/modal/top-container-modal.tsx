import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction } from 'react'

interface TopContainerModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

const TopContainerModal = ({ isOpen, setIsOpen, children }: TopContainerModalProps) => {
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='flex justify-center z-20' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed max-w-[414px] bottom-0 top-[72px] bg-black/25 h-screen w-full' />
        </Transition.Child>

        <div className='fixed flex w-screen top-[72px] items-center justify-center p-4'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-200'
            enterFrom='translate-y-[-20%]'
            enterTo=' translate-y-0'
            leave='ease-in duration-500'
            leaveFrom=' translate-y-0'
            leaveTo=' translate-y-[-250%]'
          >
            <Dialog.Panel className='absolute top-0 left-[50%] w-full max-w-[414px] -translate-x-[50%] rounded-b-2xl bg-white'>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TopContainerModal
