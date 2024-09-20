import Breadcrumbs from '@/app/components/breadcrumbs';
import AppointmentClientForm from '@/app/components/appointment/appointment-client';
import { Card, Divider } from 'antd';
import { Metadata } from 'next';
import HTMLReactParser from 'html-react-parser/lib/index';

interface AppointmentStatus {
  status: boolean;
  message: string;
}

export const metadata: Metadata = {
  title: 'Online Appointment ',
  description:
    'Schedule your online appointment with Metro Calaca Hospital Corp. Fill out the form and our team will respond promptly.',
  keywords: [
    'Metro Calaca Hospital Corp.',
    'Online Appointment',
    'Hospital Appointment',
    'Healthcare Booking',
    'Medical Appointment',
  ],
  openGraph: {
    title: 'Online Appointment | Metro Calaca Hospital Corp.',
    description:
      'Schedule your online appointment with Metro Calaca Hospital Corp. Fill out the form and our team will respond promptly.',
    url: 'https://mchc.comlogikph.com/appointment',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Appointment | Metro Calaca Hospital Corp.',
    description:
      'Schedule your online appointment with Metro Calaca Hospital Corp. Fill out the form and our team will respond promptly.',
  },
};

const getAppointmentStatus = async (): Promise<AppointmentStatus> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}appointment-status`,
    {
      headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('failed to fetch data');

  return res.json();
};

export default async function Appointment() {
  const pageTitle = 'Online Appointment';
  const data = await getAppointmentStatus();
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="container my-28">
        {data.status ? (
          <>
            <h2 className="text-xl font-medium">
              Just fill up the required fields and click SUBMIT. Our
              staff-in-charge{' '}
              <span className="text-primary">
                will send you a reply within an hour.
              </span>
            </h2>
            <Divider />
            <AppointmentClientForm />
          </>
        ) : (
          <Card className="bg-slate-50 text-center">
            {HTMLReactParser(data.message)}
          </Card>
        )}
      </section>
    </>
  );
}
