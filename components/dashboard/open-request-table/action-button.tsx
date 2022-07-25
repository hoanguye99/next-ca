import PopUpButton from '@/components/common/pop-up-button'
import { useLogoutNavigate } from '@/hooks'
import { ShowPopUp } from '@/models/components/common'
import React, { useState } from 'react'

interface ActionButtonProps {}

const ActionButton = (props: ActionButtonProps) => {
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
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        }
        popup={<PopUp2 {...props} setShowPopUp={setShowPopUp} />}
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


  function handleButtonClick() {
    props.setShowPopUp({ status: 0, style: {} })
  }

  return (
    <div className="bg-white rounded shadow flex flex-col text-[14px] font-extrabold w-40">
      <button onClick={handleButtonClick} className="p-4 text-gray-500 hover:text-black text-left">
        Xem chi tiết
      </button>
      <button onClick={handleButtonClick} className="p-4 text-gray-500 hover:text-black text-left">
        Thay đổi
      </button>
    </div>
  )
}

export default ActionButton
