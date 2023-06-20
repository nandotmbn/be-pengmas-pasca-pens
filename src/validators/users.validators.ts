/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';

function validateLogin(owner: AuthLoginInterface) {
  const schema = Joi.object({
    username: Joi.string().min(1).max(255).trim().required(),
    password: Joi.string().min(8).max(255).trim().required()
  });
  return schema.validate(owner);
}

function validateRegister(owner: any) {
  const schema = Joi.object({
    fullName: Joi.string().min(1).max(255).trim().required(),
    username: Joi.string().min(5).max(255).trim().required(),
    password: Joi.string().min(8).max(255).trim().required()
  });
  return schema.validate(owner);
}

function validateUpdate(owner: any) {
  const schema = Joi.object({
    fullName: Joi.string().min(1).max(255).trim().required(),
    username: Joi.string().min(5).max(255).trim().required()
  });
  return schema.validate(owner);
}

function validateUpdatePassword(owner: any) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(8).max(255).trim().required(),
    newPassword: Joi.string().min(8).max(255).trim().required()
  });
  return schema.validate(owner);
}

export { validateRegister, validateLogin, validateUpdate, validateUpdatePassword };
