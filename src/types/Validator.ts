interface Validator {
  validate(callback: (isValid: boolean) => void): boolean;
}

export default Validator;
