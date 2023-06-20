import Joi from 'joi';

/* eslint-disable @typescript-eslint/no-explicit-any */
function validatePostRecord(owner: any) {
  const schema = Joi.object({
    temperature: Joi.number().min(0).required(),
    oxygen: Joi.number().min(0).required(),
    acidity: Joi.number().min(0).required(),
    salinity: Joi.number().min(0).required(),
  });
  return schema.validate(owner);
}

export { validatePostRecord };

