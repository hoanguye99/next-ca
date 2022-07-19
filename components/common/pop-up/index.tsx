import React, { useEffect, useRef } from 'react'

type PopUpProps = {
  children: React.ReactNode
  onClickOutside: () => void
  optionalRef?: React.RefObject<HTMLElement>
}

const PopUp = ({ children, onClickOutside, optionalRef }: PopUpProps) => {
  const popUpRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function checkClickOutside(e: MouseEvent) {
      if (optionalRef) {
        if (
          optionalRef.current &&
          !optionalRef.current.contains(e.target as HTMLElement) &&
          popUpRef.current &&
          !popUpRef.current.contains(e.target as HTMLElement)
        ) {
          onClickOutside()
        }
      } else if (
        popUpRef.current &&
        !popUpRef.current.contains(e.target as HTMLElement)
      ) {
        onClickOutside()
      }
    }
    window.addEventListener('mousedown', checkClickOutside)
    return () => {
      window.removeEventListener('mousedown', checkClickOutside)
    }
  }, [optionalRef, onClickOutside])
  return <div ref={popUpRef}>{children}</div>
}

export default PopUp
