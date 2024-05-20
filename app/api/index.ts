import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
});
export interface ContactTypes {
  fname: string;
  lname: string;
  email: string;
  contactNo: string;
  subject: string;
  message: string;
}

export interface HmoApprovalReq {
  fname: string;
  mname: string;
  lname: string;
  date_of_birth: string;
  email: string;
  contact_no: string;
  hmo_provider: string;
  company_name: string;
  health_card: string;
  valid_id: string;
}
export const uploadImage = async (
  file: FormData,
  path: string
): Promise<string> => {
  return await api
    .post(`${path}/upload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      },
    })
    .then((res) => res.data);
};

export const sendContactMail = async (
  payload: ContactTypes
): Promise<string> => {
  return await api.post('contact', payload).then((res) => res.data);
};

export const sendHmoApprovalReq = async (
  payload: HmoApprovalReq
): Promise<string> => {
  return await api.post('hmo-approval', payload).then((res) => res.data);
};

export interface SubmitAppointmentPayload {
  fname: string;
  mname: string | null;
  lname: string;
  email: string;
  contact_no: string;
  birth_date: string;
  preferred_physician: string | null;
  preferred_date: string;
  addional_message: string | null;
  laboratory: string | null;
  radiology: string | null;
  opd: string | null;
  others: string | null;
}
export const submitAppointment = async (
  payload: SubmitAppointmentPayload
): Promise<string> => {
  return await api.post('appointment', payload).then((res) => res.data);
};
export interface AppointmentServices {
  id: number;
  name: string;
}
export const getAppointmentServices = async (
  service: string
): Promise<AppointmentServices[]> => {
  return await api.get(`${service}-service`).then((res) => res.data);
};
export interface JobApplication {
  fname: string;
  lname: string;
  email: string;
  contact_no: string;
  attachment: string;
  job_position: string;
}

export const sendJobApplication = async (
  payload: JobApplication
): Promise<string> => {
  return await api.post('job-application', payload).then((res) => res.data);
};
