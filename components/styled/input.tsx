import {
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { GetUserResponse } from '@/models/api'
import { BiLoaderAlt } from 'react-icons/bi'

interface InputProps<T> {
  type?: string
  name?: string
  id?: string
  placeholder?: string
  min?: number
  className?: string
  register: UseFormRegister<T>
  label: Path<T>
  required: boolean
}

export function Input<T>(props: InputProps<T>) {
  const { type, name, id, placeholder, min } = props
  return (
    <input
      {...{ type, name, id, placeholder }}
      {...props.register(props.label, { required: props.required })}
      min={min}
      className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md transition-all ease-in-out duration-150 focus:border-blue-primary outline-none ${props.className}`}
    />
  )
}

interface InputSearchButtonProps<T> {
  name?: string
  id?: string
  placeholder?: string
  className?: string
  register: UseFormRegister<T>
  label: Path<T>
  required: boolean
  onSearch: () => void
  loading: boolean
  getUserData: GetUserResponse | undefined
  setValue: UseFormSetValue<T>
}

export function InputSearchButton<T>(props: InputSearchButtonProps<T>) {
  const { name, id, placeholder } = props
  useEffect(() => {
    if (props.getUserData !== undefined) {
      props.setValue(
        props.label,
        props.getUserData.displayName as PathValue<T, Path<T>>,
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      )
    }
  }, [props.getUserData])
  return (
    <>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <input
          type="text"
          {...{ name, id, placeholder }}
          {...props.register(props.label, {
            required: props.required,
            validate: (value) =>
              props.getUserData !== undefined &&
              value === props.getUserData.displayName,
          })}
          className={`block w-full py-2 pl-10 pr-24 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md transition-all ease-in-out duration-150 focus:border-blue-primary outline-none ${props.className}`}
        />

        {/* <Button
          posting={props.loading}
          onClick={props.onSearch}
          type="button"
          className="absolute inset-y-1.5 right-2 text-xs"
        >
          Search
        </Button> */}
        <button
          onClick={props.onSearch}
          type="button"
          className="absolute inset-y-0 right-0 text-[12px] px-3.5 border-l bg-gray-table m-[1px] rounded-r-lg text-blue-primary transition-all duration-75 hover:text-blue-hover active:text-blue-focus"
        >
          {props.loading ? (
            <div className="w-6 h-6 animate-spin m-auto">
              <BiLoaderAlt size={24} />
            </div>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </>
  )
}

interface InputSearchProps {
  name?: string
  id?: string
  placeholder?: string
  className?: string
  value: string
  setFilter: Dispatch<SetStateAction<string>>
}

export function InputSearch(props: InputSearchProps) {
  const { name, id, placeholder } = props
  return (
    <>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <input
          type="text"
          {...{ name, id, placeholder }}
          value={props.value}
          onChange={(e) => props.setFilter(e.target.value)}
          className={`block w-full py-2 pl-10 pr-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md transition-all ease-in-out duration-150 focus:border-blue-primary outline-none ${props.className}`}
        />
      </div>
    </>
  )
}

interface InputCommentProps<T> {
  name?: string
  id?: string
  placeholder?: string
  className?: string
  register: UseFormRegister<T>
  label: Path<T>
  required: boolean
}

export function InputComment<T>(props: InputCommentProps<T>) {
  const { name, id, placeholder } = props
  return (
    <>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>

        <input
          type="text"
          {...{ name, id, placeholder }}
          {...props.register(props.label, { required: props.required })}
          className={`block w-full py-2 pl-12 text-gray-700 placeholder-gray-400 bg-white outline-none ${props.className}`}
        />
      </div>
    </>
  )
}

interface TextAreaProps<T> {
  type?: string
  name?: string
  id?: string
  placeholder?: string
  className?: string
  register: UseFormRegister<T>
  label: Path<T>
  required: boolean
  rows: number
}

export function TextArea<T>(props: TextAreaProps<T>) {
  const { type, name, id, placeholder } = props
  return (
    <textarea
      {...{ type, name, id, placeholder }}
      {...props.register(props.label, { required: props.required })}
      rows={props.rows}
      className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md transition-all ease-in-out duration-150 focus:border-blue-primary outline-none ${props.className}`}
    />
  )
}
