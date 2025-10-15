'use client'
import { cn } from '@/common/utils/cn'
import { Tab, Tabs } from '@nextui-org/tabs'
import { ReactNode } from 'react'

export default function TabBar({
  data = [],
  className,
  classNames = {
    base: '',
    tabList: '',
  },
}: {
  data?: { key: string; title: ReactNode; content: ReactNode }[]
  className?: string
  classNames?: {
    base?: string
    tabList?: string
  }
}) {
  return data.length > 0 ? (
    <Tabs
      className={cn('w-full justify-start bg-transparent rounded-none', className, classNames.base)}
      classNames={{ tabList: cn(classNames.tabList) }}
    >
      {data.map((item) => (
        <Tab
          key={item.key}
          title={item.title}
          className='data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none font-bold'
        >
          {item.content}
        </Tab>
      ))}
    </Tabs>
  ) : null
}
