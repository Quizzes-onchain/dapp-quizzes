'use client'

import Link from 'next/link'
import { useState } from 'react'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import QuizzesFooterContainer from '../common/footer/quizzes-footer-container'
import QuizzesHeaderContainer from '../common/header/quizzes-header-container'
import MainButton from '../common/main-button'
import Nft from './nft'
import Token from './token'

const schema = yup.object({
  firstMedal: yup.string(),
  secondMedal: yup.string(),
  thirdMedal: yup.string(),
  fourthMedal: yup.string(),
  fifthlyMedal: yup.string(),
})

type FormValue = yup.InferType<typeof schema>
type TTabActive = 'token' | 'nft'

const CreateReward = () => {
  const [tabActive, setTabActive] = useState<TTabActive>('token')

  const methods = useForm<FormValue>({
    defaultValues: schema.cast({}),

    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormValue) => {
    if (data) {
      // Call API create reward
    }
  }

  return (
    <FormProvider {...methods}>
      <form onClick={methods.handleSubmit(onSubmit)} className='flex flex-col h-full w-full animate-fade-up'>
        <QuizzesHeaderContainer>
          <Link href='/create-quizzes' className='flex items-center rounded-lg p-3' type='button'>
            <span className='text-sm font-semibold leading-[18px] text-[#A5A5B5]'>Cancel</span>
          </Link>

          <h1 className='text-base font-bold leading-5 text-black'>Reward</h1>

          <button className='flex items-center rounded-lg p-3' type='submit'>
            <span className='text-sm font-semibold leading-[18px] text-[#18191B]'>Save</span>
          </button>
        </QuizzesHeaderContainer>

        <div className='flex-1 flex flex-col gap-8 overflow-auto no-scrollbar p-4'>
          <div className='flex items-center justify-between p-2 rounded-[10px] bg-white shadow-md shadow-[#0000000A]'>
            <button
              className={`flex-1 h-11 flex items-center justify-center rounded-lg p-4 ${tabActive === 'token' ? 'text-white bg-gradient-to-r from-[#00C4FF] to-[#0085DD]' : 'text-black bg-white'}`}
              type='button'
              onClick={() => setTabActive('token')}
            >
              Token
            </button>

            <button
              className={`flex-1 h-11 flex items-center justify-center rounded-lg p-4 ${tabActive === 'nft' ? 'text-white bg-gradient-to-r from-[#00C4FF] to-[#0085DD]' : 'text-black bg-white'}`}
              type='button'
              onClick={() => setTabActive('nft')}
            >
              NFT
            </button>
          </div>

          {tabActive === 'token' ? <Token /> : <Nft />}
        </div>

        <QuizzesFooterContainer className='flex items-center gap-[10px]'>
          <MainButton href='/create-quizzes/add-question' className='relative' type='button' variant='outlined'>
            Skip
          </MainButton>

          <MainButton href='/create-quizzes/add-question' type='submit'>
            Next
          </MainButton>
        </QuizzesFooterContainer>
      </form>
    </FormProvider>
  )
}

export default CreateReward
