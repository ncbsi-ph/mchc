'use client';

import { usePatientUser, usePatientUserActions } from '@/app/store';
import { Form, Input, Table, Tooltip, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import {
  PatientExam,
  changePassword,
  getPatientExam,
  viewProtectedPdf,
} from '@/app/api';
import HeadBar from '../../headbar';
import { BsSearch } from 'react-icons/bs';
import Spinner from '../../spinner';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { AiOutlineFolderView } from 'react-icons/ai';
import { logout, refreshToken } from '@/app/api/auth';

export default function Patient() {
  const { setUser } = usePatientUserActions();
  const { email, patientNo, token } = usePatientUser();
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [data, setData] = useState<PatientExam[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<PatientExam[]>([]);
  const [isChangePass, setIsChangePass] = useState(false);
  const [isChangeingPass, setIsChangeingPass] = useState(false);
  const [changePassForm] = Form.useForm();
  const access_token = Cookies.get('mchc_patient_access_token');

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

  const refresh = useCallback(async () => {
    try {
      if (access_token) {
        setIsLoading(true);
        const response = await refreshToken('patient', access_token);
        const { email, patientno, token } = response;
        setUser(email, patientno, token);
        setIsLoading(false);
      } else {
        router.push('/portal/patient/login');
      }
    } catch (err: any) {
      if (err.response) {
        messageApi.error(err.response?.data);
      } else {
        messageApi.error('Something went wrong please try again later');
      }
      Cookies.remove('mchc_patient_access_token');
      router.push('/portal/patient/login');
      console.log(err);
    }
  }, [access_token, router, messageApi, setUser]);

  useEffect(() => {
    if (access_token) {
      refresh();
    } else {
      setIsLoading(true);
      router.push('/portal/patient/login');
    }
  }, [access_token, refresh, router]);

  const getPatientResults = useCallback(async () => {
    try {
      const res = await getPatientExam(patientNo, token);
      const data = res.map((item) => ({
        key: item.id,
        ...item,
      }));
      setData(data);
      setFilteredData(data);
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
  }, [patientNo, messageApi, token]);

  useEffect(() => {
    if (!isLoading) {
      getPatientResults();
    }
  }, [isLoading, getPatientResults]);

  const handleLogout = async () => {
    try {
      await logout('patient');
      Cookies.remove('mchc_patient_access_token');
      router.push('/portal/patient/login');
    } catch (err: any) {
      if (err.response) {
        messageApi.error(err.response?.data);
      } else {
        messageApi.error('Something went wrong please try again later');
      }
      console.log(err);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const newFilteredData = data?.filter((el) => {
      return el.examination.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredData(newFilteredData);
  };

  const handleOpenChangePass = () => {
    setIsChangePass(true);
    changePassForm.resetFields();
  };
  const hanleCancelChangePass = () => {
    setIsChangePass(false);
  };

  const handleChangePassword = async (values: any) => {
    console.log(values.currentPass, values.newPass);
    try {
      setIsChangeingPass(true);
      const payload = {
        currentPass: values.currentPass,
        newPass: values.newPass,
        email: email,
      };
      const response = await changePassword(payload, 'patient', token);
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
                placeholder="Search Examination"
                allowClear
                onChange={handleSearch}
              />
            </div>
            <Table
              columns={patientColumns}
              dataSource={filteredData}
              loading={isDataLoading}
              scroll={{ x: true }}
            />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
}
