import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Dispatch, Fragment, MutableRefObject, SetStateAction } from 'react'

import etcIcon from '@/public/assets/icons/common/etc.svg'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { removeQuestion } from '@/src/store/reducers/question-form.reducer'
import { MenuOptionItem, SubmitType } from '.'

type MenuOptionProps = {
  data: MenuOptionItem[]
  handleSubmitForm: () => void
  currentQuestionId: number
  setCurrentQuestionId: Dispatch<SetStateAction<number>>
  ignoreCreatingQuestionData: boolean
  setIgnoreCreatingQuestionData: Dispatch<SetStateAction<boolean>>
  handleResetData: () => void
  submitType: MutableRefObject<SubmitType>
}

const MenuOption = ({
  data,
  handleSubmitForm,
  currentQuestionId,
  setCurrentQuestionId,
  ignoreCreatingQuestionData,
  setIgnoreCreatingQuestionData,
  handleResetData,
  submitType,
}: MenuOptionProps) => {
  const questionForm = useAppSelector((state) => state.questionForm)
  const dispatch = useAppDispatch()

  const handleSetOption = (value: string) => {
    switch (value) {
      case 'preview':
        submitType.current = 'PREVIEW'
        handleSubmitForm()
        break
      case 'delete':
        if (currentQuestionId === 0) {
          const lastQuestionId = questionForm.questions[questionForm.questions.length - 1]?.id

          if (!questionForm.questions.length) {
            handleResetData()

            return
          }

          setIgnoreCreatingQuestionData(true)
          setCurrentQuestionId(lastQuestionId)
        } else {
          const currentIndexQuestion = questionForm.questions.findIndex((question) => question.id === currentQuestionId)
          const nextQuestionId = questionForm.questions[currentIndexQuestion + 1]?.id
          const preQuestionId = questionForm.questions[currentIndexQuestion - 1]?.id

          // Handle set current question id which is showing
          if (!nextQuestionId) {
            if (!ignoreCreatingQuestionData) {
              setCurrentQuestionId(0)
            } else if (preQuestionId) {
              setCurrentQuestionId(preQuestionId)
            } else {
              handleResetData()
              setIgnoreCreatingQuestionData(false)
            }
          } else {
            setCurrentQuestionId(nextQuestionId)
          }

          dispatch(removeQuestion(currentQuestionId))
        }
        break
      default:
        break
    }
  }
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button>
        <Image className='hover:opacity-75' src={etcIcon} alt='' />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute top-full right-0 z-20 bg-white mt-4 p-2 border border-[#E3E3E3] rounded-lg min-w-[156px] shadow-[0_4px_6px_-4px_#0000001A]'>
          {data.map((item, index) => (
            <Menu.Item
              key={index}
              as='div'
              className='flex items-center gap-2 p-3 cursor-pointer rounded-lg hover:bg-slate-200'
              onClick={() => {
                handleSetOption(item.value)
              }}
            >
              <Image src={item.icon} alt='' />

              <span className='text-sm leading-[18px] font-normal text-[#18191B]'>{item.label}</span>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default MenuOption
