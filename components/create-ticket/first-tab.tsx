import { useGetComponent } from '@/hooks/query'
import { GetConfigTicketResponse } from '@/models/api'
import React, { useEffect } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { TicketInputs } from '.'
import { Input, InputDropDown, Label } from '../styled'

interface FirstTabProps {
  register: UseFormRegister<TicketInputs>
  setValue: UseFormSetValue<TicketInputs>
  getConfigTicketData: GetConfigTicketResponse | undefined
  watchProject: string
}

const FirstTab = (props: FirstTabProps) => {
  const project_id =
    props.getConfigTicketData === undefined || !props.watchProject
      ? -1
      : props.getConfigTicketData.projects.find(
          (project) => project.name === props.watchProject
        )?.project_id
  const {
    status,
    data: getComponentData,
    error,
  } = useGetComponent(props.watchProject, project_id || -1)
  if (status === 'error') console.log(error)

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
        <Input<TicketInputs>
          type="text"
          name="assignee_name"
          id="assignee_name"
          register={props.register}
          label="assignee_name"
          required={true}
        />
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
            getComponentData === undefined
              ? []
              : getComponentData.component_name.map((obj) => obj.name)
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
