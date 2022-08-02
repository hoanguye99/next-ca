import { useRouter } from "next/router"
import Header from "./header"

const TicketDetail = () => {
  const router = useRouter()
  const { ticketType, ticketSlugId } = router.query

  return (
    <div className="container">
      <Header />
      <div className="py-6">Hold up {ticketSlugId}</div>
    </div>
  )
}

export default TicketDetail
