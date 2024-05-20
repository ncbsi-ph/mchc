import Breadcrumbs from '@/app/components/breadcrumbs';
import { Card } from 'antd';
import { ReactNode } from 'react';
import parse from 'html-react-parser';
const bg = '#5B741A';
const text = '#FAE341';

interface HistoryTypes {
  id: number;
  history: string;
}

interface MissionVisionTypes {
  id: number;
  vision: string;
  mission: string;
  vision_img: string;
  mission_img: string;
}
const getHistory = async (): Promise<HistoryTypes> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}about/history`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_URL}`,
    },
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};

const getMissionVison = async (): Promise<MissionVisionTypes> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}about/mission-vision`,
    {
      headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_URL}`,
      },
    }
  );
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};
export default async function About() {
  const pageTitle = 'About';
  const data = await getHistory();
  const missionvVision = await getMissionVison();
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className=" container my-28 grid gap-16 min-h-screen">
        <CustomCard title="History">
          <div className="text-lg">
            <img src="/mbmcbuilding.jpg" width="100%" className="py-5" alt="" />
            <div className="text-justify indent-5 ck-content">
              {parse(data.history)}
            </div>
          </div>
        </CustomCard>
        <div className="grid gap-10 md:grid-cols-2">
          <CustomCard title="Our Mission">
            <div className="text-lg">
              <div className="text-justify indent-5 ck-content">
                {parse(missionvVision.mission)}
              </div>
            </div>
          </CustomCard>
          <CustomCard title="Our Vision">
            <div className="text-lg">
              <div className="text-justify indent-5 ck-content">
                {parse(missionvVision.vision)}
              </div>
            </div>
          </CustomCard>
        </div>
      </section>
    </>
  );
}
interface CustomCardProps {
  title: string;
  children: ReactNode;
}

const CustomCard = ({ title, children }: CustomCardProps) => (
  <Card
    styles={{
      header: {
        backgroundColor: bg,
        color: text,
      },
    }}
    title={
      <h2 className="text-center uppercase font-medium text-3xl">{title}</h2>
    }
  >
    <div className="text-lg">{children}</div>
  </Card>
);
