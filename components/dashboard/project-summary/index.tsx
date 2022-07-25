import React from 'react'
import { GetAllProjectsResponse, Project } from '@/models/api'
import Image from 'next/future/image'
import empty from '@/public/images/empty.jpg'
import { PrimaryText, SecondaryText } from '@/components/styled'
import styles from '@/styles/components/dashboard/scrolling-text.module.scss'
import ActionButton from './action-button'

interface ProjectSummaryProps {
  data: GetAllProjectsResponse
}

const ProjectSummary = (props: ProjectSummaryProps) => {
  if (props.data.details.length === 0) return <ListEmptyView></ListEmptyView>
  else
    return (
      <>
        {props.data.details.map((project) => (
          <ProjectView key={project.id} {...project} />
        ))}
      </>
    )
}

interface ProjectViewProps extends Project {}

const ProjectView = (props: ProjectViewProps) => {
  return (
    <div className="py-5 first:pt-0 last:pb-0 flex justify-between items-center">
      <div className="flex gap-5 flex-1">
        <Image src={props.image} alt="" width="64" height="48" className="shrink-0 w-[64px] h-[48px] rounded-lg"></Image>
        <div className="flex flex-col justify-between flex-1 whitespace-nowrap overflow-hidden">
          <button className="w-fit transition-all duration-150 hover:text-blue-primary">
            <PrimaryText className="text-sm">{props.project_code}</PrimaryText>
          </button>
          <div className={styles['scrolling-text']}>
            <SecondaryText className="text-xs">{props.name}</SecondaryText>
          </div>
        </div>
      </div>
      <div className="shrink-0 ml-3">
        <ActionButton></ActionButton>
      </div>
    </div>
  )
}

const ListEmptyView = () => {
  return (
    <>
      <Image src={empty} alt="" className="w-auto h-3/4 mx-auto" />
      <p className="text-center font-thin text-lg text-gray-primary mt-5 mb-1">
        You do not have any project yet.
      </p>
    </>
  )
}

export default ProjectSummary
