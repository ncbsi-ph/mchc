import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}result/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface LoginTypes {
  email: string;
  password: string;
}

interface AuthResponseTypes {
  email: string;
  patientno: string;
  token: string;
}

interface AuthDoctorResponseTypes {
  email: string;
  doctorcode: string;
  token: string;
}

export const login = async (
  payload: LoginTypes,
  type: string
): Promise<AuthResponseTypes> => {
  return await api.post(`${type}/login`, payload).then((res) => res.data);
};

export const logout = async (type: string) => {
  return await api.post(`${type}/logout`, {}).then((res) => res.data);
};

export const doctorRefreshToken =
  async (): Promise<AuthDoctorResponseTypes> => {
    return await api.get(`doctor/refresh-token`, {}).then((res) => res.data);
  };

export const doctorLogin = async (
  payload: LoginTypes
): Promise<AuthDoctorResponseTypes> => {
  return await api.post(`doctor/login`, payload).then((res) => res.data);
};
export const refreshToken = async (
  type: string
): Promise<AuthResponseTypes> => {
  return await api.get(`${type}/refresh-token`, {}).then((res) => res.data);
};
