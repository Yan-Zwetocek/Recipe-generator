import { useEffect, useState } from "react";

export const useValidation = (value, validations) => {
  const [errorText, setErrorText] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          if (value) {
            setIsEmpty(false);
          } else {
            setIsEmpty(true);
            setErrorText("Поле не должно быть пустым ");
          }
          break;
        case "minLengthError":
          if (value.length < validations[validation]) {
            setErrorText(
              `Минимальная длина - ${validations[validation]} символов`
            );
            setMinLengthError(true);
          } else {
            setMinLengthError(false);
          }
          break;
        case "isEmail":
          if (/\S+@\S+\.\S+/.test(value)) {
            setIsEmailError(false);
          } else {
            setIsEmailError(true);
            setErrorText("Неверный Email");
          }

          break;
        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmailError || isEmpty || minLengthError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [isEmailError, isEmpty, minLengthError]);
  return { isEmailError, isEmpty, minLengthError, errorText, isValid };
};
