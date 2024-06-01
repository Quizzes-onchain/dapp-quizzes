import { Dispatch, SetStateAction, useEffect } from 'react'

type TCounter = {
  time: number
  setTime: Dispatch<SetStateAction<number>>
}

const useCounter = ({ time, setTime }: TCounter) => {
  useEffect(() => {
    if (time > 0) {
      const timeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [time, setTime])
}

export default useCounter
