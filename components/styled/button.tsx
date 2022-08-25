import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

interface ButtonProps {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  posting?: boolean
  children: React.ReactNode
  disabled?: boolean
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.posting || props.disabled}
      type={props.type || 'submit'}
      onClick={props.onClick}
      className={`${props.className || ''} ${
        props.posting ? 'cursor-not-allowed' : 'cursor-pointer'
      } whitespace-nowrap overflow-hidden px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-primary rounded-md hover:bg-blue-hover focus:outline-none active:focus:duration-0 active:bg-blue-focus`}
    >
      {props.posting ? (
        <div className="w-6 h-6 animate-spin m-auto">
          <BiLoaderAlt size={24} />
        </div>
      ) : (
        props.children
      )}
    </button>
  )
}

interface LinkButtonProps {
  className?: string
  children: React.ReactNode
  href?: string
}

export const LinkButton = React.forwardRef(
  (props: LinkButtonProps, ref: React.LegacyRef<HTMLAnchorElement>) => {
    return (
      <button
        className={`${props.className} whitespace-nowrap overflow-hidden px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-primary rounded-md hover:bg-blue-hover focus:outline-none active:focus:duration-0 active:bg-blue-focus`}
      >
        <a href={props.href} ref={ref}>
          {props.children}
        </a>
      </button>
    )
  }
)
