import AboutNav from '@/app/components/about/aboutNav';
import Breadcrumbs from '@/app/components/breadcrumbs';

import { Metadata } from 'next';

interface Officers {
  id: number;
  name: string;
  position: string;
}

interface Board {
  id: number;
  name: string;
}

export const metadata: Metadata = {
  title: 'Officers & Board Directors',
  description: 'List Metro Calaca Hospital Corp Officers and Board Directors',
};

const getOfficers = async (): Promise<Officers[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}about/officers`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};
const getBoards = async (): Promise<Board[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}about/board`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

export default async function OfficersBoard() {
  const pageTitle = 'Officers and Board Directors';
  const officers = await getOfficers();
  const board = await getBoards();
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'About' }, { title: pageTitle }]}
        title={pageTitle}
      />
      <AboutNav />
      <section className="container my-28 grid gap-y-10 md:grid-cols-2 gap-x-5">
        <div>
          <h2 className="text-2xl font-medium pb-1 md:text-xl">
            Board of Directors
          </h2>
          <ul className="text-lg md:text-base">
            {board.map((board) => (
              <li key={board.id} className="list-disc ml-5">
                {board.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-medium pb-1 md:text-xl">Officers</h2>
          <ul className="text-lg md:text-base">
            {officers.map((officer) => (
              <li key={officer.id} className="list-disc ml-5">
                <span className="font-medium">{officer.position}</span> -{' '}
                {officer.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
