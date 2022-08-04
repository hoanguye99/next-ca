import { useEffect, useState } from 'react'

export function usePaginationArray<T>(initialArray: T[], pageSize: number) {
  const [originalArray, setOriginalArray] = useState(() => [...initialArray])
  const [dispArray, setDispArray] = useState<T[] | null>(null)
  const [pageIndex, setPageIndex] = useState(0)
  const pageCount = Math.ceil(originalArray.length / pageSize)

  useEffect(() => {
    const minRange = pageIndex * pageSize
    const maxRange = Math.min(
      (pageIndex + 1) * pageSize - 1,
      originalArray.length - 1
    )
    setDispArray(originalArray.slice(minRange, maxRange + 1))
  }, [pageIndex])

  return {
    dispArray,
    gotoPage: (page: number) => setPageIndex(page),
    canPreviousPage: pageIndex > 0,
    previousPage: () => setPageIndex((prev) => prev - 1),
    pageIndex,
    pageCount2: pageCount,
    nextPage: () => setPageIndex((prev) => prev + 1),
    canNextPage: pageIndex < pageCount - 1,
    pageCount,
  }
}
