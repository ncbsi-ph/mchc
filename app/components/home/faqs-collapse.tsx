'use client';

import { ComponentSize } from '@/app/helpers';
import { Collapse } from 'antd';

export default function FaqsCollapse() {
  return (
    <div className="pt5">
      <Collapse
        accordion
        items={[
          {
            key: '1',
            label: 'This is a header',
            children: (
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                sit expedita error ex aspernatur consequatur corporis sint,
                totam voluptate quasi eveniet culpa quisquam ipsa enim ipsam cum
                vitae aliquid alias.
              </p>
            ),
          },
          {
            key: '2',
            label: 'This is a header too',
            children: (
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aperiam voluptatem et perspiciatis vero aliquid, harum
                laudantium dolor culpa, illo asperiores inventore officia,
                possimus nihil ea aut? Esse odit reprehenderit non!
              </p>
            ),
          },
        ]}
        defaultActiveKey={1}
        size={ComponentSize()}
      />
    </div>
  );
}
