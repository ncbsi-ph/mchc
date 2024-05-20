'use client';
import { CareerTypes } from '@/app/(general)/careers/[...slug]/page';
import { JobApplication, sendJobApplication, uploadImage } from '@/app/api';
import { ComponentSize } from '@/app/helpers';

import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
  notification,
} from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import { GrFormUpload } from 'react-icons/gr';

interface CareerClientProps {
  data: CareerTypes;
}

const DATE_FORMAT = 'MMMM DD, YYYY';
export default function CareerClient({ data }: CareerClientProps) {
  return (
    <div className="grid lg:container lg:grid-cols-2 lg:gap-x-5">
      <div className="container">
        <ul className="bg-milk px-6 py-5 rounded-sm flex flex-wrap justify-between gap-3 text-slate-500">
          <li>
            <span className="block font-medium text-altBlack pb-2">Slots</span>
            {data.slots}
          </li>
          <li>
            {' '}
            <span className="block font-medium text-altBlack pb-2">
              Salary Range
            </span>{' '}
            {data.salary_range}
          </li>
          <li>
            {' '}
            <span className="block font-medium text-altBlack pb-2">
              Job Type
            </span>{' '}
            {data.job_type}
          </li>
          <li>
            {' '}
            <span className="block font-medium text-altBlack pb-2">
              Date Posted
            </span>{' '}
            {dayjs(data.date_modified).format(DATE_FORMAT)}
          </li>
        </ul>
        <div className="py-10 grid gap-y-5">
          <div>
            <h2 className="text-2xl font-medium pb-1 md:text-xl">
              Job Summary
            </h2>
            <p>{data.job_summary}</p>
          </div>
          <div>
            <h2 className="text-2xl font-medium pb-1 md:text-xl">
              Qualifications
            </h2>
            <ul className="grid gap-y-1">
              <li>
                <span className="font-medium">
                  Minimum Educational Attainment:
                </span>
                {data.educ_attainment}
              </li>
              <li>
                <span className="font-medium">Work Experience:</span>
                {data.work_exp}
              </li>
              <li>
                <span className="font-medium">Skills:</span>
                {data.skills}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ApplicationForm jobTitle={data.title} />
    </div>
  );
}
const acceptedFormats = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

interface ApplicationFormProps {
  jobTitle: string;
}

const ApplicationForm = ({ jobTitle }: ApplicationFormProps) => {
  const [fileList, setFileList] = useState<UploadFile[] | any>();
  const [isLoading, setIsLoading] = useState(false);
  const [careerForm] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const retrieveFileThumb = (e: any) => {
    return e && e.fileList;
  };

  const handleFileChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const _fileList = new FormData();
      _fileList.append('file', fileList[0].originFileObj);
      const _uploadRes = await uploadImage(_fileList, 'career');
      const payload: JobApplication = {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        contact_no: values.contact_no,
        attachment: _uploadRes,
        job_position: jobTitle,
      };
      const response = await sendJobApplication(payload);
      api.success({
        message: response,
        description:
          'Your job application has been received and successfully logged into our system. Our team is now reviewing the details provided.',
      });
      careerForm.resetFields();
      setFileList([]);
    } catch (err: any) {
      if (err.response) {
        api.error({
          message: err.response?.data,
          description: 'Something went wrong please try again later',
        });
      } else {
        api.error({
          message: err.message,
          description: 'Something went wrong please try again later',
        });
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const validatePhoneNumber = (rule: any, value: string) => {
    const phoneNumber = String(value);
    if (!phoneNumber.startsWith('09') || phoneNumber.length !== 11) {
      return Promise.reject('Invalid phone number');
    }
    return Promise.resolve();
  };
  return (
    <div className="bg-primary px-5 py-6 text-white rounded-md">
      {contextHolder}
      <h2 className="text-2xl font-medium pb-5 md:text-xl">Application Form</h2>
      <ConfigProvider
        theme={{
          token: {
            colorTextDescription: '#FFFFFF',
          },
          components: {
            Form: {
              labelColor: '#FFFFFF',
              labelFontSize: 16,
            },
          },
        }}
      >
        <Form
          size={ComponentSize()}
          layout="vertical"
          onFinish={handleSubmit}
          form={careerForm}
        >
          <div>
            <Form.Item
              name="fname"
              label="First Name"
              className="!text-white"
              rules={[
                {
                  required: true,
                  message: 'Please input your first name',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lname"
              label="Last Name"
              className="!text-white"
              rules={[
                {
                  required: true,
                  message: 'Please input your last name',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="contact_no"
              label="Contact Number"
              className="!text-white"
              rules={[
                {
                  required: true,
                  message: 'Please input your contact number',
                },
                {
                  validator: validatePhoneNumber,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              className="!text-white"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input your email',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            label="Attachment"
            extra="Only accepts .pdf, .doc and .docx files. Maximum file size is 1MB"
            valuePropName="fileList"
            name="health_card"
            getValueFromEvent={retrieveFileThumb}
            rules={[
              {
                required: true,
                message: 'Please add your attachment',
              },
              {
                validator(_, value) {
                  if (value && value?.length != 0 && value[0]?.size) {
                    if (value[0]?.size / 1000 <= 1000) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('File size too large. Max 1 MB')
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Upload
              accept={acceptedFormats.join()}
              maxCount={1}
              name="attachment"
              showUploadList={{
                showDownloadIcon: false,
                showPreviewIcon: false,
                showRemoveIcon: true,
              }}
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              <Button>
                <div className="flex items-center gap-1">
                  <GrFormUpload className="text-lg" />
                  <p>Upload</p>
                </div>
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="aggrement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          'Please accept the terms and conditions and the privacy policy'
                        )
                      ),
              },
            ]}
          >
            <Checkbox className="!text-white">
              I agree to the{' '}
              <Link
                href="/terms-and-conditions"
                className="text-secondary underline cursor-pointer"
                target="_blank"
              >
                Terms and Conditions
              </Link>{' '}
              and the{' '}
              <Link
                href="/privacy-policy"
                className="text-secondary underline cursor-pointer"
                target="_blank"
              >
                Privacy Policy
              </Link>
              .
            </Checkbox>
          </Form.Item>
          <div>
            <Button htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};
