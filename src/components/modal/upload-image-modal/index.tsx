import { Dialog, Transition } from '@headlessui/react'
import Image, { StaticImageData } from 'next/image'
import { ChangeEvent, Dispatch, Fragment, SetStateAction } from 'react'
import { toast } from 'react-toastify'

import closeIcon from '@/public/assets/icons/common/close.svg'
import cameraIcon from '@/public/assets/icons/upload-image/camera.svg'
import imageIcon from '@/public/assets/icons/upload-image/image.svg'
import pencilIcon from '@/public/assets/icons/upload-image/pencil.svg'
import bitCoin from '@/public/assets/images/upload-image/bitcoin.png'
import blockchain from '@/public/assets/images/upload-image/blockchain.jpg'
import buffalo from '@/public/assets/images/upload-image/buffalo.png'
import coinTransaction from '@/public/assets/images/upload-image/coin-transaction.png'
import crm from '@/public/assets/images/upload-image/crm.png'
import sui from '@/public/assets/images/upload-image/sui.png'
import temple from '@/public/assets/images/upload-image/temple.png'
import tivi from '@/public/assets/images/upload-image/tivi.png'
import transactionProcedure from '@/public/assets/images/upload-image/transaction-procedure.png'
import web3 from '@/public/assets/images/upload-image/web3.png'
import { imageServices } from '@/src/store/services/image.service'
import QuizzesHeaderContainer from '../../common/header/quizzes-header-container'
import UploadOptionItem from './upload-option-item'

const imageSamples = [bitCoin, blockchain, buffalo, coinTransaction, crm, sui, temple, tivi, transactionProcedure, web3]

type UploadImageModalProps = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setImage: Dispatch<SetStateAction<string | null>>
}

const UploadImageModal = ({ isOpen, setOpen, setImage: setImage }: UploadImageModalProps) => {
  const closeModal = () => {
    setOpen(false)
  }

  const checkImageType = (file: File) => {
    const imageTypes = ['png', 'jpeg', 'jpg', 'gif']
    const nameItems = file.name.split('.')
    const type = nameItems[nameItems.length - 1]

    return imageTypes.includes(type.toLowerCase())
  }

  const uploadImage = async (file: File) => {
    if (!checkImageType(file)) {
      toast.error('Invalid image file type')

      return
    }

    try {
      if (file) {
        const fileData = new FormData()
        fileData.append('file', file)
        const res = await imageServices.postImage(fileData)
        const previewImage = res.data?.data?.imageUrl

        if (previewImage) {
          setImage(previewImage)
        }
      }
    } catch (error) {
      toast.error('Upload image failed')
    }
  }

  const hanldeSetImageFile = async (e: ChangeEvent<HTMLInputElement>) => {
    uploadImage(e.target.files?.[0] as File)

    closeModal()
  }

  const convertStaticImageToFile = async (staticImage: StaticImageData) => {
    // Fetch the image data
    const imageData = await fetch(staticImage.src).then((response) => response.blob())

    // Create a File object from the image data
    const file = new File([imageData], staticImage.src.split('/').pop() || '/', {
      type: staticImage.src.split('.').pop(),
    })

    uploadImage(file as File)
  }

  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
      enter='ease-out duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='ease-in duration-200'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <div className='fixed flex items-start justify-center inset-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-[25%]'
            enterTo='opacity-100 translate-y-0'
            leave='ease-in duration-200'
            leaveFrom='opacity-0 translate-y-0'
            leaveTo='opacity-100 translate-y-[25%]'
          >
            <Dialog.Panel as='div' className='max-w-[414px] bg-white flex flex-col h-dvh w-full px-4'>
              <QuizzesHeaderContainer>
                <div className='w-6 h-1' />

                <h1 className='text-base leading-5 font-bold text-black'>Add Media</h1>

                <Image className='cursor-pointer hover:opacity-75' src={closeIcon} alt='close' onClick={closeModal} />
              </QuizzesHeaderContainer>

              <div className='flex-1 overflow-hidden flex flex-col gap-6'>
                <div className='flex items-center justify-center gap-4 p-4 w-full'>
                  <UploadOptionItem iconPath={imageIcon} name='Gallery'>
                    <input
                      type='file'
                      accept='image/*'
                      className='absolute inset-0 opacity-0 cursor-pointer'
                      onChange={hanldeSetImageFile}
                    />
                  </UploadOptionItem>

                  <UploadOptionItem iconPath={pencilIcon} name='Gallery' />

                  <UploadOptionItem iconPath={cameraIcon} name='Gallery' />
                </div>

                <div className='flex-1 grid grid-cols-2 gap-4 overflow-auto no-scrollbar pb-4'>
                  {imageSamples.map((image, index) => (
                    <button
                      key={index}
                      className='relative h-[112px] rounded-lg overflow-hidden focus:border-[#0085DD] focus:border [&:focus_img]:scale-110 focus:outline-none'
                      type='button'
                    >
                      <Image
                        className='cursor-pointer hover:scale-110 transition-transform duration-200 object-cover'
                        src={image}
                        fill
                        sizes='100% 100%'
                        alt=''
                        onClick={() => {
                          convertStaticImageToFile(image)

                          closeModal()
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UploadImageModal
