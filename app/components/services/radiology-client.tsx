'use client';

import { Radiology } from '@/app/(general)/services/radiology-diagnostic-procedures/page';
import { Collapse } from 'antd';
import { ConfigProvider } from 'antd';
import parse from 'html-react-parser';

interface RadiologyClientProps {
  data: Radiology[];
}

export const RadiologyClient = ({ data }: RadiologyClientProps) => {
  const sortedData = data.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  );
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: '#FFFFFF',
        },
      }}
    >
      <section className="my-28 container grid gap-y-5">
        {sortedData.map((item) =>
          item.child !== null ? (
            <Collapse
              key={item.id}
              expandIconPosition="end"
              style={{}}
              items={[
                {
                  key: item.id,
                  label: item.name,
                  children: (
                    <div className="ck-content">{parse(item.child)}</div>
                  ),
                  style: {
                    background: '#FF5B00',
                    borderRadius: '6px',
                  },
                },
              ]}
            />
          ) : (
            <div
              key={item.id}
              className="bg-primary text-white py-3 px-4 border border-[#d9d9d9] rounded-md text-sm"
            >
              <p>{item.name}</p>
            </div>
          )
        )}
      </section>
    </ConfigProvider>
  );
};
