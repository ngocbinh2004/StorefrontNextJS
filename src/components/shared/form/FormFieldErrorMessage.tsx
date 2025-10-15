import { ErrorMessage } from "@hookform/error-message";
import React, { FC } from "react";
import { FieldErrors } from "react-hook-form";

export interface FormFieldErrorMessageProps {
  fieldErrors: FieldErrors;
  name: string;
}

const FormFieldErrorMessage: FC<FormFieldErrorMessageProps> = ({
  fieldErrors,
  name,
}) => {
  return (
    <ErrorMessage
      errors={fieldErrors}
      name={name}
      render={({ message }) => (
        <p className="text-xs text-red-500 px-4 py-2">{message}</p>
      )}
    />
  );
};
export default FormFieldErrorMessage;
