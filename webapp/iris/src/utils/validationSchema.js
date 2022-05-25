import * as Yup from "yup";

/**
 * Validation Schema for the User Registration and Login Form
 */
const formSchema = Yup.object().shape({
  emailID: Yup.string().email().required(),
  password: Yup.string().required().min(6),
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  emp_id: Yup.number().required(),
  role: Yup.string(),
});

const loginSchema = Yup.object().shape({
  emailID: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

const signUpSchema = Yup.object().shape({
  firstName: Yup.string().min(2,'Name is too short').max(15,'Name is too long').required(),
  lastName: Yup.string().min(2,'Name is too short').max(15,'Name is too long').required(),
  address: Yup.string().required(),
  phoneNumber: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Phone Number is not valid"),
  emailID: Yup.string().email().required(),
  role: Yup.string().required(),
  zipCodeMin: Yup.string().matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/,"Invalid Zip Code"),
  zipCodeMax: Yup.string().matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/,"Invalid Zip Code"),
});

export { formSchema, loginSchema, signUpSchema };
