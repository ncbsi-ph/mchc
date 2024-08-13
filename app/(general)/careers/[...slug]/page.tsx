import Breadcrumbs from '@/app/components/breadcrumbs';
import CareerClient from '@/app/components/careers/career-client';
import { Metadata } from 'next';
import Link from 'next/link';

type Params = {
  params: {
    slug: [number, string];
  };
};

const getCareer = async (id: number): Promise<CareerTypes> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}career/${id}`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');

  return res.json();
};

export async function generateMetadata({
  params: { slug },
}: Params): Promise<Metadata> {
  let career = await getCareer(slug[0]);

  return {
    title: career.title,
    description: career.job_summary,
    openGraph: {
      title: career.title,
      description: career.job_summary,
      type: 'article',
      publishedTime: career.date_posted,
      url: `${process.env.BASE_URL}careers/${slug[0]}/${career.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: career.title,
      description: career.job_summary,
    },
  };
}

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

export default async function Career({ params: { slug } }: Params) {
  // const pageTitle = 'Test';
  const pageTitle = slug[1];
  const career = await getCareer(slug[0]);
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
        <CareerClient data={career} />
      </section>
    </>
  );
}
