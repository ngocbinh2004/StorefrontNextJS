'use client'
import { Input } from '@nextui-org/input'
import { IconPhotoPlus, IconX } from '@tabler/icons-react'
import Image from 'next/image'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

interface FilePreview {
  file: File
  previewUrl: string
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    onInputChange?: (files: FilePreview[]) => void
    onInputDelete?: (deletedElement: FilePreview, files: FilePreview[]) => void
  }

const FormInputImage = forwardRef<HTMLInputElement, InputProps>(
  ({ multiple, onInputChange, onInputDelete, ...props }, ref) => {
    const childRef = useRef<HTMLInputElement>(null)
    const [filePreviews, setFilePreviews] = useState<FilePreview[]>([])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files || []
      let newFilePreviews: FilePreview[] = []
      if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i]
          const reader = new FileReader()
          reader.onload = () => {
            const previewUrl = reader.result as string
            const filePreview = { file, previewUrl }
            newFilePreviews.push(filePreview)
            if (newFilePreviews.length === fileList.length) {
              newFilePreviews = [...filePreviews, ...newFilePreviews]
              setFilePreviews(newFilePreviews)
            }
          }
          reader.readAsDataURL(file)
        }
      }
      onInputChange && onInputChange(newFilePreviews);
    }

    const handleDelete = (index: number) => {
      const updatedPreviews = [...filePreviews]
      const deletedElement = updatedPreviews.splice(index, 1)[0]
      setFilePreviews(updatedPreviews)
      onInputDelete && onInputDelete(deletedElement, updatedPreviews)
    }

    const handleClick = () => {
      childRef?.current?.click()
    }

    useImperativeHandle(ref, () => childRef.current as HTMLInputElement)

    return (
      <>
        <Input
          className="hidden"
          ref={childRef}
          onChange={handleImageChange}
          multiple
          type="file"
          aria-label='input image'
        />
        <div className="flex flex-row-reverse justify-end gap-1">
          <div
            className="flex justify-center items-center w-16 h-16 rounded-lg border cursor-pointer"
            onClick={handleClick}
          >
            <IconPhotoPlus />
          </div>
          {filePreviews.map((item, index) => (
            <div
              key={index}
              className="group relative w-16 h-16 overflow-hidden"
            >
              <IconX
                size={18}
                className="absolute z-20 top-1 right-1 cursor-pointer text-white hidden group-hover:block"
                onClick={() => handleDelete(index)}
              />
              <Image
                width={64}
                height={64}
                src={item.previewUrl}
                alt="Preview"
                className="w-16 h-16 rounded-lg"
              />
              <div className="absolute top-0 left-0 z-10 h-full w-full rounded-lg group-hover:bg-black group-hover:opacity-20"></div>
            </div>
          ))}
        </div>
      </>
    )
  }
)

FormInputImage.displayName = 'FormInputImage'

export { FormInputImage }
