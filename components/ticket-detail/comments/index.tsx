import EmptyView from '@/components/common/empty-view'
import InitialImage from '@/components/common/get-initial'
import { Pagination } from '@/components/common/pagination'
import { usePaginationArray } from '@/components/common/pagination/hook'
import { NormalText, PrimaryText, SecondaryText } from '@/components/styled'
import { GetTicketDetailResponse, TicketDetailComment } from '@/models/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import React from 'react'

interface CommentsProps {
  getTicketDetailData: GetTicketDetailResponse
}

const Comments = (props: CommentsProps) => {
  const {
    dispArray,
    gotoPage,
    canPreviousPage,
    previousPage,
    pageIndex,
    pageCount2,
    nextPage,
    canNextPage,
    pageCount,
  } = usePaginationArray(props.getTicketDetailData.detailComment, 4)

  return props.getTicketDetailData.detailComment.length === 0 ? (
    <EmptyView className="bg-gray-table !h-[300px]">
      <p className="text-2xl text-gray-400">No Comments Found</p>
    </EmptyView>
  ) : (
    <div className="flex flex-col">
      {dispArray !== null &&
        dispArray.map((obj) => <Comment key={obj.id} {...obj}></Comment>)}
      {pageCount > 1 && (
        <Pagination
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          pageIndex={pageIndex}
          // pageOptions={pageOptions}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
        ></Pagination>
      )}
    </div>
  )
}

const Comment = (props: TicketDetailComment) => {
  return (
    <div className="p-4 border-b last:border-b-0 grid grid-cols-10 gap-4">
      <div className="col-span-10 md:col-span-3 flex items-start gap-3">
        <InitialImage name={props.created_by_account}></InitialImage>
        <SecondaryText className="!text-black">
          {props.created_by_account}
        </SecondaryText>
      </div>
      <div className="col-span-10 md:col-span-7 text-sm">
        <p className="mb-2">{props.content}</p>
        <p className="text-gray-400">{dayjs(props.date_created).fromNow()}</p>
      </div>
    </div>
  )
}

export default Comments
