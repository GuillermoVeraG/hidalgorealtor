import { useState } from "react";
import ResponseForm from "@/components/ResponseForm.tsx";

import { actions } from "astro:actions";

import type { LabelsContactParams, ContactFormParams } from "@/utils/property";

export interface ContactInputProps {
  labels: LabelsContactParams;
}

const initVal = {
  Name: "",
  Email: "",
  Phone: "",
  Message: "",
} as ContactFormParams;

const Contact = ({ labels }: ContactInputProps) => {
  const [formData, setFormData] = useState(initVal);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetForm = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData(initVal);
  };

  const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { error } = await actions.emails.sendEmailContact(formData);

    if (error) {
      setIsOpenError(true);
      return;
    }

    e.currentTarget?.reset();
    setIsOpen(true);
  };

  return (
    <>
      <form
        onReset={resetForm}
        onSubmit={submitForm}
        className="px-8 pt-4 pb-16 bg-primary-50 rounded-xl w-full"
      >
        <div className="flex justify-around items-center gap-6 w-full">
          <div className="w-full mt-6 mb-4">
            <label htmlFor="contact-Name">
              {labels.name} <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full bg-primary-50 border-b border-black py-2 font-sans"
              id="contact-Name"
              required
              name="Name"
              placeholder={labels.ph_name}
              value={formData.Name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full mb-4">
          <label htmlFor="contact-email">
            {labels.email} <span className="text-red-700">*</span>
          </label>
          <input
            className="w-full bg-primary-50 border-b border-black py-2 font-sans"
            type="email"
            id="contact-email"
            required
            name="Email"
            placeholder={labels.ph_email}
            value={formData.Email}
            onChange={handleChange}
          />
        </div>

        <div className="w-full mb-1">
          <label htmlFor="contact-Phone">{labels.phone}</label>
        </div>
        <input
          className="w-full bg-primary-50 border-b border-black py-2 font-sans"
          type="number"
          id="contact-Phone"
          name="Phone"
          placeholder={labels.ph_phone}
          value={formData.Phone}
          onChange={handleChange}
        />

        <div className="w-full mt-4">
          <label htmlFor="contact-Message">
            {labels.message} <span className="text-red-700">*</span>
          </label>
          <input
            className="w-full bg-primary-50 border-b border-black py-2 font-sans"
            id="contact-Messagel"
            required
            name="Message"
            placeholder={labels.ph_message}
            value={formData.Message}
            onChange={handleChange}
          />
        </div>

        <div className="text-center mt-10 gap-6">
          <button
            type="submit"
            className="px-36 py-4 bg-primary-700 rounded-full text-white"
          >
            {labels.button}
          </button>

          <p className="w-auto md:w-[415px] text-center text-xs mx-auto my-6">
            {labels.buttontext}
          </p>
        </div>
      </form>

      <ResponseForm
        msgSuccess="Your message has been received-expect a prompt and personalized response. Let’s make your real estate journey effortless and rewarding"
        msgError="We are experiencing problems at this time. Please try again later."
        isOpen={isOpen}
        isOpenError={isOpenError}
        handleOpen={setIsOpen}
        handleOpenError={setIsOpenError}
      />
    </>
  );
};

export default Contact;
