import { InputFieldModule } from '../components/input-field/module';
import ValidationRules from './validationRules';

export const checkInput = (name: string, value: string) => {
    const validationRule = new RegExp(ValidationRules[name as keyof typeof ValidationRules]);
    if (validationRule) {
        return validationRule.test(value);
    }
    return true;
};

export const setErrors = (inputField: InputFieldModule, title: string, result: boolean) => {
    if (!result) {
        inputField.setProps({ error: `Поле "${title}" заполнено некорректно` });
        return false;
    }
    inputField.setProps({ error: '' });
    return true;
};
