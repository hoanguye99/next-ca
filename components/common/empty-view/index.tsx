import React from 'react'

interface EmptyViewProps {
  children: React.ReactNode
}

const EmptyView = (props: EmptyViewProps) => {
  return (
    <div className="h-[30rem] border-dashed border border-gray-300 flex flex-col justify-center items-center">
      {props.children}
    </div>
  )
}

export default EmptyView