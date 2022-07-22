import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import UserButton from '../user-button'
import LinkTab from './link-tab'

type Props = {
  currentPath: string
  data: {
    link: string
    icon: JSX.Element
    text: string
  }[]
}

const Sidebar = (props: Props) => {
  const userDetail = useAppSelector(selectUserDetail);
  return (
    <div className="bg-white w-[230px] pt-[70px] pb-[100px] hidden lg:block border-r">
      <div className="h-full flex flex-col">
        <div className="fixed top-0 w-[230px] h-[70px] px-[25px] flex justify-center items-center">
          <button className=" w-[80px] h-[40px] bg-center bg-no-repeat bg-contain bg-[url('../public/images/FPT_logo_2010.svg.png')]"></button>
        </div>

        <nav className="h-full overflow-y-auto mt-6">
          <ul className=" flex flex-col">
            {props.data.map((item, index) => (
              <LinkTab
                key={index}
                link={item.link}
                icon={item.icon}
                text={item.text}
                selected={props.currentPath === item.link}
              />
            ))}
          </ul>
        </nav>

        <div className="fixed bottom-0 w-[230px] h-[100px] flex justify-around items-center text-gray-500 border-t">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <div>
            <UserButton></UserButton>
          </div>
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
