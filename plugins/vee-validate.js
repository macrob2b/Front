import {extend, localize}           from "vee-validate";
import {required, email, confirmed} from "vee-validate/dist/rules";

const dictionary = {
  en: {
    messages: {
      required : () => 'This field is required',
      email    : () => 'Enter a valid email',
      confirmed: () => 'Password does not match',
    },
  },
};

extend("required", required);
extend("email", email);
extend("confirmed", confirmed);


localize(dictionary);
