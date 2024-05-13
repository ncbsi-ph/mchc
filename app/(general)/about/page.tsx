import Breadcrumbs from '@/app/components/breadcrumbs';
import { Card } from 'antd';
import { ReactNode } from 'react';

const bg = '#5B741A';
const text = '#FAE341';

export default function About() {
  const pageTitle = 'About';
  return (
    <>
      <Breadcrumbs items={[{ title: pageTitle }]} title={pageTitle} />
      <section className=" container my-28 grid gap-16 min-h-screen">
        <CustomCard title="History">
          <div className="text-lg">
            <img src="/mbmcbuilding.jpg" width="100%" className="py-5" alt="" />
            <p className="text-justify indent-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
              reiciendis laborum fugit assumenda eum, ea reprehenderit
              perferendis. Fugit eligendi, praesentium est cum nostrum
              repudiandae similique, reprehenderit neque mollitia blanditiis
              tenetur? Veniam voluptatum expedita temporibus officia esse
              similique aliquam, velit minima incidunt nobis non quod quos.
              Expedita voluptates provident repellendus nesciunt quibusdam iure
              vero, ipsam pariatur quod veniam quia ea fuga! Eius architecto
              deleniti voluptatem, optio eaque odio adipisci consequatur,
              inventore voluptas eveniet dolor aperiam illo repudiandae neque
              maiores tenetur. Doloribus cumque quod adipisci accusamus corporis
              obcaecati soluta, omnis quaerat necessitatibus? Sunt quibusdam
              enim beatae temporibus distinctio amet iste praesentium
              necessitatibus doloribus odit, quos esse eligendi veritatis.
              Aliquid quo aliquam ex pariatur recusandae, iure officia harum
              quia velit quidem? Tempora, rerum! Ipsum possimus delectus,
              officia blanditiis voluptates molestiae consequatur aliquam nihil
              amet sapiente accusantium reprehenderit eos consectetur non ullam
              iusto aperiam nam maiores adipisci inventore distinctio!
              Accusantium dolores ipsam nam animi? Hic natus officiis beatae
              consequatur, perspiciatis, expedita delectus adipisci, officia
              molestiae laborum nobis soluta. Ut vitae saepe magnam dolore illum
              quibusdam porro debitis nemo, omnis id sit nihil. Maxime, eos! Ut
              quos excepturi earum blanditiis dolores beatae reiciendis, non
              sapiente consequuntur reprehenderit aliquid a maxime quaerat culpa
              numquam enim eius ad cumque ab commodi maiores explicabo quidem,
              alias facere. Iusto! Maxime, odit aspernatur asperiores ea, error
              voluptatibus sunt distinctio voluptates, recusandae ipsam quia
              assumenda! Animi incidunt esse, debitis officiis quibusdam
              exercitationem. Minus placeat quisquam et eligendi aut, soluta
              temporibus laboriosam? Facere, accusantium eaque sint perferendis
              eum nulla ipsa iste labore error tempora deserunt enim?
              Recusandae, magnam aliquid ullam voluptate dolorum eos voluptas
              quisquam asperiores quidem! Laudantium illum necessitatibus a
              veritatis. Eius quo culpa eum illum totam ducimus, quibusdam sit
              quisquam. Eius deserunt, dolores eos beatae blanditiis, delectus
              vero magnam adipisci iste perferendis ad et, ex porro illo neque
              nemo ipsa.
            </p>
          </div>
        </CustomCard>
        <div className="grid gap-10 md:grid-cols-2">
          <CustomCard title="Our Mission">
            <div className="text-lg">
              <p className="text-justify indent-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                adipisci similique velit corrupti laboriosam commodi mollitia!
                Ex similique inventore beatae, quidem numquam incidunt amet!
                Quos illum veniam aspernatur atque necessitatibus?
              </p>
            </div>
          </CustomCard>{' '}
          <CustomCard title="Our Vision">
            <div className="text-lg">
              <p className="text-justify indent-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                ex officiis laborum nam deleniti, ullam eligendi perferendis,
                unde fuga facere quam laudantium. Perferendis totam nisi
                repellendus explicabo aliquid reprehenderit odit.
              </p>
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
