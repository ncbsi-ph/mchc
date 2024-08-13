import Navigation from '../components/nav';
import Footer from '../components/footer';

export default function GeneralLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <Navigation />
      {children}
      <Footer />
    </section>
  );
}
