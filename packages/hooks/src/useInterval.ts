import { useEffect, useRef, useLayoutEffect, useCallback, useState } from 'react'

export interface useIntervalProps {
  fn: () => void
  time: number
  autoPlay?: boolean
  immediate?: boolean
}

export function useInterval({ fn, time, autoPlay = true, immediate = true }: useIntervalProps) {
  const autoPlayRef = useRef(autoPlay)
  const run = useCallback(() => (autoPlayRef.current = true), [])
  const stop = useCallback(() => (autoPlayRef.current = false), [])

  const ref = useRef(fn)

  useLayoutEffect(() => {
    ref.current = fn
  })

  const cleanUpFnRef = useRef<() => void>()

  const clean = useCallback(() => {
    cleanUpFnRef.current?.()
  }, [])

  useEffect(() => {
    if (immediate) ref.current()
    const timer = setInterval(() => {
      if (!autoPlayRef.current) return
      ref.current()
    }, time)

    cleanUpFnRef.current = () => {
      clearInterval(timer)
    }

    return clean
  }, [])

  return {
    run,
    stop,
    clean
  }
}

export function useFetchInterval(fn, time) {
  const isPendingRef = useRef(false)
  useInterval({
    fn: () => {
      if (isPendingRef.current) return
      isPendingRef.current = true
      fn().finally(() => (isPendingRef.current = false))
    },
    time
  })
}

export function useFetchInterval2<T>(fn: () => Promise<T>, time: number) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>()
  useInterval({
    fn: () => {
      if (loading) return
      setLoading(true)
      fn()
        .then(setData)
        .catch(() => setData(undefined))
        .finally(() => setLoading(false))
    },
    time
  })
  return {
    loading,
    data
  }
}
