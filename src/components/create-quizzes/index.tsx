'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { QUESTION_FORM as QUESTIONFORMCONST } from '@/src/constant/questionForm.constant'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { setFormData } from '@/src/store/reducers/question-form.reducer'
import Input from '../common/field/input'
import QuizzesHeaderContainer from '../common/header/quizzes-header-container'
import ImageUploader from '../common/image-uploader'
import MainButton from '../common/main-button'

const schema = yup.object({
  title: yup.string().required('title is required').default(''),
  visibility: yup.string().required('visibility is required').default('public'),
})

type FormValues = yup.InferType<typeof schema>
type TVisibility = 'public' | 'private'

const CreateQuizzes = () => {
  const [questionThumbnail, setQuestionThumbnail] = useState<string | null>(null)
  const [tabActive, setTabActive] = useState<TVisibility>('public')

  const questionForm = useAppSelector((state) => state.questionForm)
  const dispatch = useAppDispatch()

  const router = useRouter()

  const {
    formState: { errors },
    register,
    unregister,
    handleSubmit,
    setValue,
    control,
  } = useForm<FormValues>({
    defaultValues: schema.cast({}),

    resolver: yupResolver(schema),
  })

  const handleVisibility = (visibility: TVisibility) => {
    setValue('visibility', visibility)
    setTabActive(visibility)
  }

  const onSubmit = (data: FormValues) => {
    const formData = {
      title: data.title,
      visibility: data.visibility,
      thumbnail: questionThumbnail,
    }

    const formattedFormData = {
      ...questionForm,
      ...formData,
    }

    dispatch(setFormData(formattedFormData))

    router.push('/create-quizzes/create-reward')
  }

  useEffect(() => {
    setValue('title', questionForm.title)
    setQuestionThumbnail(questionForm.thumbnail || '')
    setValue('visibility', questionForm.visibility)
    setTabActive(questionForm.visibility as TVisibility)
  }, [questionForm, setValue])

  // Restore data from localStorage when page refresh
  useEffect(() => {
    if (!questionForm.title) {
      const rawData = localStorage.getItem(QUESTIONFORMCONST)
      const data = rawData && JSON.parse(rawData)

      if (data?.title) {
        dispatch(setFormData(data))
      }
    }
  }, [dispatch, questionForm.title])

  useEffect(() => {
    register('visibility')

    return () => unregister('visibility')
  }, [register, unregister])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex h-full w-full flex-col animate-fade-up'>
      <QuizzesHeaderContainer>
        <Link href='/leader-board' className='flex items-center rounded-lg p-3' type='button'>
          <span className='text-sm font-semibold leading-[18px] text-[#A5A5B5]'>Cancel</span>
        </Link>

        <h1 className='text-base font-bold leading-5 text-black'>Create Quizzes on-chain</h1>

        <button className='flex items-center rounded-lg p-3' type='submit'>
          <span className='text-sm font-semibold leading-[18px] text-[#18191B]'>Save</span>
        </button>
      </QuizzesHeaderContainer>

      <div className='no-scrollbar flex-1 overflow-auto'>
        <div className='flex flex-col gap-8 px-4 py-8'>
          <ImageUploader image={questionThumbnail} setImage={setQuestionThumbnail} />

          <div className='flex flex-col gap-4'>
            <Input {...register('title')} control={control} errors={errors} placeholder='Title' />

            <div className='flex flex-col gap-2'>
              <p className='px-3 text-sm tracking-tight font-medium text-[#898989]'>Visibility</p>

              <div className='flex items-center justify-between p-2 rounded-[10px] bg-white shadow-md shadow-[#0000000A]'>
                <button
                  className={`flex-1 h-11 flex items-center justify-center rounded-lg p-4 ${tabActive === 'public' ? 'text-white bg-gradient-to-r from-[#00C4FF] to-[#0085DD]' : 'text-black bg-white'}`}
                  type='button'
                  onClick={() => handleVisibility('public')}
                >
                  Public
                </button>

                <button
                  className={`flex-1 h-11 flex items-center justify-center rounded-lg p-4 ${tabActive === 'private' ? 'text-white bg-gradient-to-r from-[#00C4FF] to-[#0085DD]' : 'text-black bg-white'}`}
                  type='button'
                  onClick={() => handleVisibility('private')}
                >
                  Private
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between bg-white p-4 shadow-[-4px_-4px_4px_0_#00000005]'>
        <MainButton onClick={() => {}}>Next</MainButton>
      </div>
    </form>
  )
}

export default CreateQuizzes
