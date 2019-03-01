import { ValidationError } from "../errors";

export type ValidationFunc = (item: any) => ValidationError | undefined;

export interface ICompleteValidator<t> extends Validator<t> {
  propName: string;
}

export interface ValidatorConstructor<t> {
  new(item: any): ICompleteValidator<t>
}

export default abstract class Validator<t> {
  public error?: ValidationError;
  public passing: boolean = false;
  protected item: t;
  protected test: ValidationFunc;

  constructor(item: t, test: ValidationFunc) {
    this.item = item;
    this.test = test;
    this.run();
  }

  protected run = () => {
    this.error = this.test(this.item);
    if (!this.error) {
      this.passing = true;
    }

    return this;
  }

}