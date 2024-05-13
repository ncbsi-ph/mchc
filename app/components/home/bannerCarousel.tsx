'use client';
import { Carousel } from 'antd';
import Image from 'next/image';
import React, { useRef } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface CarouselItemProps {
  img: string;
  title: string;
}

const carouselItems: CarouselItemProps[] = [
  {
    img: '/carousel1.jpg',
    title: 'Proactive healthcare that transform life',
  },
  {
    img: '/carousel2.jpg',
    title: 'Proactive healthcare that transform life',
  },
];

export default function BannerCarousel() {
  const heroSlider = useRef<any>(null);
  return (
    <section className="relative">
      {carouselItems.length > 1 && (
        <>
          <BiChevronLeft
            className="text-5xl absolute z-10 cursor-pointer text-primary/70 hover:text-primary top-2/4 -translate-y-1/2 hidden md:block"
            onClick={() => heroSlider.current.prev()}
          />
          <BiChevronRight
            className="text-5xl absolute z-10 cursor-pointer text-primary/70 hover:text-primary right-0 top-2/4 -translate-y-1/2 hidden md:block"
            onClick={() => heroSlider.current.next()}
          />
        </>
      )}
      <Carousel
        focusOnSelect={false}
        autoplay
        swipeToSlide
        draggable
        ref={heroSlider}
        autoplaySpeed={5000}
        dotPosition="top"
      >
        {carouselItems.map((items, i) => (
          <div
            className="bg-primary/60 h-[644px] md:h-[430px] lg:h-[630px] w-full relative "
            key={i}
          >
            <Image
              src={items.img}
              alt={items.title}
              fill
              style={{
                objectFit: 'contain',
              }}
              quality={50}
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
