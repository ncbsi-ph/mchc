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
        <Form.Item>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
