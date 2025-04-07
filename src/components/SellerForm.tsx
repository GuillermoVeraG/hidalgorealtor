import { useState } from "react";
import NumberInput from "@/components/NumberInput.tsx";
import MultiRangeInput from "@/components/MultiRangeInput";
import { MAX_SQFT } from "@/utils/property";

import { actions } from "astro:actions";

import type { LabelsSellerParams, SellerFormParams } from "@/utils/property";

export interface SellerInputProps {
  labels: LabelsSellerParams;
}

const initVal = {
  FirstName: "",
  LastName: "",
  Email: "",
  Prefix: "",
  Phone: "",
  Location: "",
  beds: 0,
  baths: 0,

  view: false,
  parking: false,
  pool: false,

  "min-sqft": 0,
  "max-sqft": MAX_SQFT,
} as SellerFormParams;

const Seller = ({ labels }: SellerInputProps) => {
  var [formData, setFormData] = useState(initVal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setFormData(initVal);
  };

  const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit form", e);

    const formData = new FormData(e.currentTarget);

    const dialogForm = document.getElementById(
        "dialogForm"
      ) as HTMLDialogElement,
      dialogFormError = document.getElementById(
        "dialogFormError"
      ) as HTMLDialogElement;

    const { error } = await actions.emails.sendEmailSeller(formData);

    if (error) {
      dialogFormError?.showModal();
      return;
    }

    e.currentTarget?.reset();
    dialogForm?.showModal();
  };

  return (
    <form
      onReset={resetForm}
      onSubmit={submitForm}
      className="px-12 pt-8 pb-16 bg-primary-100 rounded-xl w-full lg:w-1/2"
    >
      <h3 className="font-serif text-4xl">{labels.title}</h3>
      <p className="w-full mt-2 mb-8">{labels.description}</p>

      <div className="flex justify-around items-center gap-6 w-full">
        <div className="w-full my-6">
          <label htmlFor="seller-FirstName">
            {labels.firstname}
            <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full bg-primary-100 border border-black rounded py-1 px-2 font-sans"
            id="seller-FirstName"
            required
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
          />
        </div>

        <div className="w-full my-6">
          <label htmlFor="seller-LastName">
            {labels.lastname} <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full bg-primary-100 border border-black rounded py-1 px-2 font-sans"
            type="text"
            id="seller-LastNam"
            required
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="seller-email">
          {labels.email} <span className="text-red-700">*</span>
        </label>
        <input
          className="w-full bg-primary-100 border border-black rounded py-1 px-2 font-sans"
          type="email"
          id="seller-email"
          required
          name="Email"
          value={formData.Email}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-around items-start gap-4 w-full my-6">
        <div className="w-1/3">
          <label htmlFor="seller-Prefix">{labels.prefix} </label>
          <input
            className="w-full bg-primary-100 border border-black rounded py-1 px-2 font-sans"
            type="text"
            id="seller-Prefix"
            name="Prefix"
            value={formData.Prefix}
            onChange={handleChange}
          />
        </div>

        <div className="w-full">
          <label htmlFor="seller-Phone">{labels.phone} </label>
          <input
            className="w-full bg-primary-100 border border-black rounded py-1 px-2 font-sans"
            type="number"
            id="seller-Phone"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="my-6">
        <label htmlFor="seller-Location">
          {labels.location} <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full bg-primary-100 border border-black rounded py-1 px-2 font-sans"
          type="text"
          id="seller-Location"
          required
          name="Location"
          value={formData.Location}
          onChange={handleChange}
        />
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-4 my-6">
        <div className="font-sans text-black text-sm font-medium">
          {labels.meters}
        </div>

        <MultiRangeInput
          name="sqft"
          min={0}
          max={5000}
          step={250}
          suffix="sqft"
          minVal={formData["min-sqft"]}
          maxVal={formData["max-sqft"]}
          setVal={setFormData}
        />
      </div>

      <h3 className="font-sans text-lg mt-24">{labels.bedsbaths}</h3>

      <div className="flex justify-around items-center gap-4 w-full my-10">
        <div className="flex justify-start items-center gap-4 w-full">
          <label htmlFor="seller-beds">{labels.bedrooms}</label>
          <NumberInput
            id="seller-beds"
            name="beds"
            value={formData.beds}
            setVal={setFormData}
          />
        </div>

        <div className="flex justify-start items-center gap-4 w-full">
          <label htmlFor="seller-baths">{labels.bathrooms}</label>
          <NumberInput
            id="seller-baths"
            name="baths"
            value={formData.baths}
            setVal={setFormData}
          />
        </div>
      </div>

      <h3 className="font-sans text-lg">{labels.items}</h3>

      <div className="flex justify-start items-center gap-4 my-8">
        <div className="flex justify-center items-center gap-2">
          <div className="grid justify-center items-center gap-2">
            <input
              className="peer row-start-1 col-start-1 appearance-none size-6 bg-primary-100 border-2 border-gray-600 rounded checked:bg-primary checked:border-primary checked:text-white"
              type="checkbox"
              id="seller-parking"
              name="parking"
              checked={formData.parking}
              onChange={handleCheckChange}
            />
            <svg
              viewBox="0 0 14 14"
              fill="none"
              className="pointer-events-none invisible peer-checked:visible size-6 row-start-1 col-start-1 stroke-white"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <label className="text-sm font-sans" htmlFor="seller-parking">
            {labels.parking}
          </label>
        </div>

        <div className="flex justify-center items-center gap-2">
          <div className="grid justify-center items-center gap-2">
            <input
              className="peer row-start-1 col-start-1 appearance-none size-6 bg-primary-100 border-2 border-gray-600 rounded checked:bg-primary checked:border-primary checked:text-white"
              type="checkbox"
              id="seller-pool"
              name="pool"
              checked={formData.pool}
              onChange={handleCheckChange}
            />
            <svg
              viewBox="0 0 14 14"
              fill="none"
              className="pointer-events-none invisible peer-checked:visible size-6 row-start-1 col-start-1 stroke-white"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>

          <label htmlFor="seller-pool">{labels.pool}</label>
        </div>

        <div className="flex justify-center items-center gap-2">
          <div className="grid justify-center items-center gap-2">
            <input
              className="peer row-start-1 col-start-1 appearance-none size-6 bg-primary-100 border-2 border-gray-600 rounded checked:bg-primary checked:border-primary checked:text-white"
              type="checkbox"
              id="seller-view"
              name="view"
              checked={formData.view}
              onChange={handleCheckChange}
            />
            <svg
              viewBox="0 0 14 14"
              fill="none"
              className="pointer-events-none invisible peer-checked:visible size-6 row-start-1 col-start-1 stroke-white"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <label htmlFor="seller-view">{labels.view}</label>
        </div>
      </div>

      <button
        type="submit"
        className="w-55 py-4 bg-primary-700 rounded-full text-white mt-8"
      >
        {labels.button}
      </button>
      <h4 className="font-sans text-md mt-2 ml-1">{labels.buttontext}</h4>
    </form>
  );
};

export default Seller;
