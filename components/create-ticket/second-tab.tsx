import { GetConfigTicketResponse } from '@/models/api'
import React from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Input, InputDropDown, Label, Toggle } from '../styled'
import { TicketInputs } from './hooks'

interface SecondTabProps {
  register: UseFormRegister<TicketInputs>
  setValue: UseFormSetValue<TicketInputs>
  getConfigTicketData: GetConfigTicketResponse | undefined
}

const SecondTab = (props: SecondTabProps) => {
  return (
    <div className="grid grid-cols-6 gap-6 gap-y-4">
      <div className="col-span-6 sm:col-span-3">
        <Label>Group</Label>
        <InputDropDown<TicketInputs>
          type="text"
          name="group"
          id="group"
          register={props.register}
          label="group"
          required={true}
          dropDownData={
            props.getConfigTicketData === undefined
              ? []
              : props.getConfigTicketData.group.map((obj) => obj.group_name)
          }
          setValue={props.setValue}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <Label>Priority</Label>
        <InputDropDown<TicketInputs>
          type="text"
          name="priority"
          id="priority"
          register={props.register}
          label="priority"
          required={true}
          dropDownData={
            props.getConfigTicketData === undefined
              ? []
              : props.getConfigTicketData.priority.map(
                  (obj) => obj.name_priority
                )
          }
          setValue={props.setValue}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <Label>Request Type</Label>
        <InputDropDown<TicketInputs>
          type="text"
          name="request_type"
          id="request_type"
          register={props.register}
          label="request_type"
          required={true}
          dropDownData={
            props.getConfigTicketData === undefined
              ? []
              : props.getConfigTicketData.request.map(
                  (obj) => obj.request_type_name
                )
          }
          setValue={props.setValue}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <Label>Sizing</Label>
        <InputDropDown<TicketInputs>
          type="text"
          name="sizing"
          id="sizing"
          register={props.register}
          label="sizing"
          required={true}
          dropDownData={
            props.getConfigTicketData === undefined
              ? []
              : props.getConfigTicketData.sizing.map((obj) => obj.name)
          }
          setValue={props.setValue}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <Label className="block">Activity Date</Label>
        <Input<TicketInputs>
          type="date"
          name="activity_date"
          id="activity_date"
          register={props.register}
          label="activity_date"
          required={true}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <Label className="block">Due date</Label>
        <Input<TicketInputs>
          type="date"
          name="resolved_date"
          id="resolved_date"
          register={props.register}
          label="resolved_date"
          required={true}
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <Label className="block">Time Spent (Hours)</Label>
        <Input<TicketInputs>
          type="number"
          min={0}
          name="time_spent"
          id="time_spent"
          register={props.register}
          label="time_spent"
          required={true}
        />
      </div>
      <div className="col-span-6 sm:col-span-3 mt-10 ml-5">
        <Toggle<TicketInputs>
          name="scope"
          id="scope"
          register={props.register}
          label="scope"
          required={false}
        >
          Scope
        </Toggle>
      </div>
    </div>
  )
}

export default SecondTab
