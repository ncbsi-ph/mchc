'use client';

import { Modal, Checkbox, Button } from 'antd';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const PrivacyModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient && !hasAccepted) {
      if (pathname !== '/privacy-policy') {
        setIsModalVisible(true);
      }
    }
  }, [isClient, hasAccepted, pathname]);

  const handleOk = () => {
    if (isChecked) {
      setHasAccepted(true);
      setIsModalVisible(false);
    } else {
      alert('You must accept the terms.');
    }
  };

  const onCheckChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const goToPrivacyPolicy = () => {
    setIsModalVisible(false);
    router.push('/privacy-policy');
  };

  return (
    <>
      {isClient && (
        <Modal
          title={
            <h2 className="text-xl font-bold">
              WE HAVE A NEW GENERAL PRIVACY NOTICE
            </h2>
          }
          open={isModalVisible}
          footer={null}
          closable={false}
          centered={true}
          className="p-5 rounded-lg"
        >
          <div className="space-y-4 text-gray-700">
            <p>
              Metro Calaca Hospital Corp. respects your privacy and will keep
              secure and confidential all personal and sensitive information
              that you may provide to Metro Calaca Hospital Corp. and/or those
              that Metro Calaca Hospital Corp. may collect from you ("Personal
              Data").
            </p>
            <p>
              Please read carefully the Metro Calaca Hospital Corp. General
              Privacy Notice to understand how we treat Personal Data.
            </p>
            <p>
              Click{' '}
              <span
                onClick={goToPrivacyPolicy}
                className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
              >
                here
              </span>{' '}
              to read the General Privacy Notice in full.
            </p>
            <div className="flex items-center">
              <Checkbox onChange={onCheckChange}>
                I accept the terms in Metro Calaca Hospital Corp. General
                Privacy Notice.
              </Checkbox>
            </div>
          </div>

          <div className="mt-6 text-right">
            <Button
              type="primary"
              onClick={handleOk}
              disabled={!isChecked}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
            >
              I Agree
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PrivacyModal;
