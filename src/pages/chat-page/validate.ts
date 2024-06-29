import { teatarea } from './module';
import { checkInput, setErrors } from '../../modules/validation';

export const validateMessage = (e: Event) => {
    e.preventDefault();
    const input = teatarea.getContent() as HTMLInputElement;
    const inputValue = (teatarea.getContent() as HTMLInputElement).value;
    teatarea.setProps({ value: inputValue });
    const checking = checkInput(input.name, input.value);
    const res = setErrors(teatarea, input.title, checking);
    return res;
};

export const submitForm = (e: Event) => {
    e.preventDefault();
    const isValid = validateMessage(e);
    if (isValid) {
        const inputValue = (teatarea.getContent() as HTMLInputElement).value;
        console.log({ message: inputValue });
    }
};
