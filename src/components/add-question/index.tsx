/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Image, { StaticImageData } from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'

import imgDefaultIcon from '@/public/assets/icons/add-question/img-default.svg'
import bulbIcon from '@/public/assets/icons/common/bulb.svg'
import leftChevronIcon from '@/public/assets/icons/common/left-chevron.svg'
import quizIcon from '@/public/assets/icons/common/quiz.svg'
import sheetIcon from '@/public/assets/icons/common/sheet.svg'
import trueFalseIcon from '@/public/assets/icons/common/true-false.svg'
import plusIcon from '@/public/assets/icons/modal/plus.png'
import { initialChoiceList, initialQuestion, menuOptionData } from '@/src/constant/add-question.constant'
import { QUESTION_FORM } from '@/src/constant/questionForm.constant'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { postQuizOnchain } from '@/src/store/actions/quiz.action'
import { TQuestionItem, addQuestion, resetFormQuestion, setFormData } from '@/src/store/reducers/question-form.reducer'
import { quizServices } from '@/src/store/services/quiz.service'
import { createChecksum, createHashId } from '@/src/utils/lib'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import Input from '../common/field/input'
import Select, { OptionProps } from '../common/field/select'
import QuizzesFooterContainer from '../common/footer/quizzes-footer-container'
import QuizzesHeaderContainer from '../common/header/quizzes-header-container'
import ImageUploader, { pointSelectedData, timeSelectedData } from '../common/image-uploader'
import MainButton from '../common/main-button'
import AddQuestionModal from '../modal/add-question-modal'
import ChoiceList from './choice-list'
import MenuOption from './menu-option'

const schema = yup.object().shape({
  question: yup.string().default(''),
})

type FormValues = yup.Asserts<typeof schema>

export type IdChoiceQuestion = 'a' | 'b' | 'c' | 'd'

export type ChoiceProps = {
  id: IdChoiceQuestion
  value: string
  isAns: boolean
  thumbnail?: string
}

export type MenuOptionItem = {
  value: string
  label: string
  icon: StaticImageData
}

export type SubmitType = 'PREVIEW' | 'ADD' | 'UPDATE' | 'PUBLISH'

export const optionData: OptionProps[] = [
  { value: 'question_blank', label: 'Question Blank', icon: <Image src={sheetIcon} width={20} height={20} alt='' /> },
  {
    value: 'question_generator',
    label: 'Question Generator',
    icon: <Image src={bulbIcon} width={20} height={20} alt='' />,
  },
  { value: 'quiz', label: 'Quiz', icon: <Image src={quizIcon} width={20} height={20} alt='' /> },
  { value: 'true_or_false', label: 'True or False', icon: <Image src={trueFalseIcon} width={20} height={20} alt='' /> },
]

