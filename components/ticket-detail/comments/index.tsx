import { useAppSelector } from '@/app/hooks'
import EmptyView from '@/components/common/empty-view'
import InitialImage from '@/components/common/get-initial'
import { Pagination } from '@/components/common/pagination'
import { usePaginationArray } from '@/components/common/pagination/hook'
import {
  InputComment,
  NormalText,
  PrimaryText,
  SecondaryText,
} from '@/components/styled'
import { selectUserDetail } from '@/features/auth/user-slice'
import { GetTicketDetailResponse, TicketDetailComment } from '@/models/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import React from 'react'
import { useLogCommentCreate } from './hooks'

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

  const {
    // Form
    register,
    handleSubmit,
    errors,
    handleFormSubmit,

    mutation,
  } = useLogCommentCreate(props.getTicketDetailData)

  const userDetail = useAppSelector(selectUserDetail)
  return (
    <div className="flex flex-col">
      {dispArray !== null && dispArray.length !== 0 && (
        <div
          className={`flex flex-col gap-4 border-t mt-5 pt-5 ${
            pageCount > 1 ? 'min-h-[360px]' : ''
          } `}
        >
          {dispArray.map((obj) => (
            <Comment key={obj.id} {...obj}></Comment>
          ))}
        </div>
      )}
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
      <form className="" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="border-t mt-5 pt-5 flex items-center gap-3">
          <InitialImage
            className="w-10 h-10 shrink-0"
            name={userDetail.key}
          ></InitialImage>
          <input
            type="text"
            id="comment"
            placeholder="Leave a comment ..."
            {...register('content', { required: true })}
            className="block w-full bg-gray-100 rounded-xl py-2 px-4 text-gray-700 placeholder-gray-400 placeholder:text-sm outline-none"
          />
        </div>
      </form>
    </div>
  )
}

const Comment = (props: TicketDetailComment) => {
  return (
    <div className="gap-4 flex">
      <InitialImage
        className="w-10 h-10 shrink-0 mt-1"
        name={props.created_by_account}
      ></InitialImage>
      <div className="bg-gray-100 rounded-lg p-3 text-sm flex flex-col gap-2">
        <div className="flex justify-between items-center gap-10">
          <SecondaryText className="!text-black">
            {props.created_by_account}
          </SecondaryText>
          <p className="text-gray-400 text-xs">
            {dayjs(props.date_created).fromNow()}
          </p>
        </div>
        <p className="">{props.content}</p>
      </div>
    </div>
  )
}

export default Comments
