import { Dispatch, SetStateAction } from 'react'
import { ChoiceProps, IdChoiceQuestion } from '.'

type ChoiceListProps = {
  choiceList: ChoiceProps[]
  setOpenChoiceQuestionModal: Dispatch<SetStateAction<boolean>>
  setIdChoiceModal: Dispatch<SetStateAction<IdChoiceQuestion>>
  handelSetAnswer: (id: string) => void
}

const ChoiceList = ({ choiceList, setOpenChoiceQuestionModal, setIdChoiceModal, handelSetAnswer }: ChoiceListProps) => {
  return (
    <div className='flex flex-col gap-3'>
      {choiceList.map((choice) => (
        <div
          key={choice.id}
          className='flex items-center gap-[10px] border border-[#E3E3E3] rounded-lg p-4'
          onClick={() => {
            setOpenChoiceQuestionModal(true)

            setIdChoiceModal(choice.id)
          }}
        >
          <div className='flex items-center justify-center size-6 rounded-full p-[10px] bg-[#0085DD1A] text-sm leading-[18px] font-semibold text-black'>
            {choice.id.toUpperCase()}
          </div>

          <span className='flex-1 overflow-x-hidden truncate text-sm leading-[18px] font-normal text-black'>
            {choice.value}
          </span>

          <label
            className='relative'
            onClick={(e) => {
              e.stopPropagation()

              handelSetAnswer(choice.id)
            }}
          >
            <input
              className='absolute opacity-0 size-0 [&:checked_+_div]:after:bg-[#00C4FF] [&:checked_+_div]:after:rounded-full [&:checked_+_div]:after:size-3 [&:checked_+_div]:border-[#00C4FF]'
              name='choice'
              type='radio'
              checked={choice.isAns}
              onChange={() => handelSetAnswer(choice.id)}
            />

            {/* Psuedo input */}
            <div className='flex items-center justify-center size-5 border-2 rounded-full border-[#BFBFBF]' />
          </label>
        </div>
      ))}
    </div>
  )
}

export default ChoiceList