const AddQuestion = () => {
  const questionForm = useAppSelector((state) => state.questionForm)
  const dispatch = useAppDispatch()

  const [selected, setSelected] = useState<OptionProps | null>(null)
  // Data of current question staying
  const [choiceList, setChoiceList] = useState<ChoiceProps[]>(initialChoiceList)
  const [questionThumbnail, setQuestionThumbnail] = useState<string | null>(null)
  const [timeSelected, setTimeSelected] = useState<OptionProps | null>(timeSelectedData[0])
  const [pointSelected, setPointSelected] = useState<OptionProps | null>(pointSelectedData[0])
  const [idChoiceModal, setIdChoiceModal] = useState<IdChoiceQuestion>('a')
  // Current question id which is staying
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(questionForm.firstAppearQuestionId)
  // Creating question data
  const [creatingQuestionData, setCreatingQuestionData] = useState<TQuestionItem>(initialQuestion)
  const [ignoreCreatingQuestionData, setIgnoreCreatingQuestionData] = useState<boolean>(false)
  // Modals's state
  const [openChoiceQuestionModal, setOpenChoiceQuestionModal] = useState<boolean>(false)
  // Loading
  const [postQuizLoading, setPostQuizLoading] = useState<boolean>(false)

  const submitType = useRef<SubmitType>('ADD')
  const firstRender = useRef<boolean>(true)
  const firstRenderEditMode = useRef<boolean>(true)
  const tabContainerRef = useRef<HTMLDivElement | null>(null)
  const tabQuestionListRef = useRef<(HTMLDivElement | null)[]>([])

  const router = useRouter()
  const searchParams = useSearchParams()
  const edit = searchParams.get('edit') || ''

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    control,
  } = useForm<FormValues>({
    defaultValues: schema.cast({}),

    resolver: yupResolver(schema),
  })

  const inputValue = useWatch({ name: 'question', control })

  const handelSetAnswer = (id: string) => {
    const newChoiceList = choiceList.map((choice) => {
      if (choice.id === id) {
        return { ...choice, isAns: true }
      }

      return { ...choice, isAns: false }
    })

    setChoiceList(newChoiceList)
  }

  const handleResetData = () => {
    setChoiceList(initialChoiceList)
    setQuestionThumbnail(null)
    setTimeSelected(timeSelectedData[0])
    setPointSelected(pointSelectedData[0])
    reset()
  }

  const handleFormatCurrentQuestionData = (questionValue: string) => {
    const lastIdQuestion = questionForm.questions[questionForm.questions.length - 1]?.id
    const id = lastIdQuestion ? lastIdQuestion + 1 : 1

    const questionData = {
      id: currentQuestionId === 0 ? id : currentQuestionId,
      question: questionValue,
      choices: choiceList,
      thumbnail: questionThumbnail,
      point: Number(pointSelected?.value),
      time: Number(timeSelected?.value),
    }

    return questionData
  }

  const handlePostQuiz = async (lastQuestion?: TQuestionItem) => {
    let newListQuestion

    const samplePostData = {
      title: '',
      visibility: true,
      image: '',
      questions: [
        {
          question: '',
          image: '',
          time: 0,
          point: 0,
          options: [
            {
              text: '',
              isCorrect: true,
              image: '',
            },
          ],
        },
      ],
    }

    // Add or update question list
    if (lastQuestion && currentQuestionId === 0) {
      newListQuestion = [...questionForm.questions, lastQuestion]
    } else if (lastQuestion && currentQuestionId !== 0) {
      newListQuestion = questionForm.questions.map((question) => {
        if (question.id === currentQuestionId) {
          return lastQuestion
        }
        return question
      })
    } else {
      newListQuestion = questionForm.questions
    }

    samplePostData.title = questionForm.title
    samplePostData.image = questionForm.thumbnail || ''
    samplePostData.visibility = questionForm.visibility === 'public' ? true : false
    samplePostData.questions = newListQuestion.map((question) => {
      return {
        question: question.question,
        image: question.thumbnail || '',
        time: question.time,
        point: question.point,
        options: question.choices.map((choice) => {
          return {
            text: choice.value,
            isCorrect: choice.isAns,
            image: choice.thumbnail || '',
          }
        }),
      }
    })

    setPostQuizLoading(true)
    try {
      const res = await quizServices.postQuiz(samplePostData)
      const resData = res.data?.data

      if (resData) {
        const checksum = createChecksum(resData) as string
        const hashId = createHashId(resData.id) as string

        // Call SMC submit checksum On-chain
        try {
          await dispatch(
            postQuizOnchain({
              hashId,
              title: questionForm.title,
              visibility: questionForm.visibility,
              image: questionForm.thumbnail,
              checksum,
            })
          )
          setPostQuizLoading(false)
          toast.success('Post quiz api successfully')
          dispatch(resetFormQuestion())
          router.push('/quiz-list')
        } catch (error) {
          setPostQuizLoading(false)
          toast.error('Post quiz onchain failed')
        }
      }
    } catch (error) {
      setPostQuizLoading(false)
      toast.error('Post quiz api failed')
    }
  }

  const onSubmit = async (dataSubmit: FormValues) => {
    const questionData = handleFormatCurrentQuestionData(dataSubmit.question)
    if (currentQuestionId !== 0 && !inputValue) {
      setError('question', { type: 'required', message: 'This field is required' })
      return
    }

    switch (submitType.current) {
      case 'ADD':
        if (!inputValue) {
          setError('question', { type: 'required', message: 'This field is required' })
          return
        }
        dispatch(addQuestion(questionData))
        break
      case 'UPDATE':
        dispatch(addQuestion(questionData))
        setIgnoreCreatingQuestionData(false)
        setCurrentQuestionId(0)
        break
      case 'PREVIEW':
        !(!inputValue && currentQuestionId === 0) && dispatch(addQuestion(questionData))
        router.push('/created-questions-preview')
        break
      case 'PUBLISH':
        // Add or update question at the end when publish quiz
        if (!(!inputValue && currentQuestionId === 0)) {
          await handlePostQuiz(questionData)
        } else {
          await handlePostQuiz()
        }
        break
      default:
        break
    }

    if (inputValue) {
      const questionData = handleFormatCurrentQuestionData(dataSubmit.question)
      dispatch(addQuestion(questionData))
    }
    handleResetData()
  }

  const handleSubmitForm = () => {
    handleSubmit(onSubmit)()
  }

  const handleSetCurrentQuestionData = useCallback(
    (question: TQuestionItem | any) => {
      setCurrentQuestionId(question.id)
      setChoiceList(question.choices)
      setQuestionThumbnail(question.thumbnail)
      setValue('question', question.question)
      setTimeSelected(timeSelectedData.find((time) => time.value === question.time) || timeSelectedData[0])
      setPointSelected(pointSelectedData.find((point) => point.value === question.point) || pointSelectedData[0])
    },
    [setValue]
  )

  const handleChangeCurrentQuestionData = (question: TQuestionItem) => {
    // Save creating question data when click to another question
    if (currentQuestionId === 0 && question.id !== 0) {
      setCreatingQuestionData({ ...handleFormatCurrentQuestionData(watch('question')), id: 0 })
    }

    // Restore creating question data when click to creating question
    if (currentQuestionId !== 0 && question.id === 0) {
      handleSetCurrentQuestionData(creatingQuestionData)
    } else {
      handleSetCurrentQuestionData(question)
    }
  }

  const handleChangeCurrentQuestion = (question: TQuestionItem) => {
    if (currentQuestionId !== question.id) {
      const questionData = handleFormatCurrentQuestionData(inputValue)
      if (!inputValue) {
        setError('question', { type: 'required', message: 'This field is required' })
        return
      }
      dispatch(addQuestion(questionData))

      if (currentQuestionId === 0) setIgnoreCreatingQuestionData(true)

      handleChangeCurrentQuestionData(question)
    }
  }

  useEffect(() => {
    // Scroll to end when reload page
    if (firstRender.current && tabQuestionListRef.current[currentQuestionId]) {
      firstRender.current = false

      const timeout = setTimeout(() => {
        tabQuestionListRef.current[currentQuestionId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }, 500)

      return () => clearTimeout(timeout)
    }

    // Scroll to current question
    if (tabQuestionListRef.current[currentQuestionId]) {
      tabQuestionListRef.current[currentQuestionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }, [currentQuestionId])

  // Restore data from localStorage when page refresh
  useEffect(() => {
    if (!questionForm.title) {
      const rawData = localStorage.getItem(QUESTION_FORM)
      const data = rawData && JSON.parse(rawData)

      if (data?.title) {
        dispatch(setFormData(data))
      }
    }
  }, [dispatch, questionForm.title])

  // Set type of question when change question type
  useEffect(() => {
    if (questionForm.currentQuestionType) {
      const selectedOption = optionData.find((option) => option.value === questionForm.currentQuestionType)

      setSelected(selectedOption || null)
    }
  }, [questionForm])

  useEffect(() => {
    // Update question data at the first render in edit mode
    if (edit === 'true' && firstRenderEditMode.current) {
      setIgnoreCreatingQuestionData(true)

      if (questionForm.questions.length) {
        firstRenderEditMode.current = false
        if (currentQuestionId === 0) {
          const lastQuestionId = questionForm.questions[questionForm.questions.length - 1]?.id

          setCurrentQuestionId(lastQuestionId)
        } else {
          // Update question data
          const question = questionForm.questions.find((question) => question.id === currentQuestionId)

          handleSetCurrentQuestionData(question || initialQuestion)
        }
      }

      return
    }

    // Update question data when question id changes
    const question = questionForm.questions.find((question) => question.id === currentQuestionId)

    handleSetCurrentQuestionData(question || initialQuestion)
  }, [currentQuestionId, questionForm, handleSetCurrentQuestionData, edit])

  return (
    <div className='flex h-full w-full flex-col animate-fade-up'>
      <div className='h-full w-full'>
        <div className='flex h-full w-full flex-col'>
          <QuizzesHeaderContainer>
            <Link href='/create-quizzes/create-reward'>
              <Image className='cursor-pointer hover:opacity-75' src={leftChevronIcon} alt='' />
            </Link>

            <Select
              buttonClassName='!h-8 bg-[#0085DD] !px-[6px] ![py-3] !gap-4 !w-fit'
              menuClassName='!w-[200px]'
              textClassName='!text-white'
              chevronProps={{
                stroke: '#FFF',
              }}
              selected={selected}
              setSelected={setSelected}
              data={optionData}
            />

            <MenuOption
              data={menuOptionData}
              currentQuestionId={currentQuestionId}
              setCurrentQuestionId={setCurrentQuestionId}
              ignoreCreatingQuestionData={ignoreCreatingQuestionData}
              setIgnoreCreatingQuestionData={setIgnoreCreatingQuestionData}
              handleSubmitForm={handleSubmitForm}
              handleResetData={handleResetData}
              submitType={submitType}
            />
          </QuizzesHeaderContainer>

          <div className='flex-1 flex flex-col gap-8 px-4 pt-8 overflow-auto no-scrollbar'>
            <ImageUploader
              timeSelected={timeSelected}
              pointSelected={pointSelected}
              setTimeSelected={setTimeSelected}
              setPointSelected={setPointSelected}
              image={questionThumbnail}
              setImage={setQuestionThumbnail}
            />

            <div className='flex flex-col gap-6'>
              <Input
                {...register('question')}
                errors={errors}
                placeholderClassName='!from-white !via-white !to-white'
                placeholder='Add question'
                control={control}
                onChange={(e) => {
                  if (e.target.value) clearErrors('question')

                  register('question').onChange(e)
                }}
              />

              <ChoiceList
                choiceList={choiceList}
                setOpenChoiceQuestionModal={setOpenChoiceQuestionModal}
                setIdChoiceModal={setIdChoiceModal}
                handelSetAnswer={handelSetAnswer}
              />
            </div>
          </div>

          <div className='flex flex-col'>
            <QuizzesFooterContainer>
              <div ref={tabContainerRef} className='flex flex-1 overflow-x-auto no-scrollbar item-center gap-3'>
                {(ignoreCreatingQuestionData
                  ? [...questionForm.questions]
                  : [...questionForm.questions, creatingQuestionData]
                ).map((question, index) => (
                  <div
                    key={index}
                    className={`relative flex justify-center items-center rounded-lg border-2 p-[10px] min-h-[76px] min-w-[116px] overflow-hidden ${currentQuestionId === question.id ? 'border-[#0085DD]' : 'border-[#E3E3E3] cursor-pointer hover:opacity-75'}`}
                    ref={(el: any) => (tabQuestionListRef.current[question.id] = el)}
                    onClick={() => handleChangeCurrentQuestion(question)}
                  >
                    {question?.thumbnail ? (
                      <Image className='' src={String(question.thumbnail)} fill objectFit='cover' alt='' />
                    ) : (
                      <Image src={imgDefaultIcon} alt='' />
                    )}

                    <div className='absolute flex items-center justify-center p-[5px] size-5 bg-[#0085DD1A] rounded-full text-xs leading-[10px] font-semibold text-[#18191B] m-[10px] top-0 left-0'>
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>

              <Image
                className='cursor-pointer hover:opacity-75'
                src={plusIcon}
                alt=''
                onClick={() => {
                  if (currentQuestionId !== 0) submitType.current = 'UPDATE'
                  else submitType.current = 'ADD'

                  handleSubmitForm()

                  const timeout = setTimeout(() => {
                    tabQuestionListRef.current[0]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                      inline: 'center',
                    })
                    clearTimeout(timeout)
                  }, 300)
                }}
              />
            </QuizzesFooterContainer>

            <QuizzesFooterContainer className='!shadow-none'>
              <MainButton
                type='button'
                disabled={postQuizLoading}
                onClick={() => {
                  submitType.current = 'PUBLISH'
                  handleSubmitForm()
                }}
              >
                {postQuizLoading ? 'Loading...' : 'Publish'}
              </MainButton>
            </QuizzesFooterContainer>
          </div>
        </div>
      </div>

      <AddQuestionModal
        isOpen={openChoiceQuestionModal}
        setIsOpen={setOpenChoiceQuestionModal}
        data={choiceList}
        setData={setChoiceList}
        id={idChoiceModal}
      />
    </div>
  )
}

export default AddQuestion
