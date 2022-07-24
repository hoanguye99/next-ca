import { GetAllProjectsResponse } from "@/models/api";
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
  }
};

export default staffApi;
