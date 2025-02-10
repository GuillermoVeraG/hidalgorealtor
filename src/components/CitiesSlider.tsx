import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "@/components/TestimonialsSlider.css";

// import required modules
import { Navigation, Thumbs } from "swiper/modules";

interface Cities {
  title: string;
  subtitle: string;
  desc: string;
  img1: string;
  href: string;
}

export interface CitiesProps {
  cities: Array<Cities>;
  button: string;
}

// =======================================================
//                  Testimonials
const Testimonials = ({ cities, button }: CitiesProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null) as any;
  return (
    <>
      <Swiper
        className="butSwiper"
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        centeredSlides={false}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
      >
        {cities.map(({ title }, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="w-fit px-4 py-2 border border-black rounded-full cursor-pointer">
                {title}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper
        className="citiesSwiper"
        navigation={true}
        grabCursor={true}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        centeredSlides={true}
        slidesPerView={1}
        initialSlide={0}
      >
        {cities.map(({ title, subtitle, desc, img1, href }, index) => {
          return (
            <SwiperSlide key={index} className="my-4">
              <article className="bg-white hover:bg-primary-100 rounded-2xl shadow-md">
                <div className="w-full p-10">
                  <h2 className={`capitalize font-serif text-3xl`}>
                    {title}
                    <div className="italic mt-3">{subtitle}</div>
                  </h2>

                  <p className="font-sans text-base mt-5 mb-10">{desc}</p>

                  <a
                    className="border border-black flex items-center justify-start gap-4 w-48 py-2 px-4 rounded-2xl text-sm mt-4"
                    href={href}
                  >
                    {button}
                    <svg
                      width="40"
                      height="12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1 h-4 stroke-black"
                    >
                      <path
                        d="m35.138.438 4.349 5.5-4.35 5.5"
                        stroke-width=".8"
                        stroke-linecap="round"
                      ></path>
                      <path d="M.741 5.537a.4.4 0 0 0 0 .8v-.8Zm0 .8h38.746v-.8H.74v.8Z"></path>
                    </svg>
                  </a>
                </div>

                <img
                  className="w-full rounded-b-2xl"
                  src={img1}
                  alt="city photo 1"
                />
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Testimonials;
