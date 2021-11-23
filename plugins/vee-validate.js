import {extend, localize} from "vee-validate";
import {required, email}  from "vee-validate/dist/rules";

const dictionary = {
  en: {
    messages: {
      required: () => 'This field is required',
      email   : () => 'Enter a valid email',
    },
  },
};

// Install required rule.
extend("required", required);

// Install email rule.
extend("email", email);


localize(dictionary);
