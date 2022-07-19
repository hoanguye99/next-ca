import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: React.ReactNode
  className?: string
}

const Portal = (props: PortalProps) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])
  return mounted
    ? createPortal(
        <>
          <div className={`fixed inset-0 ${props.className} bg-black opacity-40 flex justify-center items-center animate-opacity `}></div>
          {props.children}
        </>,
        document.querySelector('#myportal') as HTMLElement
      )
    : null
}

export default Portal
