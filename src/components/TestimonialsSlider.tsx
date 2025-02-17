import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "@/components/TestimonialsSlider.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

interface Testimonial {
  name: string;
  desc: string;
}

export interface TestimonilasProps {
  testimonials: Array<Testimonial>;
}

// =======================================================
//                  Testimonials
const Testimonials = ({ testimonials }: TestimonilasProps) => {
  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        grabCursor={true}
        loop={true}
        modules={[Pagination, Navigation]}
        centeredSlides={true}
        slidesPerView={1}
        initialSlide={0}
      >
        {testimonials.map(({ name, desc }, index) => {
          return (
            <SwiperSlide key={index} className="py-12">
              <h2 className="uppercase font-serif text-base md:text-lg mb-5">
                {name}
              </h2>

              <p className="font-serif text-2xl w-full lg:w-96">{desc}</p>
            </SwiperSlide>
          );
        })}

        <div className="flex justify-start items-center my-10 gap-5">
          <button
            id="testimonialLeft"
            className="swiper-button-prev border border-black
    py-1 px-1 rounded-full"
            aria-label="Slide testimonial left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 stroke-black"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" stroke="none"></path>
              <path d="m15 6-6 6 6 6"></path>
            </svg>
          </button>
          <div className="h-px w-32 bg-black"></div>
          <button
            id="testimonialright"
            className="swiper-button-next border border-black
    py-1 px-1 rounded-full"
            aria-label="Slide testimonial right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 stroke-black rotate-180"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" stroke="none"></path>
              <path d="m15 6-6 6 6 6"></path>
            </svg>
          </button>
        </div>
      </Swiper>
    </>
  );
};

export default Testimonials;
