'use client';

import { Form, FormInstance, Input, Modal } from 'antd';

interface ForgotPasswordProps {
  open: boolean;
  form: FormInstance;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

export default function ForgotPassword({
  open,
  form,
  onOpenModal,
  onCloseModal,
  onSubmit,
  loading,
}: ForgotPasswordProps) {
  return (
    <div>
      <p
        className="cursor-pointer text-primary underline text-xs"
        onClick={onOpenModal}
      >
        forgot password?
      </p>
      <Modal
        open={open}
        title="Forgot Password"
        okText="Submit"
        onCancel={onCloseModal}
        onOk={form.submit}
        confirmLoading={loading}
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input a valid email',
              },
            ]}
            extra="Enter the email address associated with your account and we'll send a password reset link"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
