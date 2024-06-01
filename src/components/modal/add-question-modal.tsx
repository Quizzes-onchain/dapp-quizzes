import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import imgIcon from '@/public/assets/icons/add-question/img.svg'
import { ChoiceProps, IdChoiceQuestion } from '../add-question'
import Input from '../common/field/input'
import CenterContainerModal from './center-container-modal'
import UploadImageModal from './upload-image-modal'

const schema = yup.object({
  question: yup.string().required().default(''),
  image: yup.string().default(undefined),
})

type FormValues = yup.Asserts<typeof schema>

type AddQuestionModalProps = {
  id: IdChoiceQuestion
  data: ChoiceProps[]
  setData: Dispatch<SetStateAction<ChoiceProps[]>>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const AddQuestionModal = ({ id, data, setData, isOpen, setIsOpen }: AddQuestionModalProps) => {
  const [openImageModal, setOpenImageModal] = useState<boolean>(false)
  const [image, setImage] = useState<string | null>(null)

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
    control,
  } = useForm<FormValues>({
    defaultValues: schema.cast({}),

    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormValues) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, value: data.question, thumbnail: data.image }
        }

        return item
      })
    )

    setIsOpen(false)
  }

  useEffect(() => {
    if (image) {
      setValue('image', image)
    }
  }, [image, setValue])

  useEffect(() => {
    register('image')
  }, [register])

  useEffect(() => {
    const currentChoiceData = data.find((item) => item.id === id)

    // Update value which is clicked after opening the modal
    setValue('question', currentChoiceData?.value || '')
    setValue('image', currentChoiceData?.thumbnail || undefined)
  }, [data, setValue, id])

  return (
    <CenterContainerModal isOpen={isOpen} setIsOpen={setIsOpen} title='Add question' isTitleCenter>
      <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-4 p-4'>
        <label className='relative flex flex-1 items-center gap-[10px] p-4 border border-[#E3E3E3] rounded-lg'>
          <div className='flex items-center justify-center size-6 rounded-full bg-[#0085DD1A] text-sm leading-[18px] font-medium'>
            {id.toUpperCase()}
          </div>

          <Input
            control={control}
            {...register('question')}
            tabIndex={-1}
            className='!ring-0 !min-h-[18px] !p-0 !rounded-none'
          />

          {errors?.question && (
            <span className='absolute top-full left-0 ml-2 text-sm text-red-500'>{errors?.question.message}</span>
          )}
        </label>

        <div className='relative group' onClick={() => setOpenImageModal(true)}>
          <div className='relative size-14'>
            <Image
              className='group-hover:opacity-75 rounded-lg'
              src={watch('image') ? watch('image') : imgIcon}
              fill
              objectFit='cover'
              alt=''
            />
          </div>
        </div>
      </form>

      <UploadImageModal isOpen={openImageModal} setOpen={setOpenImageModal} setImage={setImage} />
    </CenterContainerModal>
  )
}

export default AddQuestionModal
