/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import { FocusEvent, forwardRef, useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'

import checkIcon from '@/public/assets/icons/common/check.svg'
import copyIcon from '@/public/assets/icons/common/copy.svg'
import eyeCloseIcon from '@/public/assets/icons/common/eye-close.svg'
import eyeOpenIcon from '@/public/assets/icons/common/eye-open.svg'
import { toast } from 'react-toastify'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameInputField?: string
  placeholder?: string
  placeholderClassName?: string
  errors?: any
  control: any
  type?: string
  copy?: boolean
}

const placeholderClass = '[&_~_p]:top-0 [&_~_p]:text-sm [&_~_p]:ml-2'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ classNameInputField, placeholder, placeholderClassName, errors, control, type, copy, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [copySuccess, setCopySuccess] = useState<boolean>(false)

    const value = useWatch({
      control: control,
      name: props?.name || '',
    })

    const movePlaceholderOnTop = (e: FocusEvent<HTMLInputElement>) => {
      e.currentTarget.classList.add(...placeholderClass.split(' '))
    }

    const movePlaceholderBelow = (e: FocusEvent<HTMLInputElement>) => {
      if (e.currentTarget.value === '') {
        e.currentTarget.classList.remove(...placeholderClass.split(' '))
      }
    }

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopySuccess(true)
      } catch (error) {
        toast.error('Failed to copy')
      }
    }

    useEffect(() => {
      if (copySuccess) {
        const timeout = setTimeout(() => {
          setCopySuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
      }
    }, [copySuccess])

    // Handle placeholder position when changing value
    useEffect(() => {
      const input = document.querySelector(`input[name="${props?.name}"]`)
      if (value && input) {
        input.classList.add(...placeholderClass.split(' '))
      } else if (input) {
        input.classList.remove(...placeholderClass.split(' '))
      }
    }, [value, props?.name])

    return (
      <div className={`relative flex flex-col gap-1 ${classNameInputField}`}>
        <div className='relative flex items-center gap-2'>
          <input
            {...props}
            type={showPassword ? 'text' : type || 'text'}
            ref={ref}
            className={`min-h-[52px] w-full rounded-lg py-4 pl-4 ring-1 ring-[#E3E3E3] bg-transparent focus:outline-none ${type === 'password' || copy ? 'pr-12' : 'pr-4'} ${props?.className}`}
            onFocus={(e) => {
              movePlaceholderOnTop(e)

              props?.onFocus?.(e)
            }}
            onBlur={(e) => {
              movePlaceholderBelow(e)

              props?.onBlur?.(e)
            }}
          />

          <p
            className={`pointer-events-none absolute top-[50%] ml-3 -translate-y-[50%] bg-gradient-to-b from-transparent via-white/50 to-transparent px-2 text-base font-medium text-[#898989] transition-all duration-300 ${placeholderClassName}`}
          >
            {placeholder}
          </p>
        </div>

        {type === 'password' && (
          <Image
            className='right-4 top-[50%] -translate-y-[50%] absolute cursor-pointer hover:opacity-70'
            src={showPassword ? eyeOpenIcon : eyeCloseIcon}
            width={24}
            height={24}
            alt='eye'
            onClick={() => setShowPassword(!showPassword)}
          />
        )}

        {copy && (
          <Image
            className='right-4 top-[50%] -translate-y-[50%] absolute cursor-pointer hover:opacity-70'
            src={copySuccess ? checkIcon : copyIcon}
            width={24}
            height={24}
            alt='copy'
            onClick={handleCopy}
          />
        )}

        {errors?.[String(props?.name)] && (
          <span className='text-sm text-red-500'>{errors?.[String(props?.name)].message}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
