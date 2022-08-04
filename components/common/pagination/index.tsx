import { ControlButton, getPageRange, PageButton } from "./common"

interface PaginationProps {
  gotoPage: (page: number) => void
  canPreviousPage: boolean
  previousPage: () => void
  pageIndex: number
  // pageOptions: number[]
  nextPage: () => void
  canNextPage: boolean
  pageCount: number
}

export const Pagination = (props: PaginationProps) => {
  return (
    <div className="flex justify-end m-5" aria-label="Pagination">
      <div className="flex gap-2">
        {/* <ControlButton
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
        </ControlButton> */}
        <ControlButton
          onClick={() => props.previousPage()}
          disabled={!props.canPreviousPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </ControlButton>
        {getPageRange(props.pageIndex + 1, props.pageCount).map(
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
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </ControlButton>

        {/* <ControlButton
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
        </ControlButton> */}
      </div>
    </div>
  )
}
