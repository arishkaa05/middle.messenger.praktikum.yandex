//@ts-nocheck

interface ErrorItem {
  input: HTMLInputElement;
  message: string;
}

const formValidation = () => { 
  setTimeout(() => {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const inputFields = form.querySelectorAll("input");
        let allFieldsFilled = true;
        const errors: ErrorItem[] = [];

        inputFields.forEach((input) => {
          if (input.type !== 'file' && input.value.trim() === "") {
            allFieldsFilled = false;
            errors.push({ input, message: `Поле "${input.title}" должно быть заполнено` });
          }
        });

        const newPasswordInputs = form.querySelectorAll('input[name="newPassword"]');
        if (newPasswordInputs.length === 2) {
          for (let i = 0; i < newPasswordInputs.length; i++) {
            const input = newPasswordInputs[i];  
            if (i > 0 && input.value !== newPasswordInputs[i - 1].value) { 
              allFieldsFilled = false;
              errors.push({ input: input, message: "Пароли должны совпадать" });
            }
          }
        }

        if (!allFieldsFilled) {
          errors.forEach((error) => { 
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.classList.add('text-red');
            errorMessage.textContent = error.message;
            if (error && error.input  && error.input.parentNode) error.input.parentNode.insertBefore(errorMessage, error.input.nextSibling);
          });
        } else {
          
          const errorMessages = document.querySelectorAll('.error-message');
          errorMessages.forEach(message => message.remove());  
          window.location.href = 'chat'; 
        } 
      });
    }
  }); 
};

export default formValidation;
