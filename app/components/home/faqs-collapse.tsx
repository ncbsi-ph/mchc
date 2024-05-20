'use client';

import { ComponentSize } from '@/app/helpers';
import { Collapse } from 'antd';
import { FaqsTypes } from './faqs';
import parse from 'html-react-parser';
interface FaqsCollapseProps {
  data: FaqsTypes[];
}
export const FaqsCollapse = ({ data }: FaqsCollapseProps) => {
  const faqs = data.map((item) => ({
    key: item.id,
    label: item.title,
    children: <div className="ck-content">{parse(item.description)}</div>,
  }));
  return (
    <div className="pt5">
      <Collapse
        accordion
        items={faqs}
        defaultActiveKey={1}
        size={ComponentSize()}
      />
    </div>
  );
};
