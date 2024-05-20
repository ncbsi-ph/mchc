import BannerCarousel from './bannerCarousel';

export interface CarouselItems {
  id: number;
  header: string;
  sub_header: string;
  img: string;
}

const getHomeBanner = async (): Promise<CarouselItems[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home/banner`, {
    headers: {
      'x-api-key': `${process.env.NEXT_PUBLIC_API_URL}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('failed to fetch data');
  return res.json();
};
export default async function HomeBanner() {
  const about = await getHomeBanner();
  //   console.log(about);

  return (
    <>
      <BannerCarousel carouselItems={about} />
    </>
  );
}
