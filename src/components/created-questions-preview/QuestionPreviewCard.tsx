'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { ClockIcon, CloseIcon, StarIcon } from '@/public/assets/icons/common/IconComponent'
import leftChevronIcon from '@/public/assets/icons/common/left-chevron.svg'
import pencilIcon from '@/public/assets/icons/common/pencil.svg'
import trashIcon from '@/public/assets/icons/common/trash.svg'
import { useAppDispatch } from '@/src/hooks/appHook'
import { TQuestionItem, removeQuestion, setFirstAppearQuestionId } from '@/src/store/reducers/question-form.reducer'

type QuestionPreviewCardProps = {
  data: TQuestionItem
  order: number
}

const QuestionPreviewCard = ({ data, order }: QuestionPreviewCardProps) => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const handleEditQuestion = (id: number) => {
    dispatch(setFirstAppearQuestionId(id))

    router.push('/create-quizzes/add-question?edit=true')
  }

  const handleRemoveQuestion = (id: number) => {
    dispatch(removeQuestion(id))
  }

  return (
    <div className='flex flex-col rounded-xl'>
      <div className='flex items-center justify-between p-4 rounded-t-xl bg-gradient-to-tr from-[#00C4FF] to-[#0085DD]'>
        <h3 className='text-sm leaing-[18px] font-semibold text-white'>Question {order}</h3>

        <div className='flex items-center gap-4'>
          <Image
            className='cursor-pointer hover:opacity-75'
            src={pencilIcon}
            alt=''
            onClick={() => handleEditQuestion(data.id)}
          />

          <CloseIcon className='cursor-pointer hover:opacity-75' onClick={() => handleRemoveQuestion(data.id)} />

          <Image
            className='cursor-pointer hover:opacity-75'
            src={trashIcon}
            alt=''
            onClick={() => handleRemoveQuestion(data.id)}
          />
        </div>
      </div>

      <div className='flex flex-col gap-4 p-4 bg-white shadow-[#0000001A] shadow-md rounded-b-xl'>
        <div className='flex flex-col gap-4'>
          <h4 className='text-sm leading-[18px] font-semibold text-[#18191B]'>{data.question}</h4>

          <div className='grid grid-cols-2 gap-3'>
            {data.choices.map((choice, index) => (
              <div key={index} className='flex items-center gap-[10px] p-2 rounded-lg ring-1 ring-[#E3E3E3]'>
                <div className='relative p-[10px] bg-[#0085DD1A] rounded-full size-6 flex items-center justify-center'>
                  <span className='absolute text-sm leading-[18px] font-semibold text-black'>
                    {choice.id.toUpperCase()}
                  </span>
                </div>

                <span className='text-xs leading-[15px] font-normal text-black'>{choice.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='h-px w-full bg-[#E3E3E3]' />

        <div className='w-full flex items-center gap-4'>
          <div className='flex items-center justify-between w-full py-[6px] px-2 border border-[#E3E3E3] rounded-lg bg-white'>
            <div className='flex items-center gap-2'>
              <ClockIcon width={20} height={20} stroke='#18191B' />

              <span className='text-sm font-medium text-[#18191B]'>{data.time} sec</span>
            </div>

            <Image className='rotate-[270deg]' src={leftChevronIcon} width={20} height={20} alt='' />
          </div>

          <div className='flex items-center justify-between w-full py-[6px] px-2 border border-[#E3E3E3] rounded-lg bg-white'>
            <div className='flex items-center gap-2'>
              <StarIcon width={20} height={20} stroke='#18191B' />

              <span className='text-sm font-medium text-[#18191B]'>{data.point} point</span>
            </div>

            <Image className='rotate-[270deg]' src={leftChevronIcon} width={20} height={20} alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionPreviewCard
