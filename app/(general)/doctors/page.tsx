import Breadcrumbs from '@/app/components/breadcrumbs';
import DoctorsClient from '@/app/components/doctors/doctors-client';
import { Metadata } from 'next';

interface Specialties {
  id: number;
  doctorId: number;
  specialty: string;
}
export interface DoctorsTypes {
  id: number;
  fname: string;
  mname: string | null;
  lname: string;
  schedule: string;
  secretary_name: string;
  secretary_contact: string;
  img: string;
  specialty: Specialties[];
}

export const metadata: Metadata = {
  title: 'Doctors',
  description: 'Metro Calaca Hospital Corp  list of doctors',
};

const getDoctors = async (): Promise<DoctorsTypes[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}doctors`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_URL}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

const getSpecialties = async (): Promise<string[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}specialties`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_URL}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function Doctors() {
  const pageTitle = 'Doctors';
  const doctors = await getDoctors();
  const specialties = await getSpecialties();
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="container my-28">
        <DoctorsClient doctors={doctors} specialties={specialties} />
      </section>
    </>
  );
}
