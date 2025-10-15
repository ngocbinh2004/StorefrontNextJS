'use client'
import { cn } from '@/common/utils/cn'
import { Button, Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'

export default function ImageThumbnail({
  className,
  width,
  height,
  src,
  alt,
}: {
  className?: string
  width: number
  height: number
  src: string
  alt: string
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div>
      <Button
        className={cn('flex justify-center items-center border w-16 h-16 box-border', className)}
        onPress={onOpen}
      >
        <Image
          width={width}
          height={height}
          src={src}
          alt={alt}
          className='h-full w-auto'
        />
      </Button>
      <Modal {...{ isOpen, onOpenChange }}>
        <ModalContent className='flex justify-center items-center max-w-[800px] h-[80vh]'>
          {(onClose) => (
            <>
              <Image
                height={400}
                width={740}
                src={src}
                alt={alt}
                className='h-full w-auto object-contain'
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
