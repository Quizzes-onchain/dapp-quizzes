import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import QRCode from 'react-qr-code'

import facebookIcon from '@/public/assets/icons/auth/facebook.svg'
import telegramIcon from '@/public/assets/icons/auth/telegram.svg'
import twitchIcon from '@/public/assets/icons/auth/twitch.svg'
import linkIcon from '@/public/assets/icons/share-quizzes/link.svg'
import Input from '@/src/components/common/field/input'

interface IBox {
  title?: string
  bullet?: string
  children?: ReactNode
}

const listShare = [
  { icon: linkIcon, link: '' },
  { icon: facebookIcon, link: '' },
  { icon: telegramIcon, link: '' },
  { icon: twitchIcon, link: '' },
]

const BoxWrap = ({ title, bullet, children }: IBox) => {
  return (
    <div className='bg-[#FFFFFF66] px-4 pt-4 pb-6 flex flex-col items-center gap-6 rounded-lg'>
      <div className='flex items-center gap-3 text-sm leading-[18px] font-medium text-[#18191B] w-full'>
        {bullet && <p className='size-6 flex items-center justify-center bg-[#0000000F] rounded-full'>{bullet}</p>}
        {title}
      </div>
      {children}
    </div>
  )
}

const Share = () => {
  const { register, control, setValue } = useForm({
    defaultValues: {
      code: '',
    },
  })
  const searchParams = useSearchParams()
  const pin = searchParams.get('pin') || ''

  useEffect(() => {
    setValue('code', pin)
  }, [searchParams, setValue, pin])

  return (
    <div className='h-full overflow-auto no-scrollbar'>
      <div className='space-y-6'>
        <BoxWrap title='Scan Qr code' bullet='1'>
          <QRCode value={process.env.NEXT_PUBLIC_APP_HOST + '/leader-board?pin=' + pin} className='size-[150px]' />
        </BoxWrap>

        <BoxWrap title='Enter the participation code' bullet='2'>
          <Input
            {...register('code')}
            control={control}
            placeholder='Participation code'
            classNameInputField='w-full'
            readOnly
            copy
          />
        </BoxWrap>

        <BoxWrap title='Share'>
          <div className='flex items-center gap-4 w-full'>
            {listShare.map((item, index) => (
              <button key={index} className='hover:opacity-80'>
                <Image src={item.icon} alt='item' className='size-8 rounded-full' />
              </button>
            ))}
          </div>
        </BoxWrap>
      </div>
    </div>
  )
}

export default Share
