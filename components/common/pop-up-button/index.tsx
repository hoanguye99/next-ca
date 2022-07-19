import { ShowPopUp } from '@/models/components/common'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import PopUp from '../pop-up'

interface PopUpButtonProps {
  button: React.ReactNode
  popup: React.ReactNode
  showPopUp: ShowPopUp
  setShowPopUp: React.Dispatch<React.SetStateAction<ShowPopUp>>
}
const PopUpButton = ({button, popup, showPopUp, setShowPopUp}: PopUpButtonProps) => {
  // const [showPopUp, setShowPopUp] = useState<ShowPopUp>({
  //   status: 0,
  //   style: {},
  // })
  const moreInfoRef = useRef<HTMLDivElement>(null)
  const handlePopUpClickOutside = useCallback(
    () => setShowPopUp({ status: 0, style: {} }),
    []
  )

  const handleActionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (showPopUp.status === 0) {
      if (typeof window !== 'undefined') {
        if (
          event.clientX >= window.innerWidth / 2 &&
          event.clientY >= window.innerHeight / 2
        ) {
          // 4 / 4 TOP LEFT
          setShowPopUp({
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
          setShowPopUp({
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
          setShowPopUp({
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
          setShowPopUp({
            status: 1,
            style: {
              top: `${event.clientY - 15}px`,
              left: `${event.clientX + 10}px`,
            },
          })
        }
      }
    } else {
      setShowPopUp({ status: 0, style: {} })
    }
  }
  return (
    <>
      {showPopUp.status === 1 && (
        <PopUp
          onClickOutside={handlePopUpClickOutside}
          optionalRef={moreInfoRef}
        >
          <div style={showPopUp.style} className={`fixed z-30`}>
            {popup}
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

export default PopUpButton
