import { DetailModal, ErrorModal } from '@/components/common/modals'
import LinkNavigation from '@/components/layout/common/link-navigation'
import { Button, Input, InputSearchButton, Label, PrimaryText } from '@/components/styled'
import { GetTicketDetailResponse } from '@/models/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { TransferTicket, useTransferTicket } from './hooks'

interface HeaderProps {
  getTicketDetailData: GetTicketDetailResponse
}

const Header = (props: HeaderProps) => {
  const router = useRouter()
  const { ticketType, ticketSlugId } = router.query

  const [showTransferModal, setShowTransferModal] = useState(false)

  return (
    <>
      {showTransferModal && (
        <DetailModal onClickOutside={() => setShowTransferModal(false)}>
          <TransferTicketModal
            closeDetailModal={() => {
              setShowTransferModal(false)
            }}
            getTicketDetailData={props.getTicketDetailData}
          ></TransferTicketModal>
        </DetailModal>
      )}
      <div className="py-6 border-b">
        {typeof ticketSlugId === 'string' && typeof ticketType === 'string' && (
          <LinkNavigation
            nav={[
              {
                disp: ticketType.split('-').join(' ').toUpperCase(),
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
            <Button onClick={() => setShowTransferModal(true)}>
              Transfer
            </Button>
            <Button>Open</Button>
          </div>
        </div>
      </div>
    </>
  )
}

interface TransferTicketModalProps {
  closeDetailModal: () => void
  getTicketDetailData: GetTicketDetailResponse
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

    // Post Create variables
    mutation,
    showErrorModal,
    closeErrorModal,
    createError,
  } = useTransferTicket(props.getTicketDetailData)

  useEffect(() => {
    if (mutation.isSuccess) {
      props.closeDetailModal()
    }
  }, [mutation.isSuccess])
  return (
    <>
      {showErrorModal && (
        <ErrorModal
          failureDescription={createError?.message}
          closeErrorModal={closeErrorModal}
        ></ErrorModal>
      )}
      <PrimaryText className="text-2xl text-center my-8">
        New Work Log
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
            {errors.new_assignee && <p className="text-xs text-red-500 mt-2">Enter valid account mail and hit Search</p>}
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
            disabled={mutation.isLoading}
            type="submit"
            className={`${
              mutation.isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
            } hover:bg-stone-50 transition-color ease-in-out duration-75 text-center border`}
          >
            {mutation.isLoading ? (
              <div className="w-6 h-6 animate-spin m-auto">
                <BiLoaderAlt size={24} />
              </div>
            ) : (
              <>Submit</>
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default Header
