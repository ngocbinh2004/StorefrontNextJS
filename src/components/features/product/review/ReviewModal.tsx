'use client'
import { cn } from '@/common/utils/cn'
import { FormInputImage } from '@/components/shared/form/input/FormInputImage'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/input'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { ReactNode } from 'react'
import RatingStarsSelect from '../../../shared/displaydata/rating/RatingStarsSelect'

export default function ReviewModal({ children, className }: { children: ReactNode; className: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button color='primary' className={cn(className)} onPress={onOpen}>
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='sm:max-w-[512px]'>
          <ModalHeader className='grid justify-items-center'>
            <h1 className='text-center text-primary text-lg'>Đánh giá & nhận xét sản phẩm</h1>
            <div>
              <h1 className='text-xl text-center'>iPhone 14 Pro Max 128GB Chính hãng (VN/A)</h1>
              <RatingStarsSelect size={40} className='justify-center my-6' />
            </div>
          </ModalHeader>
          <ModalBody>
            <div className='flex flex-col gap-2'>
              <Input placeholder='Họ và tên' aria-label='Họ và tên' />
              <Input placeholder='Số điện thoại' aria-label='Số điện thoại' />
              <FormInputImage />
              <Textarea placeholder='Nhận xét về sản phẩm' classNames={{label: 'hidden'}} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit'>Save changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
