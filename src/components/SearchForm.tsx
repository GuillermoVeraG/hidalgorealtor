import { useState } from "react";
import NumberInput from "@/components/NumberInput.tsx";
import MultiRangeInput from "@/components/MultiRangeInput";
import type {
  PropertySearchParams,
  LabelsSearchParams,
} from "@/utils/property";
import { MAX_SQFT, MAX_PRICE } from "@/utils/property";

import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";

export interface SearchInputProps {
  isFilter: boolean;
  data: PropertySearchParams;
  labels: LabelsSearchParams;
}

const Search = ({ isFilter, data, labels }: SearchInputProps) => {
  const width = isFilter ? "w-full" : "w-full md:w-1/2";
  const flexDir = isFilter ? "flex-col" : "flex-col md:flex-row";
  var [formData, setFormData] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    console.log(name, checked);
    setFormData((prevState) => ({ ...prevState, [name]: checked }));
  };

  const resetForm = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({
      address: "",
      type: data.type ? data.type : "sale",
      subtype: "Single Family Residence",
      beds: 0,
      baths: 0,
      view: false,
      parking: false,
      pool: false,
      "min-price": 0,
      "max-price": MAX_PRICE,
      "min-sqft": 0,
      "max-sqft": MAX_SQFT,
    });
  };

  const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit form", e);

    const isSpa = window.location.pathname.includes("/es/");
    const formData = new FormData(e.currentTarget);

    const { data, error } = await actions.property.getUrlParams(formData);

    if (!error) navigate(`${isSpa ? "/es" : ""}/buyer/result/${data}`);
    else console.error(error);
  };

  return (
    <form
      className={`flex ${flexDir} justify-between items-center gap-14`}
      method="POST"
      id="filtersForm"
      onSubmit={submitForm}
      onReset={resetForm}
    >
      <div className={`${width} flex flex-col justify-start items-start gap-4`}>
        <div className="w-11/12 flex flex-col justify-start items-start gap-2 font-sans text-sm">
          <label htmlFor="property-address">{labels.address}</label>
          <input
            className="w-full bg-primary-100 border border-black rounded py-1 px-2 font-sans"
            type="text"
            id="property-address"
            required
            name="address"
            value={formData.address ? formData.address : ""}
            onChange={handleChange}
          />
        </div>

        <input
          type="hidden"
          name="type"
          value={formData.type ? formData.type : "sale"}
          onChange={handleChange}
        />

        <div className="w-11/12 flex flex-col justify-start items-start gap-2 font-sans text-sm">
          <label htmlFor="property-type">{labels.subtype}</label>
          <select
            className="w-full bg-primary-100 accent-primary-700 border border-black rounded py-1 px-2 font-sans"
            id="property-type"
            name="subtype"
            value={
              formData.subtype ? formData.subtype : "Single Family Residence"
            }
            onChange={handleSelectChange}
          >
            <option value="Single Family Residence">Single Family</option>
            <option value="Condominium">Condo</option>
            <option value="Multy Family">Multy-Family</option>
            <option value="Comercial">
              Comercial / Industrial / Agriculture
            </option>
          </select>
        </div>

        <div className="font-sans text-black text-sm font-medium mt-4">
          {labels.bedsbaths}
        </div>

        <div className="flex justify-center items-center gap-2">
          <label className="w-28" htmlFor="property-beds">
            {labels.beds}
          </label>
          <NumberInput
            name="beds"
            id="property-beds"
            value={formData.beds ? formData.beds : 0}
            setVal={setFormData}
          />
        </div>

        <div className="flex justify-center items-center gap-2">
          <label className="w-28" htmlFor="property-baths">
            {labels.baths}
          </label>
          <NumberInput
            name="baths"
            id="property-baths"
            value={formData.baths ? formData.baths : 0}
            setVal={setFormData}
          />
        </div>

        <div className="font-sans text-black font-medium mt-4">
          {labels.amenities}
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            <div className="grid justify-center items-center gap-2">
              <input
                className="peer row-start-1 col-start-1 appearance-none size-6 bg-primary-100 border-2 border-gray-600 rounded checked:bg-primary checked:border-primary checked:text-white"
                type="checkbox"
                id="property-view"
                name="view"
                checked={formData.view ? formData.view : false}
                onChange={handleCheckChange}
              />
              <svg
                viewBox="0 0 14 14"
                fill="none"
                className="pointer-events-none invisible peer-checked:visible size-6 row-start-1 col-start-1 stroke-white"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <label className="text-sm font-sans" htmlFor="property-view">
              {labels.view}
            </label>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="grid justify-center items-center gap-2">
              <input
                className="peer row-start-1 col-start-1 appearance-none size-6 bg-primary-100 border-2 border-gray-600 rounded checked:bg-primary checked:border-primary checked:text-white"
                type="checkbox"
                id="property-parking"
                name="parking"
                checked={formData.parking ? formData.parking : false}
                onChange={handleCheckChange}
              />
              <svg
                viewBox="0 0 14 14"
                fill="none"
                className="pointer-events-none invisible peer-checked:visible size-6 row-start-1 col-start-1 stroke-white"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>

            <label htmlFor="property-parking">{labels.parking}</label>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="grid justify-center items-center gap-2">
              <input
                className="peer row-start-1 col-start-1 appearance-none size-6 bg-primary-100 border-2 border-gray-600 rounded checked:bg-primary checked:border-primary checked:text-white"
                type="checkbox"
                id="property-pool"
                name="pool"
                checked={formData.pool ? formData.pool : false}
                onChange={handleCheckChange}
              />
              <svg
                viewBox="0 0 14 14"
                fill="none"
                className="pointer-events-none invisible peer-checked:visible size-6 row-start-1 col-start-1 stroke-white"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <label htmlFor="property-pool">{labels.pool}</label>
          </div>
        </div>
      </div>
      <div
        className={`${width} flex flex-col justify-start items-start gap-24`}
      >
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <div className="font-sans text-black text-sm font-medium">
            {labels.pricetitle}
          </div>
          <p className="font-sans text-black text-xs mb-4">
            {labels.pricedesc}
          </p>

          <MultiRangeInput
            name="price"
            min={0}
            max={MAX_PRICE}
            isMoney
            step={500}
            minVal={formData["min-price"]}
            maxVal={formData["max-price"]}
            setVal={setFormData}
          />
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="font-sans text-black text-sm font-medium">
            {labels.sqfttitle}
          </div>
          <p className="font-sans text-black text-xs">{labels.sqftdesc}</p>

          <MultiRangeInput
            name="sqft"
            min={0}
            max={MAX_SQFT}
            step={250}
            suffix="sqft"
            minVal={formData["min-sqft"]}
            maxVal={formData["max-sqft"]}
            setVal={setFormData}
          />
        </div>

        {!isFilter && (
          <div>
            <button
              type="submit"
              className="mt-4 px-16 py-2 bg-primary-700 rounded-full text-white"
            >
              {labels.butsubmit}
            </button>
          </div>
        )}

        {isFilter && (
          <footer className="w-full py-2 border-t border-t-black flex justify-between items-center gap-4">
            <button type="reset" id="clearFilters" className="font-semibold">
              {labels.butclear}
            </button>
            <button
              type="submit"
              className="px-16 py-2 bg-primary-700 rounded-full text-white"
            >
              {labels.butsubmit}
            </button>
          </footer>
        )}
      </div>
    </form>
  );
};

export default Search;
