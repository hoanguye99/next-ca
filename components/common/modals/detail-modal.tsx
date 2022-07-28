import PopUp from "../pop-up"
import Portal from "../portal"

interface DetailModalProps {
  closeDetailModal: () => void
  children: React.ReactNode
}

export const DetailModal = (props: DetailModalProps) => {
  return (
    <Portal>
      <PopUp onClickOutside={() => {}}>
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
          {props.children}
        </div>
      </PopUp>
    </Portal>
  )
}
