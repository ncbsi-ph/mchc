import Breadcrumbs from '@/app/components/breadcrumbs';
import DoctorsClient from '@/app/components/doctors/doctors-client';

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

const doctorsData: DoctorsTypes[] = [
  {
    id: 0,
    fname: 'ABIGAIL',
    mname: null,
    lname: 'BAGSIT-BUROG',
    schedule: 'MONDAY TO SATURDAY EXCEPT THURSDAY 10:00AM TO 2:00 PM',
    secretary_name: 'MARIBETH ZALAMEDA',
    secretary_contact: '0905-692-1087',
    img: 'https://i.imgur.com/Ycfi8RS.png',
    specialty: [
      {
        id: 0,
        doctorId: 0,
        specialty: 'PEDIATRICS',
      },
    ],
  },
];

const specialties: string[] = ['PEDIATRICS'];

export default function Doctors() {
  const pageTitle = 'Doctors';
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className="container my-28">
        <DoctorsClient doctors={doctorsData} specialties={specialties} />
      </section>
    </>
  );
}
