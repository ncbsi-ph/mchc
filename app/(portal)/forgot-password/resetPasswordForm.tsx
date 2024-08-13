import { Button, Form, FormInstance, Input } from 'antd';
import Image from 'next/image';

interface ResetPasswordFormProps {
  onSubmit?: (values: any) => void;
  form?: FormInstance;
  loading?: boolean;
}

export default function ResetPasswordForm({
  onSubmit,
  form,
  loading,
}: ResetPasswordFormProps) {
  return (
    <section className="max-w-md grid m-auto h-screen content-center">
      <div className="grid pb-12 justify-center">
        <Image
          src="/mchc_with_text.png"
          width={250}
          height={0}
          alt="Metro Calaca Hospital Corp Logo"
        />
      </div>
      <div className="bg-white shadow-md px-10 py-12 rounded-md">
        <h1 className="font-medium text-xl text-center pb-10 text-primary font-yeseva">
          Reset Password
        </h1>
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={onSubmit}
        >
          <Form.Item
            name="password"
            label="New Password"
            extra="Minimum of 8 characters"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'Minimum password length should be 8 characters',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            hasFeedback
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="flex justify-end items-center">
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
