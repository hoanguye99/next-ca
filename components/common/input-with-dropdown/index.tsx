import { ShowDropdown } from '@/models/components/common'
import React, { useCallback, useRef } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import PopUp from '../pop-up'

interface InputWithDropdownProps {
  button: React.ReactNode
  dropdown: React.ReactNode
  showDropdown: ShowDropdown
  setShowDropdown: React.Dispatch<React.SetStateAction<ShowDropdown>>
  disabled: boolean | undefined
}
const InputWithDropdown = ({
  button,
  dropdown,
  disabled,
  showDropdown,
  setShowDropdown,
}: InputWithDropdownProps) => {
  const moreInfoRef = useRef<HTMLDivElement>(null)
  const handlePopUpClickOutside = useCallback(
    () => setShowDropdown({ status: 0 }),
    []
  )

  const handleActionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (disabled) return
    if (showDropdown.status === 0) {
      if (typeof window !== 'undefined') {
        if (event.clientY < window.innerHeight / 2) {
          // TOP
          setShowDropdown({
            status: 1,
            position: 'top',
          })
        } else {
          // BOTTOM
          setShowDropdown({
            status: 1,
            position: 'bottom',
          })
        }
      }
    } else {
      setShowDropdown({ status: 0 })
    }
  }
  return (
    <div className="relative">
      {showDropdown.status === 1 && (
        <PopUp
          onClickOutside={handlePopUpClickOutside}
          optionalRef={moreInfoRef}
        >
          <div
            className={`absolute block z-20 inset-x-0 ${
              showDropdown.position === 'top' ? 'top-12' : 'bottom-12'
            }`}
          >
            <div className="bg-white rounded shadow-lg border">
              <Scrollbars
                universal
                autoHeight
                autoHeightMin={0}
                autoHeightMax={200}
              >
                {dropdown}
              </Scrollbars>
            </div>
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
        <button
          type="button"
          className="absolute inset-y-[2px] right-[2px] w-16 bg-gray-50 flex justify-center items-center border-l active:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default InputWithDropdown
