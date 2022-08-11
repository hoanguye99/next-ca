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
import { CreateWorkLogRequestBody, CreateWorkLogResponseBody, GetTicketDetailResponse } from '@/models/api'
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { useWorkLogCreate, useWorkLogCreateMutation, WorkLogCreate } from './hooks'
import WorkLogTable from './table'

interface WorkLogWrapperProps {
  getTicketDetail: UseQueryResult<GetTicketDetailResponse, unknown>
}

const WorkLogWrapper = (props: WorkLogWrapperProps) => {
  if (props.getTicketDetail.status === 'loading') {
    return (
      <>
        <Loading></Loading>
      </>
    )
  } else if (props.getTicketDetail.status === 'error') {
    return <></>
  } else {
    return <WorkLog getTicketDetailData={props.getTicketDetail.data}></WorkLog>
  }
}

const Loading = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100">
      <div className="p-4 flex justify-between">
        <PrimaryText className="">Work Log</PrimaryText>
        <button className="text-[12px] w-fit text-blue-primary transition-all duration-75 hover:text-blue-hover active:text-blue-focus">
          Add New
        </button>
      </div>
      <div className="flex flex-col gap-4 pb-8 p-4">
        <div className="animate-pulse bg-slate-100 h-7"></div>
        <div className="animate-pulse bg-slate-100 h-7"></div>
        <div className="animate-pulse bg-slate-100 h-7"></div>
        <div className="animate-pulse bg-slate-100 h-7"></div>
      </div>
    </div>
  )
}

interface WorkLogProps {
  getTicketDetailData: GetTicketDetailResponse
}

const WorkLog = (props: WorkLogProps) => {
  const [showAddLogModal, setShowAddLogModal] = useState(false)
  const mutation = useWorkLogCreateMutation(props.getTicketDetailData)
  return (
    <>
      {showAddLogModal && (
        <DetailModal onClickOutside={() => setShowAddLogModal(false)}>
          <DetailModalContent
            closeDetailModal={() => {
              setShowAddLogModal(false)
            }}
            getTicketDetailData={props.getTicketDetailData}
            mutation={mutation}
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
  mutation: UseMutationResult<CreateWorkLogResponseBody, AxiosError<unknown, any>, CreateWorkLogRequestBody, CreateWorkLogResponseBody>
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
  } = useWorkLogCreate(props.closeDetailModal, props.getTicketDetailData, props.mutation)

  return (
    <>
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

export default WorkLogWrapper
