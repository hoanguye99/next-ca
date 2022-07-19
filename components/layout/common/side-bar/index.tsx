import LinkTab from './link-tab'

type Props = {
  currentPath: string
  data: {
    link: string
    icon: JSX.Element
    text: string
  }[]
  handleLogoutButton: () => void
}

const Sidebar = (props: Props) => {
  return (
    <div className="bg-white w-[230px] pt-[70px] hidden lg:block border-r">
      <div className="h-full flex flex-col">
        <div className="fixed top-0 w-[230px] h-[70px] px-[25px] flex justify-center items-center">
          <button className=" w-[80px] h-[40px] bg-center bg-no-repeat bg-contain bg-[url('../public/images/FPT_logo_2010.svg.png')]">
          </button>
        </div>
        <nav className="h-full overflow-y-auto pt-6">
          <ul className="h-full flex flex-col">
            {props.data.map((item, index) => (
              <LinkTab
                key={index}
                link={item.link}
                icon={item.icon}
                text={item.text}
                selected={props.currentPath === item.link}
              />
            ))}

            <li className="block group mt-72 border-y hover:bg-gray-50">
              <button
                onClick={props.handleLogoutButton}
                className="inline-block w-full py-3 px-[25px]"
              >
                <div
                  className={`flex items-center text-gray-500 group-hover:text-black text-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="ml-2 text-link-tab">Đăng xuất</span>
                </div>
              </button>
            </li>


          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
