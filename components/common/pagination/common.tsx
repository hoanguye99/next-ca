export function getPageRange(
  currentPage: number,
  pageLength: number,
  pageNum = 5
) {
  if (currentPage < 1) throw Error('The current Page cannot be less than 1')
  if (currentPage > pageLength)
    throw Error('The current Page exceeded the total page length')

  const minRange = Math.floor((currentPage - 1) / pageNum) * pageNum + 1
  const maxRange = Math.min(
    Math.ceil(currentPage / pageNum) * pageNum,
    pageLength
  )
  return [...Array(maxRange - minRange + 1)].map((x, index) => minRange + index)
}

interface PageButtonProps {
  active: boolean
  children: number
  onClick: () => void
}

export const PageButton = (props: PageButtonProps) => {
  return (
    <button
      className={`
      ${
        props.active
          ? ' bg-blue-50 border-blue-primary text-blue-primary border '
          : 'bg-white text-gray-500 '
      } relative inline-flex items-center px-3 rounded-full font-medium text-sm`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

interface ControlButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled: boolean
}

export const ControlButton = (props: ControlButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      className={`${
        props.disabled ? '' : ''
      } inline-flex items-center px-2 py-2 bg-white text-sm font-medium text-gray-500`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
