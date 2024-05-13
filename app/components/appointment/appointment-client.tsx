'use client';

import { ComponentSize } from '@/app/helpers';
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface OptTypes {
  label: string;
  value: string;
}

const bg = '#E18E26';
const text = '#FFFFFF';

export default function AppointmentClientForm() {
  const [appointmentForm] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lab, setLab] = useState<OptTypes[]>();
  const [radiology, setRadiology] = useState<OptTypes[]>();
  const [opd, setOpd] = useState<OptTypes[]>();
  const [others, setOthers] = useState<OptTypes[]>();
  const [messageApi, contextHolder] = message.useMessage();
  const handleFinish = async (values: any) => {
    //   try {
    //     setIsSubmitting(true);
    //     const payload: SubmitAppointmentPayload = {
    //       fname: values.fname,
    //       mname: values.mname === undefined ? null : values.mname,
    //       lname: values.lname,
    //       email: values.email,
    //       contact_no: values.contact_no,
    //       birth_date: dayjs(values.birth_date).format('YYYY-MM-DD HH:mm:ss'),
    //       preferred_physician:
    //         values.preferred_physician === undefined
    //           ? null
    //           : values.preferred_physician,
    //       preferred_date: dayjs(values.preferred_date).format(
    //         'YYYY-MM-DD HH:mm:ss'
    //       ),
    //       laboratory:
    //         values.laboratory === undefined
    //           ? null
    //           : values.laboratory.join(' - '),
    //       radiology:
    //         values.radiology === undefined ? null : values.radiology.join(' - '),
    //       opd: values.opd === undefined ? null : values.opd.join(' - '),
    //       others: values.others === undefined ? null : values.others.join(' - '),
    //       addional_message:
    //         values.addional_message === undefined
    //           ? null
    //           : values.addional_message,
    //     };
    //     const response = await submitAppointment(payload);
    //     messageApi.success(response);
    //     appointmentForm.resetFields();
    //   } catch (err: any) {
    //     if (err.response) {
    //       messageApi.error(err.response?.data);
    //     } else {
    //       messageApi.error('Something went wrong please try again later');
    //     }
    //     console.log(err);
    //   } finally {
    //     setIsSubmitting(false);
    //   }
  };

  const getLabServices = async () => {
    //   try {
    //     const res = await getAppointmentServices('lab');
    //     const lab = res.map((item) => ({
    //       label: item.name,
    //       value: item.name,
    //     }));
    //     setLab(lab);
    //   } catch (err: any) {
    //     console.log(err);
    //   }
  };

  const getRadiologyServices = async () => {
    //   try {
    //     const res = await getAppointmentServices('radiology');
    //     const lab = res.map((item) => ({
    //       label: item.name,
    //       value: item.name,
    //     }));
    //     setRadiology(lab);
    //   } catch (err: any) {
    //     console.log(err);
    //   }
  };
  const getOpdServices = async () => {
    //   try {
    //     const res = await getAppointmentServices('opd');
    //     const lab = res.map((item) => ({
    //       label: item.name,
    //       value: item.name,
    //     }));
    //     setOpd(lab);
    //   } catch (err: any) {
    //     console.log(err);
    //   }
  };
  const getOthersServices = async () => {
    //   try {
    //     const res = await getAppointmentServices('others');
    //     const lab = res.map((item) => ({
    //       label: item.name,
    //       value: item.name,
    //     }));
    //     setOthers(lab);
    //   } catch (err: any) {
    //     console.log(err);
    //   }
  };

  useEffect(() => {
    getLabServices();
    getRadiologyServices();
    getOpdServices();
    getOthersServices();
  }, []);
  return (
    <>
      <>
        {contextHolder}
        <div className="py-6">
          <h2 className="text-2xl font-medium pb-5 md:text-xl">
            Appointment Form
          </h2>

          <Form
            layout="vertical"
            size={ComponentSize()}
            onFinish={handleFinish}
            form={appointmentForm}
            className="grid gap-y-5"
          >
            <Card
              title="Appointment Details"
              styles={{
                header: {
                  background: bg,
                  color: text,
                },
              }}
            >
              <div className="grid md:grid-cols-2 gap-x-5">
                <Form.Item
                  label="Preferred Date"
                  name="preferred_date"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your preferred date',
                    },
                  ]}
                >
                  <DatePicker
                    showTime={{
                      defaultValue: dayjs('00:00', 'HH:mm'),
                      use12Hours: true,
                      minuteStep: 30,
                    }}
                    showNow={false}
                    format="MMM DD, YYYY - hh:mm A"
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item
                  name="preferred_physician"
                  label="Preferred Doctor (optional)"
                >
                  <Input />
                </Form.Item>
              </div>
            </Card>

            <Card
              title={
                <div>
                  <p>
                    Available Services & Procedures{' '}
                    <span className="block text-xs font-light">
                      You can select one or many procedures at once.
                    </span>
                  </p>
                </div>
              }
              styles={{
                header: {
                  background: bg,
                  color: text,
                },
              }}
            >
              <div>
                <Form.Item name="laboratory" label="Laboratory">
                  <Select
                    mode="tags"
                    options={lab}
                    virtual={false}
                    allowClear
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
                <Form.Item name="radiology" label="Radiology ">
                  <Select
                    mode="tags"
                    options={radiology}
                    virtual={false}
                    allowClear
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
                <Form.Item name="opd" label="Out-Patient Department">
                  <Select
                    mode="tags"
                    options={opd}
                    virtual={false}
                    allowClear
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
                <Form.Item name="others" label="Others">
                  <Select
                    mode="tags"
                    options={others}
                    virtual={false}
                    allowClear
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
              </div>
            </Card>

            <Card
              title={
                <div>
                  <p>
                    Patient Information{' '}
                    <span className="block text-xs font-light">
                      Your information will only be saved for your appointment.
                    </span>
                  </p>
                </div>
              }
              styles={{
                header: {
                  background: bg,
                  color: text,
                },
              }}
            >
              <div className="grid md:grid-cols-2 gap-x-5">
                <Form.Item
                  name="fname"
                  label="First name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your first name',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="mname" label="Middle name (optional)">
                  <Input />
                </Form.Item>

                <Form.Item
                  name="lname"
                  label="Last name"
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
                  name="birth_date"
                  label="Birthdate"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your birthdate',
                    },
                  ]}
                >
                  <DatePicker
                    showNow={false}
                    className="w-full"
                    showToday={false}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email',
                    },
                    {
                      required: true,
                      type: 'email',
                      message: 'Please input a valid email',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="contact_no"
                  label="Contact Number "
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
            </Card>

            <Form.Item
              name="addional_message"
              label="Additional Message (optional)"
            >
              <Input.TextArea />
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
              <Checkbox>
                I agree to the{' '}
                <Link
                  href="/terms-and-conditions"
                  className="text-primary underline cursor-pointer"
                  target="_blank"
                >
                  Terms and Conditions
                </Link>{' '}
                and the{' '}
                <Link
                  href="/privacy-policy"
                  className="text-primary underline cursor-pointer"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
                .
              </Checkbox>
            </Form.Item>

            <div className="grid justify-end">
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </>
    </>
  );
}
