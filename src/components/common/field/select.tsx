'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown } from '@/public/assets/icons/common/IconComponent'
import { Listbox, Transition } from '@headlessui/react'
import React, { Dispatch, Fragment, SVGProps, SetStateAction, useEffect } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

interface OptionProps {
  value: string | number
  label: string
  icon?: React.ReactNode
}

type Position = 'top' | 'bottom'

interface SelectProps {
  data: OptionProps[]
  placeholder?: string
  buttonClassName?: string
  menuClassName?: string
  menuItemClassName?: string
  textClassName?: string
  chevronProps?: SVGProps<SVGSVGElement>
  position?: Position
  errors?: any
  name?: string
  arrow?: boolean
  register?: UseFormRegister<any>
  setValue?: UseFormSetValue<any>
  selected: OptionProps | null
  setSelected: Dispatch<SetStateAction<OptionProps | null>>
}

const Select = ({
  data,
  placeholder,
  buttonClassName,
  menuClassName,
  menuItemClassName,
  textClassName,
  chevronProps,
  position = 'bottom',
  errors,
  name,
  arrow = true,
  register,
  setValue,
  selected,
  setSelected,
}: SelectProps) => {
  useEffect(() => {
    register?.(name || '')
  }, [register, name])

  return (
    <>
      <Listbox
        as='div'
        className={`relative w-full flex items-center justify-center`}
        value={selected}
        onChange={(value) => {
          setSelected(value)

          setValue?.(name || '', value?.value)
        }}
      >
        {({ open }) => (
          <>
            <Listbox.Button
              className={`relative flex h-[52px] w-full items-center justify-between rounded-lg p-4 text-left ring-1 ring-[#E3E3E3] focus:outline-none ${buttonClassName}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex items-center gap-2'>
                {selected?.icon}

                {selected?.value && (
                  <p className={`text-sm font-normal line-clamp-1 leading-[18px] text-black ${textClassName}`}>
                    {selected?.label}
                  </p>
                )}
              </div>

              {arrow && (
                <ChevronDown
                  className={`${open && 'rotate-180'} duration-300 transition-transform`}
                  {...chevronProps}
                />
              )}

              <p
                className={`pointer-events-none absolute -translate-y-[50%] bg-gradient-to-b from-transparent via-white/50 to-transparent px-2 text-base font-medium text-[#898989] transition-all duration-300 ${selected?.value ? 'top-0 -ml-2 text-sm' : 'top-[50%] -ml-1'}`}
              >
                {placeholder}
              </p>
            </Listbox.Button>

            <Transition
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-100'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Listbox.Options
                className={`absolute z-50  min-w-fit w-full rounded-lg bg-white py-2 shadow-md focus:outline-none ${position === 'top' ? 'bottom-full mb-2' : ' top-full mt-1'} ${menuClassName}`}
              >
                {data.map((option, index) => (
                  <Listbox.Option value={option} key={index} onClick={(e) => e.stopPropagation()}>
                    <div
                      className={`flex items-center gap-2 cursor-pointer whitespace-nowrap p-2 hover:bg-slate-200 ${selected?.value === option.value && 'bg-slate-200'} ${menuItemClassName}`}
                    >
                      {option?.icon}

                      {option.label}
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>

      {errors?.[String(name)] && !selected?.value && (
        <span className='text-sm text-red-500'>{errors?.[String(name)].message}</span>
      )}
    </>
  )
}

export type { OptionProps }
export default Select
