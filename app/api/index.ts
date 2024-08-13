import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
});

const authorizedConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

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

interface ChangePasswordPayload {
  currentPass: string;
  newPass: string;
  email: string;
}

export const changePassword = async (
  payload: ChangePasswordPayload,
  type: string,
  token: string
): Promise<string> => {
  return await api
    .post(`${type}/change-password`, payload, authorizedConfig(token))
    .then((res) => res.data);
};
export const forgotPassword = async (
  email: string,
  type: string
): Promise<string> => {
  return await api
    .post(`forgot-password/${type}`, email)
    .then((res) => res.data);
};

export interface DoctorPatient {
  id: number;
  patientno: string;
  patientname: string;
}
export const getDoctorsPatient = async (
  doctorCode: string,
  token: string
): Promise<DoctorPatient[]> => {
  return await api
    .get(`doctor/patients/${doctorCode}`, authorizedConfig(token))
    .then((res) => res.data);
};

export const viewProtectedPdf = async (
  url: string,
  token: string
): Promise<void> => {
  const response = await axios.get(url, {
    ...authorizedConfig(token),
    responseType: 'blob', // Ensure response type is set to 'blob' for binary data
  });
  const blobUrl = window.URL.createObjectURL(response.data);
  window.open(blobUrl, '_blank');
};
export interface PatientExam {
  id: number;
  examination: string;
  examid: string;
  filename: string;
  resultdate: string;
}
export const getDoctorPatientExam = async (
  doctorcode: string,
  patientno: string,
  token: string
): Promise<PatientExam[]> => {
  return await api
    .get(`doctor/patients/${doctorcode}/${patientno}`, authorizedConfig(token))
    .then((res) => res.data);
};

export interface DoctorRegister {
  fname: string;
  mname: string;
  lname: string;
  doctorcode: string;
  email: string;
  contactno: string;
  password: string;
}

export const doctorRegister = async (
  payload: DoctorRegister
): Promise<string> => {
  return await api.post('doctor/register', payload).then((res) => res.data);
};

export const getPatientExam = async (
  patietno: string,
  token: string
): Promise<PatientExam[]> => {
  return await api
    .get(`patient/${patietno}`, authorizedConfig(token))
    .then((res) => res.data);
};

export interface PatientRegister {
  patientno: string;
  lastname: string;
  firstname: string;
  middlename: string;
  email: string;
  contactno: string;
  password: string;
}

export const patientRegister = async (
  payload: PatientRegister
): Promise<string> => {
  return await api.post('patient/register', payload).then((res) => res.data);
};

export const verifyDoctor = async (token: string): Promise<string> => {
  return await api.post(`verify-email/doctor/${token}`).then((res) => res.data);
};

export const verifyPatient = async (token: string): Promise<string> => {
  return await api
    .post(`verify-email/patient/${token}`)
    .then((res) => res.data);
};

export const resetPassword = async (
  token: string,
  newPassword: string,
  type: string
): Promise<string> => {
  return await api
    .post(`forgot-password/${type}/${token}`, { newPassword: newPassword })
    .then((res) => res.data);
};
