import { useGetConfigTicket } from '@/hooks/query'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input, PrimaryText, SecondaryText, Toggle } from '../styled'
import { Section, Separator } from './common'
import FirstTab from './first-tab'
import SecondTab from './second-tab'
import ThirdTab from './third-tab'

export interface TicketInputs {
  customer_name: string
  assignee_name: string
  project: string
  component_name: string

  group: string
  priority: string
  request_type: string
  sizing: string
  scope: number
  resolved_date: string

  summary: string
  description_by_staff: string
}

interface CreateTicketProps {}

const CreateTicket = (props: CreateTicketProps) => {
  const { status, data: getConfigTicketData, error } = useGetConfigTicket()
  if (status === 'error') console.log(error)

  const { register, setValue, watch, handleSubmit } = useForm<TicketInputs>()
  const watchProject = watch('project', '')

  const handleFormSubmit: SubmitHandler<TicketInputs> = async (data) => {
    console.log(data);
  }

  return (
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
              getConfigTicketData={getConfigTicketData}
              watchProject={watchProject}
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
              <Button className="w-fit" posting={false}>
                Create Ticket
              </Button>
            </div>
          </Section>
        </form>
      </div>
    </div>
  )
}

export default CreateTicket
