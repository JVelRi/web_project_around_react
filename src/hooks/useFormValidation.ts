import { useState } from "react";
import type { ChangeEvent } from "react";

type ValidationErrors = Record<string, string>;

export default function useFormValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;

    setErrors((previousErrors) => ({
      ...previousErrors,
      [input.name]: input.validationMessage,
    }));

    setIsValid(input.form?.checkValidity() ?? false);
  }

  function validateForm(form: HTMLFormElement): boolean {
    const inputs = Array.from(form.querySelectorAll<HTMLInputElement>("input"));

    const newErrors: ValidationErrors = {};
    inputs.forEach((input) => {
      if (!input.validity.valid) {
        newErrors[input.name] = input.validationMessage;
      }
    });

    setErrors(newErrors);

    const valid = form.checkValidity();
    setIsValid(valid);

    return valid;
  }
  return {
    errors,
    isValid,
    handleChange,
    validateForm,
  };
}
