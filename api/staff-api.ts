import { GetAllProjectsResponse, GetAllTicketStatusByStaffResponse, GetTimeSpentResponse } from "@/models/api";
import { UserDetail } from "@/models/features";
import axiosClient from "./axios-client";


const staffApi = {
  getAllProjects(userDetail: UserDetail): Promise<GetAllProjectsResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = '/staff/getAllProjects';
    return axiosClient.get(url, config);
  },

  getAllTicketStatusByStaff(userDetail: UserDetail): Promise<GetAllTicketStatusByStaffResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = '/staff/ticketStatusAllByStaff';
    return axiosClient.get(url, config);
  },

  getTimeSpent(userDetail: UserDetail): Promise<GetTimeSpentResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = '/staff/getTimeSpent';
    return axiosClient.get(url, config);
  },
};

export default staffApi;
