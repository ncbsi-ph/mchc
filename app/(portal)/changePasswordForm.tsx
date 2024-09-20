import { Form, FormInstance, Input, Modal } from 'antd';

interface ChangePasswordFormProps {
  open: boolean;
  form: FormInstance;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

export default function ChangePasswordForm({
  open,
  form,
  loading,
  onCancel,
  onSubmit,
}: ChangePasswordFormProps) {
  return (
    <Modal
      title="Change Password"
      open={open}
      onOk={form.submit}
      okText="Submit"
      confirmLoading={loading}
      onCancel={onCancel}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item
          label="Current Password"
          name="currentPass"
          rules={[
            {
              required: true,
              message: 'Please enter your current password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPass"
          extra="Minimum of 8 characters"
          rules={[
            {
              required: true,
              message: 'Please enter your new password!',
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
          dependencies={['newPass']}
          rules={[
            {
              required: true,
              message: 'Please confirm your new password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPass') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
