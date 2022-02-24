import {extend, localize}                from "vee-validate";
import {required, email, confirmed, min} from "vee-validate/dist/rules";

let phoneRegex = /^\+(?:[0-9\-] ?){6,14}[0-9]$/;
const phone    = {
  validate(value, args) {
    return phoneRegex.test(value);
  }
};

const dictionary = {
  en: {
    messages: {
      required : () => `This field is required`,
      email    : () => `Enter a valid email`,
      confirmed: () => `Password does not match`,
      min      : (_, {length}) => `This field must be at least ${length} characters`,
      phone    : () => `Phone is not valid`,
    },
  },
};

extend("required", required);
extend("email", email);
extend("confirmed", confirmed);
extend("min", min);
extend("phone", phone);


localize(dictionary);
