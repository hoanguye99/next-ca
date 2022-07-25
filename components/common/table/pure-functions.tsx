import { Spinner } from 'components/styled'
import Image from 'next/future/image'
import table_empty from '@/public/images/empty.jpg'

export const TableSpinner = () => {
  return (
    <div className="p-5 mt-7">
      <Spinner></Spinner>
    </div>
  )
}

export const TableEmpty = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Image src={table_empty} className="w-96 rounded-full" alt="" />
      <p className="text-center font-thin text-xl mt-5 mb-1">
        Bạn hiện chưa có đơn hàng nào!
      </p>
    </div>
  )
}

export const ArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 13l-5 5m0 0l-5-5m5 5V6"
      />
    </svg>
  )
}

export const ArrowUp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 11l5-5m0 0l5 5m-5-5v12"
      />
    </svg>
  )
}

export const ArrowUpDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  )
}
