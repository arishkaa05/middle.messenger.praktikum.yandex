const ValidationRules = {
    first_name: /([A-ZА-Я][a-zа-я\-]+$)/,
    second_name: /([A-ZА-Я][a-zа-я\-]+?$)/,
    login: /^[a-z0-9_-]{3,20}$/,
    email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,40}$/,
    phone: /^[+]?(?:[0-9]{10}|[0-9]{15})$/,
    message: /(\S+$)/,
};
export default ValidationRules;
