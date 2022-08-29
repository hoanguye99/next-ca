import React from 'react'

interface PrimaryTextProps {
  className?: string
  children: string
}

export const PrimaryText = (props: PrimaryTextProps) => {
  return (
    <p className={`${props.className} font-[WorkSans-SemiBold] font-thin`}>
      {props.children}
    </p>
  )
}

interface SecondaryTextProps {
  className?: string
  children: string
}

export const SecondaryText = (props: SecondaryTextProps) => {
  return (
    <p
      className={`${props.className} text-gray-primary font-[WorkSans-Medium] font-extrabold`}
    >
      {props.children}
    </p>
  )
}

interface NormalTextProps {
  className?: string
  children: string
}

export const NormalText = (props: NormalTextProps) => {
  return (
    <p className={`${props.className} font-[WorkSans-Regular] font-extrabold`}>
      {props.children}
    </p>
  )
}
