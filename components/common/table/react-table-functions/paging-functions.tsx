interface PaginationProps {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void
  canPreviousPage: boolean
  previousPage: () => void
  pageIndex: number
  pageOptions: number[]
  nextPage: () => void
  canNextPage: boolean
  pageCount: number
}

export const Pagination = (props: PaginationProps) => {
  return (
    <div className="flex justify-center my-8" aria-label="Pagination">
      <div className="flex border-l">
        <ControlButton
          onClick={() => props.gotoPage(0)}
          disabled={!props.canPreviousPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </ControlButton>
        <ControlButton
          onClick={() => props.previousPage()}
          disabled={!props.canPreviousPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </ControlButton>
        {getPageRange(props.pageIndex + 1, props.pageOptions.length).map(
          (pageNumber) => (
            <PageButton
              key={pageNumber}
              active={pageNumber === props.pageIndex + 1}
              onClick={() => props.gotoPage(pageNumber - 1)}
            >
              {pageNumber}
            </PageButton>
          )
        )}
        <ControlButton
          onClick={() => props.nextPage()}
          disabled={!props.canNextPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </ControlButton>

        <ControlButton
          onClick={() => props.gotoPage(props.pageCount - 1)}
          disabled={!props.canNextPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </ControlButton>
      </div>
    </div>
  )
}


function getPageRange(
  currentPage: number,
  pageLength: number,
  pageNum = 3
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

const PageButton = (props: PageButtonProps) => {
  return (
    <button
      className={
        props.active
          ? ' bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
          : 'bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border border-l-0 text-sm font-medium'
      }
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

const ControlButton = (props: ControlButtonProps) => {
  return (
    <button
      className={`${
        props.disabled ? 'hidden' : ''
      } relative inline-flex items-center px-2 py-2 border border-l-0 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
