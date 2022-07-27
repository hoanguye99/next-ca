import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, PrimaryText, SecondaryText, InputDropDown } from '../styled'

interface TicketInputs {
  temp: string
  temp2: string
}


interface CreateTicketProps {}

const CreateTicket = (props: CreateTicketProps) => {

  const { register, handleSubmit } = useForm<TicketInputs>()
  return (
    <div className="container">
      <div className="flex justify-between items-center py-6 border-b">
        <div className="">
          <SecondaryText className="text-[10px]">OVERVIEW</SecondaryText>
          <PrimaryText className="text-2xl">Create Ticket</PrimaryText>
        </div>
        <Button className="!transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg text-sm">
          Create Report
        </Button>
      </div>
      <div className="py-6">
        <Label htmlFor="fromDate">Regular User Input</Label>
        <Input<TicketInputs>
              type="text"
              name="fromDate"
              id="fromDate"
              register={register}
              label="temp"
              required={true}
            />
        <Label htmlFor="temp2">Input with dropdown</Label>
        <InputDropDown<TicketInputs>
              type="text"
              name="temp2"
              id="temp2"
              register={register}
              label="temp2"
              required={true}
            />
      </div>
    </div>
  )
}

export default CreateTicket
