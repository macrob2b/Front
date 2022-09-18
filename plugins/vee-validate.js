import {extend, localize}                from "vee-validate";
import {required, email, confirmed, min,size,image,min_value,max_value} from "vee-validate/dist/rules";

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
      size    : (_, {size}) => `Max size is ${size}KB`,
      image    : () => `Image type is incorrect`,
      min_value    : (_, {min}) => `The value must be less than ${min} `,
      max_value    : (_, {max}) => `The value must be greater than ${max}`,
    },
  },
};

extend("required", required);
extend("size", size);
extend("email", email);
extend("confirmed", confirmed);
extend("min", min);
extend("min_value", min_value);
extend("max_value", max_value);
extend("phone", phone);
extend("image", image);


localize(dictionary);
