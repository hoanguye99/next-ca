import React from 'react'
import { GetAllProjectsResponse, Project } from '@/models/api'
import Image from 'next/future/image'
import empty from '@/public/images/empty.jpg'
import { PrimaryText, SecondaryText } from '@/components/styled'
import styles from '@/styles/components/dashboard/scrolling-text.module.scss'
import ActionButton from './action-button'
import { UseQueryResult } from '@tanstack/react-query'
import EmptyView from '@/components/common/empty-view'

interface ProjectSummaryProps {
  getProjectSummary: UseQueryResult<GetAllProjectsResponse, unknown>
}

const ProjectSummary = (props: ProjectSummaryProps) => {
  if (props.getProjectSummary.status === 'loading') {
    return (
      <>
        {[...Array(3)].map((e, i) => (
          <ProjectViewLoading key={i}></ProjectViewLoading>
        ))}
      </>
    )
  } else if (props.getProjectSummary.status === 'success') {
    if (props.getProjectSummary.data.details.length === 0)
      return (
        <EmptyView className="text-gray-500">
          You do not have any project yet
        </EmptyView>
      )
    else
      return (
        <>
          {props.getProjectSummary.data.details.map((project) => (
            <ProjectView key={project.id} {...project} />
          ))}
        </>
      )
  } else {
    return <></>
  }
}

interface ProjectViewProps extends Project {}

const ProjectView = (props: ProjectViewProps) => {
  return (
    <div className="py-5 first:pt-0 last:pb-0 flex justify-between items-center">
      <div className="flex gap-5 flex-1">
        <Image
          src={props.image}
          alt=""
          width="64"
          height="48"
          className="shrink-0 w-[64px] h-[48px] rounded-lg"
        ></Image>
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

const ProjectViewLoading = () => {
  return (
    <div className="py-5 first:pt-0 last:pb-0 flex justify-between items-center">
      <div className="flex gap-5 flex-1">
        <div className="animate-pulse bg-slate-100 shrink-0 w-[64px] h-[48px] rounded-lg"></div>
        <div className="flex flex-col justify-between flex-1">
          <div className="animate-pulse bg-slate-100 h-5"></div>
          <div className="animate-pulse bg-slate-100 h-5"></div>
        </div>
      </div>
    </div>
  )
}

export default ProjectSummary
