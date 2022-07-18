import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

interface ButtonProps {
  className?: string
  onClick?: () => void
  posting?: boolean
  children: React.ReactNode
  disabled?: boolean
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      type={`${ props.posting ? 'button' : 'submit'}`}
      onClick={props.onClick}
      className={`${props.className} ${
        props.posting ? 'cursor-not-allowed' : 'cursor-pointer'
      } whitespace-nowrap overflow-hidden px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 `}
    >
      {props.posting ? (
        <div className="w-6 h-6 animate-spin m-auto">
          <BiLoaderAlt size={24} />
        </div>
      ) : props.children}
    </button>
  )
}
