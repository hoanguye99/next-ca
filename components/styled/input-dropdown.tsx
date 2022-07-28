import { useLogoutNavigate } from '@/hooks'
import { ShowDropdown } from '@/models/components/common'
import React, { useState } from 'react'
import { Path, PathValue, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import InputWithDropdown from '../common/input-with-dropdown'
import { NormalText } from './text'

interface InputDropDownProps<T> {
  type?: string
  name?: string
  id?: string
  placeholder?: string
  className?: string
  disabled? :boolean
  register: UseFormRegister<T>
  label: Path<T>
  required: boolean
  dropDownData: PathValue<T, Path<T>>[]
  setValue: UseFormSetValue<T>
}

export function InputDropDown<T>(props: InputDropDownProps<T>) {
  const { type, name, id, placeholder, disabled } = props
  const [showDropdown, setShowDropdown] = useState<ShowDropdown>({
    status: 0,
  })
  return (
    <>
      <InputWithDropdown
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        button={
          <input
            {...{ type, name, id, placeholder }}
            {...props.register(props.label, { required: props.required })}
            readOnly={true}
            disabled={disabled}
            autoComplete="off"
            className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md transition-all ease-in-out duration-150 focus:border-blue-primary outline-none ${props.className}`}
          />
        }
        dropdown={<Dropdown<T> setShowDropdown={setShowDropdown} {...props} />}
      />
    </>
  )
}

interface DropdownProps<T> extends InputDropDownProps<T> {
  setShowDropdown: React.Dispatch<React.SetStateAction<ShowDropdown>>
}

function Dropdown<T>(props: DropdownProps<T>) {

  function handleButtonClick(val: PathValue<T, Path<T>>) {
    props.setShowDropdown({ status: 0 })
    props.setValue(props.label, val, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return (
    <div className="bg-white rounded shadow-lg border flex flex-col">
      {props.dropDownData.map((val) => (
        <button
          key={val as string}
          onClick={(e) => handleButtonClick(val)}
          className="p-4 text-left hover:bg-gray-100"
        >
          <NormalText className="text-xs">{val as string}</NormalText>
        </button>
      ))}
    </div>
  )
}
