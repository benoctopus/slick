// to be used for convenineince for simple regex tests

import { default as Validator, ValidationFunc } from './Validator';
import { default as ValidationError, IValidationErrorInfo } from '../errors/ValidationError'


const getRegexValidator = (
  regex: RegExp,
  errorData: IValidationErrorInfo
): ValidationFunc => (
    (item): ValidationError | undefined => {
      return regex.test(item) ?
        undefined
        : new ValidationError('Regex test failed', errorData)
    }
  )


export default class RegexTest extends Validator<string> {
  constructor(item: string, regex: RegExp, errorData: IValidationErrorInfo) {
    super(item, getRegexValidator(regex, errorData))
  }
}