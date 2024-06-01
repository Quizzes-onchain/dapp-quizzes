'use client'

import { Rings } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Rings
        visible={true}
        height={120}
        width={120}
        color='#0085DD'
        ariaLabel='rings-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  )
}

export default Loading
