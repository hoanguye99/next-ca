import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { TicketInputs } from '.'
import { Input, Label, TextArea } from '../styled'

interface Props {
  register: UseFormRegister<TicketInputs>
}

const ThirdTab = (props: Props) => {
  return (
    <div className="grid grid-cols-6 gap-6 gap-y-4">
      <div className="col-span-6">
        <Label className="block">Summary</Label>
        <Input<TicketInputs>
          type="text"
          name="summary"
          id="summary"
          register={props.register}
          label="summary"
          required={true}
        />
      </div>
      <div className="col-span-6">
        <Label className="block">Description</Label>
        <TextArea<TicketInputs>
          type="textarea"
          name="description_by_staff"
          id="description_by_staff"
          register={props.register}
          label="description_by_staff"
          required={true}
        />
      </div>
    </div>
  )
}

export default ThirdTab
