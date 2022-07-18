import React from 'react'

interface LabelProps {
  className?: string
  children: string
  htmlFor: string
}

export const Label = (props: LabelProps) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className={` block mb-2 text-sm text-gray-600 ${props.className}`}
    >
      {props.children}
    </label>
  )
}
