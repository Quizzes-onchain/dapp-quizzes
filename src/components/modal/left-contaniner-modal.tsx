import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction } from 'react'

interface LeftContainerModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

const LeftContainerModal = ({ isOpen, setIsOpen, children }: LeftContainerModalProps) => {
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='flex justify-center w-full items-center z-20' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed max-w-[414px] bottom-0 top-0 bg-black/25 h-screen w-full' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-hidden overflow-x-hidden'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-200'
            enterFrom='translate-x-[-30%] opacity-0'
            enterTo='translate-x-0 opacity-1'
            leave='ease-in duration-200'
            leaveFrom='translate-x-0 opacity-1'
            leaveTo='translate-x-[-30%] opacity-0'
          >
            <Dialog.Panel className='absolute right-[50%] w-full pl-4 sm:px-0 translate-x-[97px] max-w-[305px] h-full bg-white'>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default LeftContainerModal
