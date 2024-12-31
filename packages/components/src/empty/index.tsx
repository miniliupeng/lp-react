import { Empty as AntEmpty } from 'antd'

interface EmptyProps {
  isEmpty: boolean
  children: React.ReactNode
}

export const Empty = ({ isEmpty, children }: EmptyProps) => {
  return (
    <>
      {isEmpty ? (
        <div className='flex h-full w-full'>
          <AntEmpty className='m-auto' image={AntEmpty.PRESENTED_IMAGE_SIMPLE}></AntEmpty>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
