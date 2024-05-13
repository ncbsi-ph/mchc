'use client';

import { ComponentSize } from '@/app/helpers';
import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
  notification,
} from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { GrFormUpload } from 'react-icons/gr';

const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
const DATE_FORMAT = 'MM/DD/YYYY';

export default function HMOApprovalForm() {
  const [healthCardList, setHealthCardList] = useState<UploadFile[] | any>();
  const [validIdList, setValidIdList] = useState<UploadFile[] | any>();
  const [isLoading, setIsLoading] = useState(false);
  const [hmoapprovalForm] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const retrieveFileThumb = (e: any) => {
    return e && e.fileList;
  };

  const handleHealthCardChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setHealthCardList(newFileList);
  };
  const handleValidIdChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setValidIdList(newFileList);
  };
  const handleSubmit = async (values: any) => {
    //   try {
    //     setIsLoading(true);
    //     const _healthCardFileList = new FormData();
    //     const _validIdFileList = new FormData();
    //     _healthCardFileList.append('file', healthCardList[0].originFileObj);
    //     _validIdFileList.append('file', validIdList[0].originFileObj);
    //     const _healthcardUploadRes = await uploadImage(
    //       _healthCardFileList,
    //       'hmo'
    //     );
    //     const _validIdUploadRes = await uploadImage(_validIdFileList, 'hmo');
    //     const payload: HmoApprovalReq = {
    //       fname: values.fname,
    //       mname: values.mname,
    //       lname: values.lname,
    //       date_of_birth: dayjs(values.date_of_birth).format(DATE_FORMAT),
    //       email: values.email,
    //       contact_no: values.contact_no,
    //       hmo_provider: values.hmo_provider,
    //       company_name: values.company_name,
    //       health_card: _healthcardUploadRes,
    //       valid_id: _validIdUploadRes,
    //     };
    //     const response = await sendHmoApprovalReq(payload);
    //     api.success({
    //       message: response,
    //       description:
    //         'Your HMO approval request has been received and successfully logged into our system. Our team is now reviewing the details provided.',
    //     });
    //     hmoapprovalForm.resetFields();
    //     setHealthCardList([]);
    //     setValidIdList([]);
    //   } catch (err: any) {
    //     if (err.response) {
    //       api.error({
    //         message: err.response?.data,
    //         description: 'Something went wrong please try again later',
    //       });
    //     } else {
    //       api.error({
    //         message: err.message,
    //         description: 'Something went wrong please try again later',
    //       });
    //     }
    //     console.log(err);
    //   } finally {
    //     setIsLoading(false);
    //   }
  };
  return (
    <div>
      {contextHolder}
      <div className="bg-primary px-5 py-6 text-white rounded-lg">
        <h2 className="text-2xl font-medium pb-5 md:text-xl">Request Form</h2>
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
            form={hmoapprovalForm}
            onFinish={handleSubmit}
          >
            <div className="md:grid md:grid-cols-2 gap-x-5">
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
                name="mname"
                label="Middle Name (optional)"
                className="!text-white"
              >
                <Input />
              </Form.Item>
            </div>

            <div className="md:grid md:grid-cols-2 gap-x-5">
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
              <Form.Item
                name="date_of_birth"
                label="Date of Birth"
                className="!text-white"
                rules={[
                  {
                    required: true,
                    message: 'Please input your date of birth',
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  showToday={false}
                  format={DATE_FORMAT}
                  placeholder={DATE_FORMAT}
                />
              </Form.Item>
            </div>

            <div className="md:grid md:grid-cols-2 gap-x-5">
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
              <Form.Item
                name="contact_no"
                label="Contact Number"
                className="!text-white"
                rules={[
                  {
                    required: true,
                    message: 'Please input your contact number',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            <Form.Item
              name="hmo_provider"
              label="HMO Provider"
              rules={[
                {
                  required: true,
                  message: 'Please select hmo provider',
                },
              ]}
            >
              {/* <Select
              options={hmo.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
              getPopupContainer={(trigger) => trigger.parentElement}
            /> */}
            </Form.Item>

            <Form.Item
              name="company_name"
              label="Company"
              rules={[
                {
                  required: true,
                  message: 'Please input the company name',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Physical/Virtual Health Card"
              extra="Only jpeg, jpg, png files. Maximum file size is 500 KB"
              valuePropName="fileList"
              name="health_card"
              getValueFromEvent={retrieveFileThumb}
              rules={[
                {
                  required: true,
                  message: 'Please add your physicalor virtual health card!',
                },
                {
                  validator(_, value) {
                    if (value && value?.length != 0 && value[0]?.size) {
                      if (value[0]?.size / 1000 <= 500) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('File size too large. Max 500 kb')
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
                name="health_card"
                showUploadList={{
                  showDownloadIcon: false,
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                }}
                beforeUpload={() => false}
                onChange={handleHealthCardChange}
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
              label="Valid ID"
              extra="Only jpeg, jpg, png files. Maximum file size is 500 KB"
              valuePropName="fileList"
              name="valid_id"
              getValueFromEvent={retrieveFileThumb}
              rules={[
                {
                  required: true,
                  message: 'Please add your valid id',
                },
                {
                  validator(_, value) {
                    if (value && value?.length != 0 && value[0]?.size) {
                      if (value[0]?.size / 1000 <= 500) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('File size too large. Max 500 kb')
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
                name="valid_id"
                showUploadList={{
                  showDownloadIcon: false,
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                }}
                beforeUpload={() => false}
                onChange={handleValidIdChange}
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
                  className="text-yellow underline cursor-pointer"
                  target="_blank"
                >
                  Terms and Conditions
                </Link>{' '}
                and the{' '}
                <Link
                  href="/privacy-policy"
                  className="text-yellow underline cursor-pointer"
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
    </div>
  );
}
