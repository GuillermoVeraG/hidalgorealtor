import { useState, useEffect, useRef } from "react";

export interface ResponseFormProps {
  msgSuccess: string;
  msgError: string;
  isOpen: boolean;
  isOpenError: boolean;
  handleOpen: (value: boolean) => void;
  handleOpenError: (value: boolean) => void;
}

const ResponseForm = ({
  msgError,
  msgSuccess,
  isOpen,
  isOpenError,
  handleOpen,
  handleOpenError,
}: ResponseFormProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogRefError = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef?.current?.showModal();
    } else {
      dialogRef?.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpenError) {
      dialogRefError?.current?.showModal();
    } else {
      dialogRefError?.current?.close();
    }
  }, [isOpenError]);

  return (
    <>
      <dialog
        className="max-w-sm w-full bg-primary-50 text-black text-xs font-light rounded-xl backdrop:bg-primary-300/80 relative m-auto"
        ref={dialogRef}
      >
        <h5 className="p-10 text-xl font-bold tracking-tight text-black">
          {msgSuccess}
        </h5>
        <button
          className="absolute top-2 right-2"
          onClick={() => handleOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="size-6 stroke-black outline-none"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" stroke="none"></path>
            <path d="M18 6 6 18M6 6l12 12"></path>
          </svg>
        </button>
      </dialog>

      <dialog
        className="max-w-sm w-full bg-red-600 text-white text-xs font-light rounded-xl backdrop:bg-white/80 relative m-auto"
        ref={dialogRefError}
      >
        <h5 className="p-10 text-xl font-bold tracking-tight text-white">
          {msgError}
        </h5>
        <button
          className="absolute top-2 right-2"
          onClick={() => handleOpenError(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="size-6 stroke-black outline-none"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" stroke="none"></path>
            <path d="M18 6 6 18M6 6l12 12"></path>
          </svg>
        </button>
      </dialog>
    </>
  );
};

export default ResponseForm;
