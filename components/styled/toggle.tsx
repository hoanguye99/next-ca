import React from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { NormalText } from './text'

interface ToggleProps<T> {
  name?: string
  id?: string
  register: UseFormRegister<T>
  label: Path<T>
  required: boolean
  children: string
}

export function Toggle<T>(props: ToggleProps<T>) {
  const { name, id } = props
  return (
    <label
      htmlFor="checked-toggle"
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        {...{ name, id }}
        type="checkbox"
        id="checked-toggle"
        {...props.register(props.label, { required: props.required })}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-primary"></div>
      <NormalText className="ml-3">
        {props.children}
      </NormalText>
    </label>
  )
}
