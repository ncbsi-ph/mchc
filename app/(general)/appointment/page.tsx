import Breadcrumbs from '@/app/components/breadcrumbs';
import AppointmentClientForm from '@/app/components/appointment/appointment-client';
import { Card, Divider } from 'antd';

export default function Appointment() {
  const pageTitle = 'Online Appointment';
  const status = 'true';
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="container my-28">
        {status ? (
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
            <p>
              {' '}
              We regret to inform you that this service is currently
              unavailable. For updates or inquiries, please reach out to us
              through our social media channels or email. We apologize for any
              inconvenience caused.
            </p>
          </Card>
        )}
      </section>
    </>
  );
}
