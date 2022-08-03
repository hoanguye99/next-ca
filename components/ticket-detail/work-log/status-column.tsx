import { RequestDetail } from "@/models/api"
import ActionButton from "./action-button"

interface StatusColumnProps extends RequestDetail {}

export const StatusColumn = (props: StatusColumnProps) => {
  return (
    <div className="flex justify-between items-center !pr-3">
      <span>{props.status_id}</span>
      {<ActionButton {...props} />}
    </div>
  )
}
