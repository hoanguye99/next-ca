import { useLogoutNavigate } from '@/hooks'
import { ShowDropdown } from '@/models/components/common'
import React, { useState } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import InputWithDropdown from '../common/input-with-dropdown'

interface InputDropDownProps<T> {
  type?: string
  name?: string
  id?: string
  placeholder?: string
  className?: string
  register: UseFormRegister<T>
  label: Path<T>
  required: boolean
}

export function InputDropDown<T>(props: InputDropDownProps<T>) {
  const { type, name, id, placeholder } = props
  const [showDropdown, setShowDropdown] = useState<ShowDropdown>({
    status: 0,
    style: {},
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
            autoComplete="off"
            className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md transition-all ease-in-out duration-150 focus:border-blue-primary outline-none ${props.className}`}
          />
        }
        dropdown={<Dropdown {...props} setShowDropdown={setShowDropdown} />}
      />
    </>
  )
}

interface DropdownProps {
  setShowDropdown: React.Dispatch<React.SetStateAction<ShowDropdown>>
}

const Dropdown = (props: DropdownProps) => {
  // const userDetail = useAppSelector(selectUserDetail)
  // const dispatch = useAppDispatch()
  // async function handleApproveButtonClick() {
  // }

  // async function handleRejectButtonClick() {
  //   try {
  //     props.setShowPopUp({ status: 0, style: {} })
  //     const data = await orderApi.rejectInsuranceOrder(props.id, userDetail)
  //     // console.log(data)
  //     dispatch(getAllOrdersAsync())
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // function handleDetailButtonClick() {
  //   props.setShowPopUp({ status: 0, style: {} })
  //   props.setShowDetailModal(true)
  // }

  function handleButtonClick() {
    props.setShowDropdown({ status: 0, style: {} })
  }

  return (
    <div className="bg-white rounded shadow flex flex-col text-[14px] font-extrabold w-40">
      <button
        onClick={handleButtonClick}
        className="p-4 text-gray-500 hover:text-black text-left"
      >
        Xem chi tiết
      </button>
      <button
        onClick={handleButtonClick}
        className="p-4 text-gray-500 hover:text-black text-left"
      >
        Thay đổi
      </button>
    </div>
  )
}
