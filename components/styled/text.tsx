import React from 'react'

interface PrimaryTextProps {
  className?: string
  children: string
}

export const PrimaryText = (props: PrimaryTextProps) => {
  return (
    <p className={`${props.className} font-['Muli-Bold'] font-thin`}>{props.children}</p>
  )
}


interface SecondaryTextProps {
  className?: string
  children: string
}

export const SecondaryText = (props: SecondaryTextProps) => {
  return (
    <p className={`${props.className} text-gray-primary font-['Muli-SemiBold'] font-extrabold`}>{props.children}</p>
  )
}
