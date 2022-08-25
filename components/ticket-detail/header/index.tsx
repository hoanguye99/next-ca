import { DetailModal } from '@/components/common/modals'
import LinkNavigation from '@/components/layout/common/link-navigation'
import {
  Button,
  Input,
  InputSearchButton,
  Label,
  PrimaryText,
} from '@/components/styled'
import { useGetChangeStatus } from '@/hooks/query/ticket-detail'
import {
  GetTicketDetailResponse,
  TransferTicketRequestBody,
  TransferTicketResponse,
} from '@/models/api'
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  TransferTicket,
  useChangeStatus,
  useTransferTicket,
  useTransferTicketMutation,
} from './hooks'

interface HeaderWrapperProps {
  // getTicketDetailData: GetTicketDetailResponse
  getTicketDetail: UseQueryResult<GetTicketDetailResponse, unknown>
}

const HeaderWrapper = (props: HeaderWrapperProps) => {
  if (props.getTicketDetail.status === 'loading') {
    return (
      <>
        <Loading></Loading>
      </>
    )
  } else if (props.getTicketDetail.status === 'error') {
    return <></>
  } else {
    return <Header getTicketDetailData={props.getTicketDetail.data}></Header>
  }
}

interface HeaderProps {
  getTicketDetailData: GetTicketDetailResponse
}

const Header = (props: HeaderProps) => {
  const router = useRouter()
  const { ticketType, ticketSlugId } = router.query

  const [showTransferModal, setShowTransferModal] = useState(false)
  const changeStatusData = useGetChangeStatus(
    props.getTicketDetailData.issue_id
  )

  const changeStatusMutation = useChangeStatus(props.getTicketDetailData)
  const transferTicketMutation = useTransferTicketMutation(
    props.getTicketDetailData
  )
  return (
    <>
      {showTransferModal && (
        <DetailModal onClickOutside={() => setShowTransferModal(false)}>
          <TransferTicketModal
            closeDetailModal={() => {
              setShowTransferModal(false)
            }}
            getTicketDetailData={props.getTicketDetailData}
            transferTicketMutation={transferTicketMutation}
          ></TransferTicketModal>
        </DetailModal>
      )}
      <div className="py-6 border-b">
        {typeof ticketType === 'string' && (
          <LinkNavigation
            nav={[
              {
                disp: props.getTicketDetailData.status_name
                  .split('_')
                  .join(' ')
                  .toUpperCase(),
                link: router.asPath.split('/').slice(0, -1).join('/'),
              },
              {
                disp: props.getTicketDetailData.issue_key,
                link: router.asPath,
              },
            ]}
          />
        )}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <PrimaryText className="sm:text-2xl text-xl">
            {props.getTicketDetailData.issue_key}
          </PrimaryText>
          <div className="sm:flex-1 flex justify-between">
            <Button
              className="text-sm"
              onClick={() => setShowTransferModal(true)}
            >
              Transfer
            </Button>
            <div className="flex gap-3">
              {changeStatusData.data?.statusTransition.map((obj) => (
                <Button
                  className="text-sm"
                  onClick={() =>
                    changeStatusMutation.mutate({
                      status: obj.id,
                      ticket_id: props.getTicketDetailData.id,
                    })
                  }
                >
                  {obj.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Loading = () => {
  return (
    <div className="py-6 border-b">
      <div className="animate-pulse bg-slate-100 max-w-xl w-full mb-4 h-6"></div>
      <div className="animate-pulse bg-slate-100 h-10"></div>
    </div>
  )
}

interface TransferTicketModalProps {
  closeDetailModal: () => void
  getTicketDetailData: GetTicketDetailResponse
  transferTicketMutation: UseMutationResult<
    TransferTicketResponse,
    AxiosError<unknown, any>,
    TransferTicketRequestBody,
    TransferTicketResponse
  >
}

const TransferTicketModal = (props: TransferTicketModalProps) => {
  const {
    // Form
    register,
    setValue,
    getValues,
    handleSubmit,
    errors,
    handleFormSubmit,
    reset,

    // Get User query
    fetchUserStatus,
    getUserData,
    setUser,
  } = useTransferTicket(
    props.closeDetailModal,
    props.getTicketDetailData,
    props.transferTicketMutation
  )

  return (
    <>
      <PrimaryText className="text-2xl text-center my-8">
        Transfer Ticket
      </PrimaryText>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-3 px-6">
          <div>
            <Label>New Assignee</Label>
            <InputSearchButton<TransferTicket>
              name="new_assignee"
              id="new_assignee"
              placeholder="Search Staff"
              register={register}
              label="new_assignee"
              required={true}
              onSearch={() => setUser(getValues('new_assignee'))}
              loading={fetchUserStatus === 'fetching'}
              getUserData={getUserData}
              setValue={setValue}
            />
            {errors.new_assignee && (
              <p className="text-xs text-red-500 mt-2">
                Enter valid account mail and hit Search
              </p>
            )}
          </div>

          <div>
            <Label className="block">Time Spent</Label>
            <Input<TransferTicket>
              type="number"
              min={0}
              name="time_spent"
              id="time_spent"
              register={register}
              label="time_spent"
              required={true}
            />
          </div>

          <div>
            <Label className="block">Note</Label>
            <Input<TransferTicket>
              type="text"
              min={0}
              name="note"
              id="note"
              register={register}
              label="note"
              required={true}
            />
          </div>
        </div>

        <div className="h-16 grid grid-cols-2 mt-8">
          <button
            onClick={() => props.closeDetailModal()}
            className="hover:bg-stone-50 transition-color ease-in-out duration-75 text-center border border-r-0"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`hover:bg-stone-50 transition-color ease-in-out duration-75 text-center border`}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default HeaderWrapper
