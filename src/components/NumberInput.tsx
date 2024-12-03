import { useState } from "react";

export interface NumberInputProps {
  name: string;
}

const NumberInput = ({ name }: NumberInputProps) => {
  var [number, setNumber] = useState(0);
  return (
    <div className="relative flex items-center">
      <button
        type="button"
        className="flex-shrink-0 bg-primary-100 hover:bg-primary-700 inline-flex items-center justify-center border border-gray-600 hover:border-primary rounded-full size-6 group"
        onClick={() => {
          console.log(number);
          setNumber(--number);
        }}
      >
        <svg
          className="w-2.5 h-2.5 stroke-gray-600 group-hover:stroke-white stroke-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 2"
        >
          <path d="M1 1h16"></path>
        </svg>
      </button>

      <input
        type="text"
        className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
        placeholder=""
        name={name}
        value={number}
        required
        onChange={(data) => {
          console.log(data);
        }}
      />

      <button
        type="button"
        className="flex-shrink-0 bg-primary-100 hover:bg-primary-700 inline-flex items-center justify-center border border-gray-600 hover:border-primary rounded-full size-6 group"
        onClick={() => {
          console.log(number);
          setNumber(++number);
        }}
      >
        <svg
          className="w-2.5 h-2.5 stroke-gray-600 group-hover:stroke-white stroke-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
        >
          <path d="M9 1v16M1 9h16"></path>
        </svg>
      </button>
    </div>
  );
};

export default NumberInput;
