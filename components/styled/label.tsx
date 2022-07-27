import React from 'react'
import { NormalText } from './text'

interface LabelProps {
  className?: string
  children: string
}

export const Label = (props: LabelProps) => {
  return (
    <NormalText className={`block mb-3 text-base ${props.className}`}>
      {props.children}
    </NormalText>
  )
}
