import { ReactNode } from 'react'
import { Empty } from '../empty'
import { useVirtualScrollAnimate } from './useVirtualScrollAnimate'

interface Column<T> {
  title: string
  className?: string
  dataIndex?: string
  render?: (data: T) => React.ReactNode
}

const ITEM_HEIGHT = 40

export const ScrollBoard = <T extends Record<string, unknown>>({
  scrollY = 200,
  data = [],
  columns = []
}: {
  scrollY?: number
  data?: T[]
  columns?: Column<T>[]
}) => {
  const { currentIndex, scope, visibleData, pauseScroll, resumeScroll } = useVirtualScrollAnimate({
    data,
    itemHeight: ITEM_HEIGHT,
    visibleCount: Math.ceil(scrollY / ITEM_HEIGHT),
    bufferCount: 5,
    scrollInterval: 3000
  })
  return (
    <div className='h-full'>
      {/* 表头部分 */}
      <div className='flex gap-2 py-2 font-bold'>
        {columns.map(({ title, className }) => (
          <div key={title} className={className}>
            {title}
          </div>
        ))}
      </div>
      {/* 自动滚动表体部分 */}
      <Empty isEmpty={!data.length}>
        <div
          style={{ height: scrollY }}
          className='overflow-hidden'
          onMouseEnter={pauseScroll}
          onMouseLeave={resumeScroll}
        >
          <ul ref={scope} className='relative flex-col'>
            {visibleData.map((item, index) => (
              <li
                key={index + currentIndex}
                className='h-40px text-14px absolute flex items-center gap-2 hover:bg-[#ffffff0a]'
                style={{
                  transform: `translateY(${(index + currentIndex) * ITEM_HEIGHT}px)`
                }}
              >
                {columns.map(({ title, className, dataIndex, render }) => (
                  <div key={title} className={className}>
                    {render ? render(item) : (item[dataIndex!] as ReactNode)}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </Empty>
    </div>
  )
}
