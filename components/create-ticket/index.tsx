import Link from 'next/link'
import { DetailModal, ErrorModal } from '../common/modals'
import { Button, LinkButton, PrimaryText, SecondaryText } from '../styled'
import { Section, Separator } from './common'
import FirstTab from './first-tab'
import { useTicketCreate } from './hooks'
import SecondTab from './second-tab'
import ThirdTab from './third-tab'

interface CreateTicketProps {}

const CreateTicket = (props: CreateTicketProps) => {
  const {
    // Form
    register,
    setValue,
    watchProject,
    getValues,
    handleSubmit,
    errors,
    handleFormSubmit,
    reset,

    getConfigTicketData,

    getComponentData,

    // Get User query
    fetchUserStatus,
    getUserData,
    setUser,

    // Post API variables
    showDetailModal,
    closeDetailModal,
    createData,
    createPosting,
    showErrorModal,
    closeErrorModal,
    createError,
  } = useTicketCreate()
  return (
    <>
      {showDetailModal && (
        <DetailModal closeDetailModal={closeDetailModal}>
          <DetailModalContent
            closeDetailModal={() => {
              closeDetailModal()
              reset()
            }}
            disp={createData?.idMaster.toString() || 'No Data return yet'}
          ></DetailModalContent>
        </DetailModal>
      )}

      {showErrorModal && (
        <ErrorModal
          failureDescription={createError?.message}
          closeErrorModal={closeErrorModal}
        ></ErrorModal>
      )}

      <div className="container">
        <div className="flex justify-between items-center py-6 border-b">
          <div className="">
            <SecondaryText className="text-[10px]">OVERVIEW</SecondaryText>
            <PrimaryText className="text-2xl">Create Ticket</PrimaryText>
          </div>
          <div></div>
        </div>
        <div className="py-6">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Section className="pt-0">
              <FirstTab
                register={register}
                setValue={setValue}
                errors={errors}
                getConfigTicketData={getConfigTicketData}
                watchProject={watchProject}
                getValues={getValues}
                getComponentData={getComponentData}
                fetchUserStatus={fetchUserStatus}
                getUserData={getUserData}
                setUser={setUser}
              />
            </Section>

            <Separator />

            <Section>
              <SecondTab
                register={register}
                setValue={setValue}
                getConfigTicketData={getConfigTicketData}
              />
            </Section>
            <Separator />
            <Section>
              <ThirdTab register={register} />
            </Section>

            <Section>
              <div className="flex justify-end pt-10">
                <Button posting={createPosting} className="w-fit">
                  Create Ticket
                </Button>
              </div>
            </Section>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateTicket

interface DetailModalContentProps {
  disp: string
  closeDetailModal: () => void
}

const DetailModalContent = (props: DetailModalContentProps) => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
      <div className="flex flex-col p-6 gap-12">
        <p className="mx-auto">{props.disp}</p>
        <div className="flex justify-between items-center">
          <Button
            onClick={() => props.closeDetailModal()}
            className="w-fit bg-gray-600 hover:bg-gray-500 focus:bg-gray-400 focus:ring-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </Button>
          <Link href="/home-page" passHref>
            <LinkButton>View Ticket</LinkButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
