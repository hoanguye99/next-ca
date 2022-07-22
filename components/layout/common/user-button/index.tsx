import PopUpButton from '@/components/common/pop-up-button'
import { useLogoutNavigate } from '@/hooks'
import { ShowPopUp } from '@/models/components/common'
import React, { useState } from 'react'

interface UserButtonProps {
}

const UserButton = (props: UserButtonProps) => {
  const [showPopUp, setShowPopUp] = useState<ShowPopUp>({
    status: 0,
    style: {},
  })
  return (
    <>
      <PopUpButton
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
        button={
          <button className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        }
        popup={
          <PopUp2
            {...props}
            setShowPopUp={setShowPopUp}
          />
        }
      />
    </>
  )
}

interface PopUp2Props {
  setShowPopUp: React.Dispatch<React.SetStateAction<ShowPopUp>>
}

const PopUp2 = (props: PopUp2Props) => {
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
  const logoutNavigate = useLogoutNavigate()
  
  return <div className="bg-white rounded shadow flex flex-col text-[14px] font-extrabold w-40">
    <button className="p-4 text-gray-500 hover:text-black text-left">Profile</button>
    <button className="p-4 text-gray-500 hover:text-black text-left">Settings</button>
    <button onClick={logoutNavigate} className="p-4 text-gray-500 hover:text-black text-left border-t">Logout</button>
  </div>
}

export default UserButton
