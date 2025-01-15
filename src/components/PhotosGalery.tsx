import { useState, useEffect } from "react";

export interface PhotosGaleryProps {
  photos: Array<string>;
}

const PhotosGalery = ({ photos }: PhotosGaleryProps) => {
  var [current, setCurrent] = useState(0);
  var [photo, setPhoto] = useState(photos[current]);

  useEffect(() => {
    setPhoto(photos[current]);
  }, [current]);

  return (
    <div className="relative w-full h-full">
      <div className="relative h-full rounded-2xl overflow-hidden">
        <div className="duration-700 ease-in-out">
          <img
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover h-full"
            src={photo}
            alt={`property img ${current}`}
          />
        </div>
      </div>

      <div className="absolute -translate-x-1/2 bottom-3 left-1/2 z-30 hidden group-hover/photo:flex items-center justify-center size-8 bg-white/80 rounded-lg">
        {current + 1}
      </div>

      <button
        type="button"
        className="absolute top-0 start-0 z-30 hidden group-hover/photo:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() => {
          if (current === 0) setCurrent(photos.length - 1);
          else setCurrent(--current);
        }}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 group-hover:bg-white group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="size-8 text-black -ml-1 stroke-2"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" stroke="none"></path>
            <path d="m15 6-6 6 6 6"></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 hidden group-hover/photo:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() => {
          if (current == photos.length - 1) setCurrent(0);
          else setCurrent(++current);
        }}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 group-hover:bg-white group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="size-8 text-black rotate-180 stroke-2"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" stroke="none"></path>
            <path d="m15 6-6 6 6 6"></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default PhotosGalery;
