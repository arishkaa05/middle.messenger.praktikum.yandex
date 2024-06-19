const formValidation = () => { 
  setTimeout(() => {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const inputFields = form.querySelectorAll("input");
        let allFieldsFilled = true;
        const errors = []; 

        inputFields.forEach((input) => {
          if (input.type !== 'file' && input.value.trim() === "") {
            allFieldsFilled = false;
            errors.push({ input, message: `Поле "${input.title}" должно быть заполнено` });
          }
        });

        const newPasswordInputs = form.querySelectorAll('input[name="newPassword"]');
        if (newPasswordInputs.length === 2) {
          if ((newPasswordInputs[0] as HTMLInputElement).value !== (newPasswordInputs[1] as HTMLInputElement).value) { 
            allFieldsFilled = false;
            errors.push({ input: newPasswordInputs[1], message: "Пароли должны совпадать" });
          }
        }

        if (!allFieldsFilled) {
          errors.forEach((error) => { 
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.classList.add('text-red');
            errorMessage.textContent = error.message;
            error.input.parentNode.insertBefore(errorMessage, error.input.nextSibling);
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
