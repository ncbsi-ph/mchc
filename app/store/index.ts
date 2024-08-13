import { create } from 'zustand';

interface PatientUserStoreProps {
  isPatientLoggedIn: boolean;
  email: string;
  patientNo: string;
  token: string;
  actions: {
    setUser: (email: string, patientNo: string, token: string) => void;
    setPatientLoggedIn: (log: boolean) => void;
  };
}

interface DoctorStoreProps {
  email: string;
  doctorCode: string;
  token: string;
  actions: {
    setDoctor: (email: string, doctorCode: string, token: string) => void;
  };
}

const usePatientUserStore = create<PatientUserStoreProps>((set) => ({
  isPatientLoggedIn: false,
  email: '',
  patientNo: '',
  token: '',
  actions: {
    setUser: (email, patientNo, token) =>
      set(() => ({
        email,
        patientNo,
        token,
      })),
    setPatientLoggedIn: (log) => set(() => ({ isPatientLoggedIn: log })),
  },
}));

export const usePatientUser = () => usePatientUserStore((state) => state);
export const usePatientUserActions = () =>
  usePatientUserStore((state) => state.actions);

const useDoctorStore = create<DoctorStoreProps>((set) => ({
  email: '',
  doctorCode: '',
  token: '',
  actions: {
    setDoctor: (email: string, doctorCode: string, token: string) =>
      set(() => ({
        email,
        doctorCode,
        token,
      })),
  },
}));

export const useDoctor = () => useDoctorStore((state) => state);
export const useDoctorActions = () => useDoctorStore((state) => state.actions);
