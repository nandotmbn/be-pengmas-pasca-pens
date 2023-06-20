import Joi from 'joi';

/* eslint-disable @typescript-eslint/no-explicit-any */
function validatePostBiodatas(owner: any, isId: boolean) {
  const schema = Joi.object({
    address: Joi.string()
      .min(1)
      .max(255)
      .trim()
      .required()
      .error((errors: Joi.ErrorReport[]): any => {
        errors.forEach((err) => {
          switch (err.code) {
            case 'any.required':
              err.message = isId ? 'Address dibutuhkan!' : 'Address is required!';
              break;
            case 'string.base':
              err.message = isId ? 'Address haruslah sebuah string!' : 'Address has to be string!';
              break;
            case 'string.empty':
              err.message = isId ? 'Address tidak boleh kosong!' : 'Address must not be empty';
              break;
            case 'string.min':
              err.message = isId
                ? `Address setidaknya memiliki panjang ${err.local.limit} karakter!`
                : `Address length must be at least ${err.local.limit} character length!`;
              break;
            case 'string.max':
              err.message = isId
                ? `Address tidak boleh melebihi ${err.local.limit} karakter!`
                : `Address cannot be longer than ${err.local.limit} characters!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    avatar: Joi.string()
      .min(1)
      .max(255)
      .trim()
      .required()
      .error((errors: Joi.ErrorReport[]): any => {
        errors.forEach((err) => {
          switch (err.code) {
            case 'any.required':
              err.message = isId ? 'Avatar dibutuhkan!' : 'Avatar is required!';
              break;
            case 'string.base':
              err.message = isId ? 'Avatar haruslah sebuah string!' : 'Avatar has to be string!';
              break;
            case 'string.empty':
              err.message = isId ? 'Avatar tidak boleh kosong!' : 'Avatar must not be empty';
              break;
            case 'string.min':
              err.message = isId
                ? `Avatar setidaknya memiliki panjang ${err.local.limit} karakter!`
                : `Avatar length must be at least ${err.local.limit} character length!`;
              break;
            case 'string.max':
              err.message = isId
                ? `Avatar tidak boleh melebihi ${err.local.limit} karakter!`
                : `Avatar cannot be longer than ${err.local.limit} characters!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    personalWebsite: Joi.string()
      .min(1)
      .max(255)
      .trim()
      .required()
      .error((errors: Joi.ErrorReport[]): any => {
        errors.forEach((err) => {
          switch (err.code) {
            case 'any.required':
              err.message = isId ? 'Personal Website dibutuhkan!' : 'Personal Website is required!';
              break;
            case 'string.base':
              err.message = isId ? 'Personal Website haruslah sebuah string!' : 'Personal Website has to be string!';
              break;
            case 'string.empty':
              err.message = isId ? 'Personal Website tidak boleh kosong!' : 'Personal Website must not be empty';
              break;
            case 'string.min':
              err.message = isId
                ? `Personal Website setidaknya memiliki panjang ${err.local.limit} karakter!`
                : `Personal Website length must be at least ${err.local.limit} character length!`;
              break;
            case 'string.max':
              err.message = isId
                ? `Personal Website tidak boleh melebihi ${err.local.limit} karakter!`
                : `Personal Website cannot be longer than ${err.local.limit} characters!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    phoneNumber: Joi.string()
      .min(8)
      .max(16)
      .trim()
      .required()
      .error((errors: Joi.ErrorReport[]): any => {
        errors.forEach((err) => {
          switch (err.code) {
            case 'any.required':
              err.message = isId ? 'Phone Number dibutuhkan!' : 'Phone Number is required!';
              break;
            case 'string.base':
              err.message = isId ? 'Phone Number haruslah sebuah string!' : 'Phone Number has to be string!';
              break;
            case 'string.empty':
              err.message = isId ? 'Phone Number tidak boleh kosong!' : 'Phone Number must not be empty';
              break;
            case 'string.min':
              err.message = isId
                ? `Phone Number setidaknya memiliki panjang ${err.local.limit} karakter!`
                : `Phone Number length must be at least ${err.local.limit} character length!`;
              break;
            case 'string.max':
              err.message = isId
                ? `Phone Number tidak boleh melebihi ${err.local.limit} karakter!`
                : `Phone Number cannot be longer than ${err.local.limit} characters!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    expertise: Joi.string()
      .min(1)
      .trim()
      .required()
      .error((errors: Joi.ErrorReport[]): any => {
        errors.forEach((err) => {
          switch (err.code) {
            case 'any.required':
              err.message = isId
                ? 'Expertise dibutuhkan!'
                : 'Expertise is required!';
              break;
            case 'string.base':
              err.message = isId
                ? 'Expertise haruslah sebuah string!'
                : 'Expertise has to be string!';
              break;
            case 'string.empty':
              err.message = isId
                ? 'Expertise tidak boleh kosong!'
                : 'Expertise must not be empty';
              break;
            case 'string.min':
              err.message = isId
                ? `Expertise setidaknya memiliki panjang ${err.local.limit} karakter!`
                : `Expertise length must be at least ${err.local.limit} character length!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    identityNumberOfGovernmentEmployees: Joi.string()
      .min(1)
      .trim()
      .required()
      .error((errors: Joi.ErrorReport[]): any => {
        errors.forEach((err) => {
          switch (err.code) {
            case 'any.required':
              err.message = isId
                ? 'Identity Number Of Government Employees dibutuhkan!'
                : 'Identity Number Of Government Employees is required!';
              break;
            case 'string.base':
              err.message = isId
                ? 'Identity Number Of Government Employees haruslah sebuah string!'
                : 'Identity Number Of Government Employees has to be string!';
              break;
            case 'string.empty':
              err.message = isId
                ? 'Identity Number Of Government Employees tidak boleh kosong!'
                : 'Identity Number Of Government Employees must not be empty';
              break;
            case 'string.min':
              err.message = isId
                ? `Identity Number Of Government Employees setidaknya memiliki panjang ${err.local.limit} karakter!`
                : `Identity Number Of Government Employees length must be at least ${err.local.limit} character length!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    identityNumberOfNationalLecturer: Joi.string()
      .min(1)
      .trim()
      .required()
      .error((errors: Joi.ErrorReport[]): any => {
        errors.forEach((err) => {
          switch (err.code) {
            case 'any.required':
              err.message = isId
                ? 'Identity Number Of National Lecturer dibutuhkan!'
                : 'Identity Number Of National Lecturer is required!';
              break;
            case 'string.base':
              err.message = isId
                ? 'Identity Number Of National Lecturer haruslah sebuah string!'
                : 'Identity Number Of National Lecturer has to be string!';
              break;
            case 'string.empty':
              err.message = isId
                ? 'Identity Number Of National Lecturer tidak boleh kosong!'
                : 'Identity Number Of National Lecturer must not be empty';
              break;
            case 'string.min':
              err.message = isId
                ? `Identity Number Of National Lecturer setidaknya memiliki panjang ${err.local.limit} karakter!`
                : `Identity Number Of National Lecturer length must be at least ${err.local.limit} character length!`;
              break;
            default:
              break;
          }
        });
        return errors;
      })
  });
  return schema.validate(owner);
}

export { validatePostBiodatas };
