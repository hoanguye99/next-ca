import { DetailModal, ErrorModal } from '@/components/common/modals'
import {
  Button,
  Input,
  InputDropDown,
  Label,
  PrimaryText,
  TextArea,
  Toggle,
} from '@/components/styled'
import { GetTicketDetailResponse } from '@/models/api'
import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { useWorkLogCreate, WorkLogCreate } from './hooks'
import WorkLogTable from './table'

interface WorkLogProps {
  getTicketDetailData: GetTicketDetailResponse
}

const WorkLog = (props: WorkLogProps) => {
  const [showAddLogModal, setShowAddLogModal] = useState(false)
  return (
    <>
      {showAddLogModal && (
        <DetailModal onClickOutside={() => setShowAddLogModal(false)}>
          <DetailModalContent
            closeDetailModal={() => {
              setShowAddLogModal(false)
            }}
            getTicketDetailData={props.getTicketDetailData}
          ></DetailModalContent>
        </DetailModal>
      )}
      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-4 flex justify-between">
          <PrimaryText className="">Work Log</PrimaryText>
          <button
            onClick={() => setShowAddLogModal(true)}
            className="text-[12px] w-fit text-blue-primary transition-all duration-75 hover:text-blue-hover active:text-blue-focus"
          >
            Add New
          </button>
        </div>
        <div className="overflow-auto">
          <WorkLogTable
            getTicketDetailData={props.getTicketDetailData}
          ></WorkLogTable>
        </div>
      </div>
    </>
  )
}

interface DetailModalContentProps {
  closeDetailModal: () => void
  getTicketDetailData: GetTicketDetailResponse
}

const DetailModalContent = (props: DetailModalContentProps) => {
  const {
    // Form
    register,
    setValue,
    getValues,
    handleSubmit,
    errors,
    handleFormSubmit,
    reset,

    getConfigWorkLogData,

    // Post Create variables
    mutation,
    showErrorModal,
    closeErrorModal,
    createError,
  } = useWorkLogCreate(props.getTicketDetailData)

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
            <Label className="block">Date</Label>
            <Input<WorkLogCreate>
              type="date"
              name="startDate"
              id="startDate"
              register={register}
              label="startDate"
              required={true}
            />
          </div>

          <div>
            <Label className="block">Hour per day</Label>
            <Input<WorkLogCreate>
              type="number"
              min={0}
              name="timeSpent"
              id="timeSpent"
              register={register}
              label="timeSpent"
              required={true}
            />
          </div>

          <div>
            <Label>Type of Work</Label>
            <InputDropDown<WorkLogCreate>
              type="text"
              name="typeOfWork"
              id="typeOfWork"
              register={register}
              label="typeOfWork"
              required={true}
              dropDownData={
                getConfigWorkLogData === undefined
                  ? []
                  : getConfigWorkLogData.typeOfWorks
              }
              setValue={setValue}
            />
          </div>

          <div>
            <Label>Phase</Label>
            <InputDropDown<WorkLogCreate>
              type="text"
              name="phaseWorklog"
              id="phaseWorklog"
              register={register}
              label="phaseWorklog"
              required={true}
              dropDownData={
                getConfigWorkLogData === undefined
                  ? []
                  : getConfigWorkLogData.phaseOfWorkLogs.map((obj) => obj.name)
              }
              setValue={setValue}
            />
          </div>

          <div>
            <Label className="block">Description</Label>
            <TextArea<WorkLogCreate>
              type="textarea"
              name="comment"
              id="comment"
              register={register}
              label="comment"
              required={true}
              rows={3}
            />
          </div>

          <div>
            <Toggle<WorkLogCreate>
              name="ot"
              id="ot"
              register={register}
              label="ot"
              required={false}
              defaultChecked={false}
            >
              Overtime
            </Toggle>
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

export default WorkLog
