import Image from 'next/image'
import { useFormContext } from 'react-hook-form'

import suiIcon from '@/public/assets/icons/create-reward/sui.svg'
import { TReward } from '.'
import Input from '../../common/field/input'

const RewardCard = ({ data }: { data: TReward }) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext()

  return (
    <div className='relative flex flex-col basis-1/3 px-2 items-center gap-4'>
      <Image className='absolute top-0 right-2' src={suiIcon} alt='' />

      <div className='flex flex-col gap-1 items-center'>
        <Image src={data.icon} width={116} height={116} alt='' />

        <h3 className='text-sm leading-[18px] font-semibold text-[#262626]'>Top {data.rank}</h3>
      </div>

      <Input
        className='!py-2 !px-3 !min-h-[34px] text-center'
        control={control}
        {...register(data.name)}
        errors={errors}
        placeholder='Enter token'
        placeholderClassName='!text-sm !leading-[18px] !text-[#A5A5B5] !font-normal'
      />
    </div>
  )
}

export default RewardCard
