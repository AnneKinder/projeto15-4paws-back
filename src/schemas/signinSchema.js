import joi from "joi";

const signinSchema = joi.object({
  email: joi.string().required(),
  password: joi.required(),
});

export default signinSchema;