import Breadcrumbs from '@/app/components/breadcrumbs';
import CareerClient from '@/app/components/careers/career-client';
import Link from 'next/link';

type Params = {
  params: {
    slug: [number, string];
  };
};

export interface CareerTypes {
  id: number;
  title: string;
  slug: string;
  slots: number;
  salary_range: string;
  job_type: string;
  date_posted: string;
  date_modified: string;
  job_summary: string;
  educ_attainment: string;
  work_exp: string;
  skills: string;
}

const jobs: CareerTypes = {
  id: 1,
  title: 'Software Engineer',
  slug: 'software-engineer',
  slots: 3,
  salary_range: '$60,000 - $100,000',
  job_type: 'Full-time',
  date_posted: '2024-05-06',
  date_modified: '2024-05-06',
  job_summary: 'Develop and maintain software applications.',
  educ_attainment: "Bachelor's degree in Computer Science or related field.",
  work_exp: '2+ years of experience in software development.',
  skills: 'JavaScript, Python, React, Node.js, SQL',
};
export default function Career({ params: { slug } }: Params) {
  const pageTitle = 'Test';
  //   const pageTitle = slug[1];
  //   const career = await getCareer(slug[0]);
  return (
    <>
      <Breadcrumbs
        items={[
          { title: <Link href="/careers">News & Events</Link> },
          { title: pageTitle },
        ]}
        title={pageTitle}
      />

      <section className="container my-28">
        <CareerClient data={jobs} />
      </section>
    </>
  );
}
