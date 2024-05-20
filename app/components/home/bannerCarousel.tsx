'use client';
import { Carousel } from 'antd';
import Image from 'next/image';
import React, { useRef } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { CarouselItems } from './HomeBanner';
import Link from 'next/link';
import { CustomBtn } from '@/app/helpers';

interface CarouselItemProps {
  carouselItems: CarouselItems[];
}

export default function BannerCarousel({ carouselItems }: CarouselItemProps) {
  const heroSlider = useRef<any>(null);

  return (
    <section className="relative">
      {carouselItems === null
        ? ''
        : carouselItems.length > 1 && (
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
              alt={items.header}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
            <div className="absolute bottom-0 right-0 left-0 top-0 overlay md:px-12">
              <div className="container grid items-center content-center h-full w-full text-center text-white md:text-left">
                <h2 className="text-secondary uppercase font-semibold tracking-widest text-xl drop-shadow lg:text-2xl">
                  {items.sub_header}
                </h2>
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl  font-medium lg:w-[60%] font-corsiva text-primary py-8
              "
                >
                  {items.header}
                </h1>

                <Link href="/about/history">
                  <CustomBtn
                    type="primary"
                    className="text-base flex items-center justify-center md:justify-start"
                  >
                    Learn more
                  </CustomBtn>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
