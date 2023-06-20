/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';
import { joiObjectId } from 'ts-joi-objectid';

interface ObjectId {
  id: string;
}

const MyJoi = joiObjectId(Joi);

function objectIdValidator(id: string, title: string, isId: boolean) {
  const schema = Joi.object<ObjectId>({
    id: MyJoi()
      .required()
      .error((errors: Joi.ErrorReport[]): any => {
        errors.forEach((err) => {
          switch (err.code) {
            case 'string.empty':
              err.message = isId ? title + ' id tidak boleh kosong!' : title + ' id cannot be empty!';
              break;
            case 'string.base':
              err.message = isId ? title + ' id haruslah sebuah string!' : title + ' id should be a string!';
              break;
            case 'string.pattern.name':
              err.message = isId ? title + ' id tidak valid dengan pola ObjectId!' : title + ' id is invalid ObjectId pattern!';
              break;
            default:
              break;
          }
        });
        return errors;
      })
  });
  return schema.validate({ id });
}

export { objectIdValidator };
