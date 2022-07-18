import { Path, UseFormRegister } from "react-hook-form";
import React from 'react'

interface InputProps<T> {
  type?: string
  name?: string
  id?: string
  placeholder?: string
  className?: string
  register: UseFormRegister<T>
  label: Path<T>
  required: boolean
}

export function Input<T>(props: InputProps<T>){
  const {type, name, id, placeholder} = props
  return (
    <input
      {...{type, name, id, placeholder}}
      {...props.register(props.label, { required:props.required })}
      className={` block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${props.className}`}
    />
  )
}
