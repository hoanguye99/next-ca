import { CreateLogCommentBody, CreateLogCommentResponse, CreateTicketRequestBody, CreateTicketResponse, CreateWorkLogRequestBody, CreateWorkLogResponseBody, GetAllProjectsResponse, GetAllTicketStatusByStaffResponse, GetChangeStatusResponse, GetComponentResponse, GetConfigTicketResponse, GetConfigWorkLogResponse, GetTicketDetailResponse, GetTimeSpentResponse, GetUserResponse, TransferTicketRequestBody, TransferTicketResponse, TransitionStatusRequestBody, TransitionStatusResponse } from "@/models/api";
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

  getConfigTicket(userDetail: UserDetail): Promise<GetConfigTicketResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = '/staff/getConfigTicket';
    return axiosClient.get(url, config);
  },

  getComponent(userDetail: UserDetail, project_id: number): Promise<GetComponentResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/staff/project/${project_id}/component`;
    return axiosClient.get(url, config);
  },

  createTicket(userDetail: UserDetail, createTicketBody: CreateTicketRequestBody): Promise<CreateTicketResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/staff/createTicketByStaff`;
    return axiosClient.post(url, createTicketBody, config);
  },

  getUser(userDetail: UserDetail, username: string) : Promise<GetUserResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/staff/findByUser/${username}`;
    return axiosClient.get(url, config);
  },

  getTicketDetail(userDetail: UserDetail, ticketId: string) : Promise<GetTicketDetailResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/staff/getDetailsTicket/${ticketId}`;
    return axiosClient.get(url, config);
  },

  getConfigWorkLog(userDetail: UserDetail) : Promise<GetConfigWorkLogResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/staff/getConfigWorkLog`;
    return axiosClient.get(url, config);
  },

  createWorkLog(userDetail: UserDetail, issue_key: string, createWorkLogBody: CreateWorkLogRequestBody): Promise<CreateWorkLogResponseBody> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/staff/addWorkLog/${issue_key}/`;
    return axiosClient.put(url, createWorkLogBody, config);
  },

  transferTicket(userDetail: UserDetail, issue_id: string, transferTicketBody: TransferTicketRequestBody): Promise<TransferTicketResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/staff/updateTransferTicket/${issue_id}`;
    return axiosClient.put(url, transferTicketBody, config);
  },

  getChangeStatus(userDetail: UserDetail, issue_id: string) : Promise<GetChangeStatusResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/staff/getIssueId/${issue_id}`;
    return axiosClient.get(url, config);
  },

  transitionStatus(userDetail: UserDetail, issue_id: string, transitionStatusBody: TransitionStatusRequestBody): Promise<TransitionStatusResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/staff/ticket/${issue_id}/transition/`;
    return axiosClient.put(url, transitionStatusBody, config);
  },

  createLogComment(userDetail: UserDetail, issue_key: string, createLogCommentBody: CreateLogCommentBody): Promise<CreateLogCommentResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/staff/addComment/${issue_key}`;
    return axiosClient.post(url, createLogCommentBody, config);
  },

};

export default staffApi;
