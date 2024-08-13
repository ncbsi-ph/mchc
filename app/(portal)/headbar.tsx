'use client';
import { Dropdown, FormInstance, MenuProps, Space } from 'antd';
import { BiChevronDown } from 'react-icons/bi';
import ChangePasswordForm from './changePasswordForm';

interface HeadBarProps {
  user?: string;
  onLogout?: () => void;
  open: boolean;
  form: FormInstance;
  loading: boolean;
  onCancel: () => void;
  onClick: () => void;
  onSubmit: (values: any) => void;
}

export default function HeadBar({
  user,
  onLogout,
  open,
  form,
  loading,
  onCancel,
  onSubmit,
  onClick,
}: HeadBarProps) {
  const items: MenuProps['items'] = [
    {
      label: <p className="md:hidden">{user}</p>,
      key: '0',
      disabled: true,
    },
    {
      label: <p onClick={onClick}>Change password</p>,
      key: '1',
    },
    {
      label: <p onClick={onLogout}>Logout</p>,
      key: '2',
    },
  ];
  return (
    <div className="bg-white">
      <div className="container py-3 flex justify-between items-center">
        <img src="/mchc_with_text.png" width={250} height={0} alt="MCHC logo" />
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          placement="bottomRight"
          className="cursor-pointer text-sm"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className="hidden md:block">{user}</p>
              <BiChevronDown className="text-2xl" />
            </Space>
          </a>
        </Dropdown>
      </div>
      <ChangePasswordForm
        open={open}
        form={form}
        loading={loading}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
}
