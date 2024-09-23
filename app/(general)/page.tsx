import HomeBanner from '../components/home/HomeBanner';
import About from '../components/home/about';
import Contact from '../components/home/contact';
import Faqs from '../components/home/faqs';
import Map from '../components/home/map';
import NewsEvents from '../components/home/news-events';
import Services from '../components/home/services';
import PrivacyModal from '../components/privacy-modal';
import ShortcutBtn from '../components/shortcut-btn';

export default function Home() {
  return (
    <section>
      <HomeBanner />
      <ShortcutBtn />
      <About />
      <Services />
      <NewsEvents />
      <div
        className=" bg-center bg-cover bg-[url('/onc_building.jpg')]"
        id="contact"
      >
        <div className="backdrop-blur-lg bg-white/30 py-28">
          <div className="container grid gap-10 lg:grid-cols-2">
            <Contact />
            <Faqs />
          </div>
        </div>
      </div>
      <Map />
    </section>
  );
}
