import Scrollbars from 'react-custom-scrollbars-2'
import PopUp from '../pop-up'
import Portal from '../portal'

interface DetailModalProps {
  children: React.ReactNode
  onClickOutside?: () => void
}

export const DetailModal = (props: DetailModalProps) => {
  return (
    <Portal>
      <div className="fixed inset-y-10 inset-x-3 flex justify-center items-center">
        <div className="bg-white animate-popup rounded max-w-lg w-full max-h-full overflow-y-auto">
          <PopUp
            onClickOutside={
              props.onClickOutside !== undefined
                ? () => props.onClickOutside!()
                : () => {}
            }
          >
            {props.children}
          </PopUp>
        </div>
      </div>
    </Portal>
  )
}
