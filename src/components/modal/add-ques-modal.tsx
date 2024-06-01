import quizIcon from '@/public/assets/icons/common/quiz.svg'
import bulbIcon from '@/public/assets/icons/modal/bulb.svg'
import sheetIcon from '@/public/assets/icons/modal/sheet.svg'
import { useAppDispatch } from '@/src/hooks/appHook'
import { setQuestionType } from '@/src/store/reducers/question-form.reducer'
import Image from 'next/image'
import { Dispatch, MouseEvent, SetStateAction } from 'react'
import BottomContainerModal from './bottom-container-modal'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onClick?: (e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, type?: string) => void
}

const listQues1 = [
  { title: 'Question Bank', icon: sheetIcon, type: 'question_blank' },
  { title: 'Question Generator', icon: bulbIcon, type: 'question_generator' },
]

const listQues2 = [
  { title: 'Quiz', icon: quizIcon, type: 'quiz' },
  { title: 'True or False', icon: quizIcon, type: 'true_or_false' },
]

const AddQuesModal = ({ isOpen, setIsOpen, onClick }: Props) => {
  const dispatch = useAppDispatch()

  const handleSetTypeButton = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, type: string) => {
    onClick?.(e, type)
    dispatch(setQuestionType(type))

    setIsOpen(false)
  }

  return (
    <BottomContainerModal isOpen={isOpen} setIsOpen={setIsOpen} title='Add Question'>
      <div className='space-y-6 p-4'>
        <div className='flex items-center gap-2'>
          {listQues1.map((ques) => (
            <button
              type='button'
              style={{ background: 'linear-gradient(94.88deg, #00C4FF 0%, #0085DD 100%)' }}
              key={ques.title}
              className='p-4 flex flex-col items-center gap-4 rounded-xl flex-1'
              onClick={(e) => {
                handleSetTypeButton(e, ques.type)
              }}
            >
              <Image src={ques.icon} alt='icon' className='h-8 w-auto' />
              <p className='text-sm leading-[18px] font-medium text-white'>{ques.title}</p>
            </button>
          ))}
        </div>

        <div className='space-y-4'>
          <p className='text-base leading-5 font-semibold text-[#18191B]'>Test knowledge</p>
          <div className='flex items-center gap-4'>
            {listQues2.map((ques) => (
              <button
                key={ques.title}
                type='submit'
                className='p-4 flex flex-col items-center gap-3 rounded-lg flex-1 border border-[#E3E3E3]'
                onClick={(e) => {
                  handleSetTypeButton(e, ques.type)
                }}
              >
                <Image src={ques.icon} alt='icon' className='h-8 w-auto' />
                <p className='text-sm leading-[18px] font-medium text-[#18191B]'>{ques.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </BottomContainerModal>
  )
}

export default AddQuesModal
