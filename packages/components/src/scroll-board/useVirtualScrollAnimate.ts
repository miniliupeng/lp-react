import { useCallback, useMemo, useState } from 'react'
import { useAnimate } from 'framer-motion'
import { useInterval } from '@lp-react/hooks'

export const useVirtualScrollAnimate = <T>({
  data = [],
  itemHeight = 40,
  visibleCount,
  bufferCount = 5,
  scrollInterval = 3000
}: {
  data: T[]
  itemHeight?: number
  visibleCount: number
  bufferCount?: number
  scrollInterval?: number
}) => {
  const [scope, animate] = useAnimate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const visibleData = useMemo(() => {
    if (!data.length) return []
    return data.slice(currentIndex, currentIndex + visibleCount + bufferCount)
    // return Array.from({ length: visibleCount + bufferCount }, (_, i) => {
    //   const index = (currentIndex + i) % data.length;
    //   return data[index];
    // });
  }, [data, currentIndex, visibleCount, bufferCount])

  const scroll = useCallback(() => {
    if (isPaused || !data.length) return
    if (visibleCount >= data.length) return // 如果数据长度小于等于可见数量，则不滚动
    let nextIndex: number
    if (currentIndex + visibleCount >= data.length) {
      nextIndex = 0
    } else {
      nextIndex = currentIndex + 1
    }

    animate(scope.current, { y: -nextIndex * itemHeight }, { duration: 0.3, ease: 'linear' })
    setCurrentIndex(nextIndex)
  }, [isPaused, data, currentIndex, animate, itemHeight, visibleCount])

  useInterval({ fn: scroll, time: scrollInterval })

  const pauseScroll = useCallback(() => setIsPaused(true), [])
  const resumeScroll = useCallback(() => setIsPaused(false), [])

  return { currentIndex, scope, visibleData, pauseScroll, resumeScroll }
}
