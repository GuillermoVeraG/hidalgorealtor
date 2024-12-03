import { useState, useCallback, useEffect, useRef } from "react";

import "@/components/MultiRangeInput.css";

export interface MultiRangeInputProps {
  name: string;
  min: number;
  max: number;
  isMoney?: boolean;
  step?: number;
  suffix?: string;
}

const MultiRangeInput = ({
  name,
  min,
  max,
  isMoney,
  step,
  suffix,
}: MultiRangeInputProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);
  const defaultStep = step ?? 1;

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const usMoney = useCallback(
    (value: number) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: isMoney ? "currency" : "decimal",
        currency: "USD",
        maximumFractionDigits: 0, // Causes 2500.99 to be printed as $2,501
      });

      return formatter.format(value);
    },
    [isMoney]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="w-full relative flex justify-center items-center">
      <input
        type="range"
        min={min}
        max={max}
        step={defaultStep}
        value={minVal}
        name={`min-${name}`}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb absolute h-0 w-full outline-none z-30 pointer-events-none appearance-none accent-primary-700"
        style={{ zIndex: minVal > max - 100 ? "30" : "50" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={defaultStep}
        value={maxVal}
        name={`max-${name}`}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb absolute h-0 w-full outline-none z-40 pointer-events-none appearance-none accent-primary-700"
      />
      <div className="relative w-full">
        <div className="absolute bg-gray-300 w-full z-10 rounded-md h-1"></div>
        <div
          ref={range}
          className="absolute bg-primary-300 w-full z-10 rounded-md h-1"
        ></div>
        <div className="absolute left-0 top-6 font-sans text-black px-2 py-1 border border-black rounded-3xl">
          {usMoney(minVal)} {suffix}
        </div>
        <div className="absolute right-0 top-6 font-sans text-black px-2 py-1 border border-black rounded-2xl">
          {usMoney(maxVal)} {suffix}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeInput;
