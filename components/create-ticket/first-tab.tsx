import { useGetComponent } from '@/hooks/query'
import { useGetUser } from '@/hooks/query/userGetUser'
import { GetComponentResponse, GetConfigTicketResponse, GetUserResponse } from '@/models/api'
import { FetchStatus } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { DeepRequired, FieldErrorsImpl, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Input, InputDropDown, InputSearchButton, Label } from '../styled'
import { TicketInputs } from './hooks'

interface FirstTabProps {
  register: UseFormRegister<TicketInputs>
  setValue: UseFormSetValue<TicketInputs>
  errors: FieldErrorsImpl<DeepRequired<TicketInputs>>
  getConfigTicketData: GetConfigTicketResponse | undefined
  watchProject: string
  getValues: UseFormGetValues<TicketInputs>
  getComponentData: GetComponentResponse | undefined
  fetchUserStatus: FetchStatus
  getUserData: GetUserResponse | undefined
  setUser: Dispatch<SetStateAction<string>>
}

const FirstTab = (props: FirstTabProps) => {
  useEffect(() => {
    props.setValue('component_name', '')
  }, [props.watchProject])
  return (
    <div className="grid grid-cols-6 gap-6 gap-y-4">
      <div className="col-span-6 sm:col-span-3">
        <Label>Customer Name</Label>
        <Input<TicketInputs>
          type="text"
          name="customer_name"
          id="customer_name"
          register={props.register}
          label="customer_name"
          required={true}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <Label>Assignee Name</Label>
        <InputSearchButton<TicketInputs>
          name="assignee_name"
          id="assignee_name"
          placeholder="Search Staff"
          register={props.register}
          label="assignee_name"
          required={true}
          onSearch={() => props.setUser(props.getValues("assignee_name"))}
          loading={props.fetchUserStatus === 'fetching'}
          getUserData={props.getUserData}
          setValue={props.setValue}
        />
        {props.errors.assignee_name && <p className="text-xs text-red-500 mt-2">Enter valid account mail and hit Search</p>}
      </div>
      <div className="col-span-6 sm:col-span-3">
        <Label>Project</Label>
        <InputDropDown<TicketInputs>
          type="text"
          name="project"
          id="project"
          register={props.register}
          label="project"
          required={true}
          dropDownData={
            props.getConfigTicketData === undefined
              ? []
              : props.getConfigTicketData.projects.map((obj) => obj.name)
          }
          setValue={props.setValue}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <Label>Component</Label>
        <InputDropDown<TicketInputs>
          type="text"
          name="component_name"
          id="component_name"
          register={props.register}
          label="component_name"
          required={true}
          disabled={!props.watchProject}
          dropDownData={
            props.getComponentData === undefined
              ? []
              : props.getComponentData.component_name.map((obj) => obj.name)
          }
          setValue={props.setValue}
          className={
            !props.watchProject ? 'cursor-not-allowed bg-gray-100' : ''
          }
        />
      </div>
    </div>
  )
}

export default FirstTab
