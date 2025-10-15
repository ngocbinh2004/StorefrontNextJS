'use client'
import { cn } from '@/common/utils/cn'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function Thumbnail({ className, children }: { className?: string; children?: ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div>
      <div className={cn('flex justify-center items-center border w-16 h-16 box-border', className)} onClick={onOpen}>
        {children}
      </div>
      <Modal {...{ isOpen, onOpenChange }}>
        <ModalContent className='flex justify-center items-center max-w-[90vw] h-[90vh] p-7'>{children}</ModalContent>
      </Modal>
    </div>
  )
}
