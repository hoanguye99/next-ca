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
      className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md transition-all ease-in-out duration-150 focus:border-blue-primary outline-none ${props.className}`}
    />
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
}

export function TextArea<T>(props: TextAreaProps<T>){
  const {type, name, id, placeholder} = props
  return (
    <textarea
      {...{type, name, id, placeholder}}
      {...props.register(props.label, { required:props.required })}
      rows={6}
      className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md transition-all ease-in-out duration-150 focus:border-blue-primary outline-none ${props.className}`}
    />
  )
}

