import React from 'react'
import { NormalText } from './text'

interface LabelProps {
  className?: string
  children: string
  htmlFor: string
}

export const Label = (props: LabelProps) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className={`block mb-3 text-base ${props.className}`}
    >
      <NormalText>{props.children}</NormalText>
    </label>
  )
}
