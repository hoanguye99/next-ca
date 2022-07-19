import React from 'react'
import Link from 'next/link'

interface LinkTabProps {
  link: string
  icon: React.ReactNode
  text: string
  selected: boolean
}

const LinkTab = (props: LinkTabProps) => {
  return (
    <li
      className={`block group  ${
        props.selected ? 'border-l-[3px] border-l-blue-500 opacity-100' : 'opacity-80'
      }`}
    >
      <Link href={props.link}>
        <a className={`w-full py-3 px-[25px] flex items-center text-gray-500 group-hover:text-black text-[15px] font-extrabold ${props.selected ? '!text-black' : ''}`}>
          {props.icon}
          <span className="ml-2 text-link-tab">{props.text}</span>
        </a>
      </Link>
    </li>
  )
}

export default LinkTab
