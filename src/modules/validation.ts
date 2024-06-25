import ValidationRules from "./validationRules";

const setErrors = (isValid: boolean, errors: { input: HTMLElement; message: string }[]) => {
  if (!isValid) {
    errors.forEach((error) => {
      const errorMessage = document.createElement("div");
      errorMessage.classList.add("error-message");
      errorMessage.classList.add("text-red");
      errorMessage.textContent = error.message;
      if (error.input && error.input.parentNode) error.input.parentNode.insertBefore(errorMessage, error.input.nextSibling);
    });
  } else {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((message) => message.remove());
  }
  return errors;
};

const onCheckValidation = (input: HTMLInputElement) => {
  let errors = [];
  const validationRule = new RegExp(ValidationRules[input.name as keyof typeof ValidationRules]);
  if (validationRule) {
    const isValid = validationRule.test(input.value);
    if (!isValid) {
      errors.push({ input, message: `Поле "${input.title}" заполнено некорректно` });
    }
    errors = setErrors(isValid, errors);
    return isValid;
  }
  return true;
};

const formValidation = (form: HTMLElement) => {
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", (event) => {
      event.preventDefault();
      inputs.forEach((input) => {
        if ((input as HTMLInputElement).value.length > 0) onCheckValidation(input as HTMLInputElement);
      });
    });
  });

  let allFieldsFilled: boolean = true;
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    inputs.forEach((input) => {
      allFieldsFilled = !onCheckValidation((input as HTMLInputElement)) ? false : true;
    });

    if (allFieldsFilled) {
      const formData: Record<string, string> = Array.from(inputs).reduce((acc, input) => {
        acc[(input as HTMLInputElement).name] = (input as HTMLInputElement).value;
        return acc;
      }, {} as Record<string, string>);

      console.log(formData);
    }
  });
};

export default formValidation;
