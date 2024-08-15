import Link from 'next/link';
import Navigation from './components/nav';
import { Button } from 'antd';
import { Institutions } from './components/footer';
interface NotFoundProps {
  data: Institutions;
}
export default function NotFound({ data }: NotFoundProps) {
  return (
    <section>
      <Navigation data={data} />
      <section className="container my-28 text-center gap-y-5">
        <h1 className="text-5xl font-medium text-primary">404</h1>
        <h2 className="text-2xl text-altPrimary">Oops! Page not found.</h2>
        <p className="py-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button type="primary">Go back home</Button>
        </Link>
      </section>
    </section>
  );
}
