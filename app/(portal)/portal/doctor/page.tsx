'use client';
import { Drawer, Form, Input, Table, Tooltip, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import Spinner from '../../spinner';
import HeadBar from '../../headbar';
import { useDoctor, useDoctorActions } from '@/app/store';
import { doctorRefreshToken, logout } from '@/app/api/auth';
import Cookies from 'js-cookie';
import {
  DoctorPatient,
  PatientExam,
  changePassword,
  getDoctorPatientExam,
  getDoctorsPatient,
  viewProtectedPdf,
} from '@/app/api';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { ColumnsType } from 'antd/es/table';
import { TbLayoutBottombarExpandFilled } from 'react-icons/tb';
import dayjs from 'dayjs';
import { AiOutlineFolderView } from 'react-icons/ai';

export default function Doctor() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);
  const { email, doctorCode, token } = useDoctor();
  const [isChangePass, setIsChangePass] = useState(false);
  const [changePassForm] = Form.useForm();
  const [isChangeingPass, setIsChangeingPass] = useState(false);
  const { setDoctor } = useDoctorActions();
  const router = useRouter();
  const [doctorsPatient, setDoctorPatients] = useState<DoctorPatient[]>([]);
  const [filteredDoctorPatient, setFilteredDoctorPatient] = useState<
    DoctorPatient[]
  >([]);
  const [patientData, setPatientData] = useState<PatientExam[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isPatientDataLoading, setIsPatientDataLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [doctorRecord, setDataRecord] = useState<DoctorPatient>();
  const access_token = Cookies.get('mchc_doctor_access_token');

  const refresh = useCallback(async () => {
    try {
      if (access_token) {
        setIsLoading(true);
        const response = await doctorRefreshToken(access_token);
        const { email, doctorcode, token } = response;
        setDoctor(email, doctorcode, token);
        setIsLoading(false);
      } else {
        router.push('/portal/doctor/login');
      }
    } catch (err: any) {
      if (err.response) {
        messageApi.error(err.response?.data);
      } else {
        messageApi.error('Something went wrong please try again later');
      }
      Cookies.remove('mchc_doctor_access_token');
      router.push('/portal/doctor/login');
      console.log(err);
    }
  }, [access_token, router, messageApi, setDoctor]);

  useEffect(() => {
    if (access_token) {
      refresh();
    } else {
      setIsLoading(true);
      router.push('/portal/doctor/login');
    }
  }, [access_token, refresh, router]);

  const handleLogout = async () => {
    try {
      await logout('doctor');
      Cookies.remove('mchc_doctor_access_token');
      router.push('/portal/doctor/login');
    } catch (err: any) {
      if (err.response) {
        messageApi.error(err.response?.data);
      } else {
        messageApi.error('Something went wrong please try again later');
      }
      console.log(err);
    }
  };

  const handleOpenChangePass = () => {
    setIsChangePass(true);
    changePassForm.resetFields();
  };

  const hanleCancelChangePass = () => {
    setIsChangePass(false);
  };

  const handleChangePassword = async (values: any) => {
    try {
      setIsChangeingPass(true);
      const payload = {
        currentPass: values.currentPass,
        newPass: values.newPass,
        email: email,
      };
      const response = await changePassword(payload, 'doctor', token);
      messageApi.success(response);
      setIsChangePass(false);
    } catch (err: any) {
      if (err.response) {
        messageApi.error(err.response?.data);
      } else {
        messageApi.error('Something went wrong please try again later');
      }
      console.log(err);
    } finally {
      setIsChangeingPass(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const newFilteredData = doctorsPatient?.filter((el) => {
      return el.patientname.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredDoctorPatient(newFilteredData);
  };

  const getPatients = useCallback(async () => {
    try {
      const res = await getDoctorsPatient(doctorCode, token);
      const data = res.map((item) => ({
        key: item.id,
        ...item,
      }));

      setDoctorPatients(data);
      setFilteredDoctorPatient(data);
    } catch (err: any) {
      if (err.response) {
        messageApi.error(err.response?.data);
      } else {
        messageApi.error('Something went wrong please try again later');
      }
      console.log(err);
    } finally {
      setIsDataLoading(false);
    }
  }, [doctorCode, token, messageApi]);

  useEffect(() => {
    if (!isLoading) {
      getPatients();
    }
  }, [isLoading, getPatients]);

  const getPatientResults = async (doctorcode: string, patientNo: string) => {
    try {
      const res = await getDoctorPatientExam(doctorcode, patientNo, token);
      const data = res.map((item) => ({
        key: item.id,
        ...item,
      }));
      setPatientData(data);
    } catch (err: any) {
      if (err.response) {
        messageApi.error(err.response?.data);
      } else {
        messageApi.error('Something went wrong please try again later');
      }
      console.log(err);
    } finally {
      setIsDataLoading(false);
      setIsPatientDataLoading(false);
    }
  };
  const handleOpenDrawer = (record: DoctorPatient) => {
    getPatientResults(doctorCode, record.patientno);
    setIsDrawerOpen(true);
    setDataRecord(record);
  };
  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const columns: ColumnsType<DoctorPatient> = [
    {
      title: 'Patient Number',
      dataIndex: 'patientno',
      key: 'patientno',
      width: 170,
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientname',
      key: 'patientname',
      width: 170,
      sorter: (a, b) =>
        a.patientname.toLowerCase() < b.patientname.toLowerCase() ? 1 : -1,
      defaultSortOrder: 'descend',
    },
    {
      key: 'action',
      width: 60,
      fixed: 'right',
      render: (_, record) => (
        <div className="grid justify-center">
          <Tooltip title="View">
            <p
              className="text-2xl cursor-pointer grid text-center text-primary"
              onClick={() => handleOpenDrawer(record)}
            >
              <TbLayoutBottombarExpandFilled />
            </p>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-milk h-screen">
      {contextHolder}
      {!isLoading ? (
        <>
          <HeadBar
            user={email}
            onLogout={handleLogout}
            open={isChangePass}
            form={changePassForm}
            loading={isChangeingPass}
            onClick={handleOpenChangePass}
            onCancel={hanleCancelChangePass}
            onSubmit={handleChangePassword}
          />
          <div className="bg-white p-3 mt-10 mx-2 rounded-md md:container">
            <div className="pb-3 grid justify-end">
              <Input
                prefix={<BsSearch className="text-slate-400 mr-1" />}
                placeholder="Search for Patient name"
                allowClear
                onChange={handleSearch}
              />
            </div>
            <Table
              columns={columns}
              dataSource={filteredDoctorPatient}
              loading={isDataLoading}
              scroll={{ x: true }}
            />
          </div>
          <PatientDrawer
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            record={doctorRecord}
            patientData={patientData}
            loading={isPatientDataLoading}
            token={token}
          />
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
}

interface PatientDrawerProps {
  open: boolean;
  onClose: () => void;
  record?: DoctorPatient | undefined;
  patientData: PatientExam[];
  loading: boolean;
  token: string;
}

const PatientDrawer = ({
  open,
  onClose,
  record,
  patientData,
  loading,
  token,
}: PatientDrawerProps) => {
  const [screenHeight, setScreenHeight] = useState(0);
  const [filterdData, setFilteredData] = useState<PatientExam[]>([]);

  const handleViewPDF = async (value: string) => {
    try {
      await viewProtectedPdf(value, token);
    } catch (error) {
      console.error('Error fetching the PDF:', error);
    }
  };

  const patientColumns: ColumnsType<PatientExam> = [
    {
      title: 'ID',
      dataIndex: 'examid',
      key: 'examid',
      width: 170,
    },
    {
      title: 'Examination',
      dataIndex: 'examination',
      key: 'examination',
      width: 170,
    },
    {
      title: 'Date Released',
      dataIndex: 'resultdate',
      key: 'resultdate',
      sorter: (a, b) => dayjs(a.resultdate).unix() - dayjs(b.resultdate).unix(),
      render: (value) => dayjs(value).format('MMMM DD, YYYY'),
      width: 170,
      defaultSortOrder: 'descend',
    },
    {
      dataIndex: 'filename',
      key: 'filename',
      fixed: 'right',
      width: 60,
      render: (value) => (
        <div className="grid justify-center">
          <Tooltip title="PDF file">
            <a
              onClick={() => handleViewPDF(value)}
              className="text-2xl cursor-pointer grid text-center text-primary"
            >
              <AiOutlineFolderView />
            </a>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setFilteredData(patientData);
  }, [patientData]);

  useEffect(() => {
    const updateHeight = () => {
      const innerHeight = window.innerHeight;
      const seventyPercentHeight = Math.ceil((80 / 100) * innerHeight);

      setScreenHeight(seventyPercentHeight);
    };
    window.addEventListener('resize', updateHeight);
    updateHeight();

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const handleSearch = (e: any) => {
    let value = e.target.value;
    const newFilteredData = patientData?.filter((el) => {
      return el.examination.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredData(newFilteredData);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="bottom"
      height={screenHeight}
      title={record?.patientname}
      styles={{
        header: {
          display: 'grid',
          justifyContent: 'end',
        },
      }}
    >
      <div className="md:container w-full">
        <div className="pb-3 grid justify-end">
          <Input
            prefix={<BsSearch className="text-slate-400 mr-1" />}
            placeholder="Search Examination"
            allowClear
            onChange={handleSearch}
          />
        </div>
        <Table
          columns={patientColumns}
          dataSource={filterdData}
          loading={loading}
          scroll={{ x: true }}
        />
      </div>
    </Drawer>
  );
};
