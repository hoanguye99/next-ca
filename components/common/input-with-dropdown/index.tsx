import { ShowDropdown } from '@/models/components/common'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import PopUp from '../pop-up'

interface InputWithDropdownProps {
  button: React.ReactNode
  dropdown: React.ReactNode
  showDropdown: ShowDropdown
  setShowDropdown: React.Dispatch<React.SetStateAction<ShowDropdown>>
}
const InputWithDropdown = ({button, dropdown, showDropdown, setShowDropdown}: InputWithDropdownProps) => {
  const moreInfoRef = useRef<HTMLDivElement>(null)
  const handlePopUpClickOutside = useCallback(
    () => setShowDropdown({ status: 0, style: {} }),
    []
  )

  const handleActionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (showDropdown.status === 0) {
      if (typeof window !== 'undefined') {
        if (
          event.clientX >= window.innerWidth / 2 &&
          event.clientY >= window.innerHeight / 2
        ) {
          // 4 / 4 TOP LEFT
          setShowDropdown({
            status: 1,
            style: {
              bottom: `${window.innerHeight - event.clientY - 15}px`,
              right: `${window.innerWidth - event.clientX + 10}px`,
            },
          })
        } else if (
          event.clientX < window.innerWidth / 2 &&
          event.clientY >= window.innerHeight / 2
        ) {
          // 3 / 4
          setShowDropdown({
            status: 1,
            style: {
              bottom: `${window.innerHeight - event.clientY + 15}px`,
              left: `${event.clientX + 10}px`,
            },
          })
        } else if (
          event.clientX >= window.innerWidth / 2 &&
          event.clientY < window.innerHeight / 2
        ) {
          // 2 / 4
          setShowDropdown({
            status: 1,
            style: {
              top: `${event.clientY - 15}px`,
              right: `${window.innerWidth - event.clientX + 10}px`,
            },
          })
        } else if (
          event.clientX < window.innerWidth / 2 &&
          event.clientY < window.innerHeight / 2
        ) {
          // 1 / 4
          setShowDropdown({
            status: 1,
            style: {
              top: `${event.clientY - 15}px`,
              left: `${event.clientX + 10}px`,
            },
          })
        }
      }
    } else {
      setShowDropdown({ status: 0, style: {} })
    }
  }
  return (
    <>
      {showDropdown.status === 1 && (
        <PopUp
          onClickOutside={handlePopUpClickOutside}
          optionalRef={moreInfoRef}
        >
          <div style={showDropdown.style} className={`fixed z-30`}>
            {dropdown}
          </div>
        </PopUp>
      )}
      <div
        ref={moreInfoRef}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          handleActionClick(e)
        }
      >
        {button}
      </div>
    </>
  )
}

export default InputWithDropdown
