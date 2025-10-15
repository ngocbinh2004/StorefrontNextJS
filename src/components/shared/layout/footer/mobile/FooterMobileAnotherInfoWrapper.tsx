'use client'
import { Accordion, AccordionItem } from '@nextui-org/react'

export default function FooterMobileAnotherInfoWrapper({
  title,
  children,
}: {
  title: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <Accordion>
      <AccordionItem title={title}>{children}</AccordionItem>
    </Accordion>
  )
}
