import { ValidatorConstructor } from './Validator';
import { ValidationError } from '../errors';

type mp = { [key: string]: any };

export interface ValidatorSuiteConstructor<t> {
  new(data: t): ValidatorSuite<t>;
}

export type ValidatorMap = { [key: string]: ValidatorConstructor<any> }

export default abstract class ValidatorSuite<t> {
  public errors: ValidationError[] = [];
  public validators: { [key: string]: ValidatorConstructor<any> } = {};
  protected data: t & mp;

  constructor(data: t & mp) {
    this.data = data;
  }

  public validate = (): ValidatorSuite<t> => {
    const keys = Object.keys(this.data);
    const len = keys.length;

    if (!len) throw new Error('Validator has no validators in it')

    for (let i = 0; i < len; i += 1) {
      let key = keys[i];
      const validator = new (this.validators[key])(this.data[key]);
      if (!validator.passing) this.errors.push(validator.error as ValidationError);
    }

    return this
  }
}