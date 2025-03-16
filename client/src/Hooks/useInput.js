import { useState } from "react";
import { useValidation } from "./useValidation";
import DOMPurify from "dompurify";


export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value); // Очистка вводимого текста
    setValue(sanitizedValue);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  return { value, onBlur, onChange, isDirty, ...valid };
};
