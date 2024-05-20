'use client';

import { sendContactMail } from '@/app/api';
import { ComponentSize, CustomBtn, SectionTitle } from '@/app/helpers';
import { Form, Input, message } from 'antd';
import { useState } from 'react';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [contactForm] = Form.useForm();
  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await sendContactMail(values);
      messageApi.success(response, 10);
      contactForm.resetFields();
    } catch (err: any) {
      if (err.response) {
        messageApi.error(err.response?.data, 10);
      } else {
        messageApi.error(err.message, 10);
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
    <div>
      {contextHolder}
      <div className="pb-5">
        <SectionTitle heading="Get in touch with us" subHeading="Contact us" />
      </div>
      <Form
        layout="vertical"
        size={ComponentSize()}
        onFinish={handleSubmit}
        form={contactForm}
      >
        <div className="grid md:grid-cols-2 gap-x-5">
          <Form.Item
            name="fname"
            rules={[
              {
                required: true,
                message: 'Please input your first name',
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lname"
            rules={[
              {
                required: true,
                message: 'Please input your last name',
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="contactNo"
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
            <Input placeholder="Contact Number" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email address',
              },
            ]}
          >
            <Input placeholder="Email Address" />
          </Form.Item>
        </div>
        <Form.Item
          name="subject"
          rules={[
            {
              required: true,
              message: 'Please input the message subject',
            },
          ]}
        >
          <Input placeholder="Subject" />
        </Form.Item>
        <Form.Item
          name="message"
          rules={[
            {
              required: true,
              message: 'Please input your message',
            },
          ]}
        >
          <Input.TextArea placeholder="Message" />
        </Form.Item>
        <CustomBtn type="primary" htmlType="submit" loading={isLoading}>
          Send Message
        </CustomBtn>
      </Form>
    </div>
  );
}
