const ValidationRules = {
  first_name: /([A-ZА-Я][a-zа-я\-]+$)/, 
  second_name: /([A-ZА-Я][a-zа-я\-]+?$)/, 
  login: /([a-zA-Z_-]((?![0-9]+$)[a-zA-Z0-9_-]){2,19}$)/,
  email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,40}$/,
  phone: /^[+]?(?:[0-9]{10}|[0-9]{15})$/,
  message: /(\S+$)/
};
export default ValidationRules;
