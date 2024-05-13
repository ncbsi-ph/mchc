import { SectionTitle } from '@/app/helpers';
import FaqsCollapse from './faqs-collapse';

export default function Faqs() {
  return (
    <div>
      <div className="w-full">
        <SectionTitle heading="Frequently asked questions" subHeading="Faqs" />
      </div>
      <FaqsCollapse />
    </div>
  );
}
