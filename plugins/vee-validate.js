import {extend, localize}                from "vee-validate";
import {required, email, confirmed, min} from "vee-validate/dist/rules";

const dictionary = {
  en: {
    messages: {
      required : () => `This field is required`,
      email    : () => `Enter a valid email`,
      confirmed: () => `Password does not match`,
      min      : (_, {length}) => `This field must be at least ${length} characters`,
    },
  },
};

extend("required", required);
extend("email", email);
extend("confirmed", confirmed);
extend("min", min);


localize(dictionary);
