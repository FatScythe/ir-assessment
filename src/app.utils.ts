export const PASSWORD_RULE =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const PASSWORD_RULE_MESSAGE =
  'Password should have 1 uppercase, lowercase letter along with a number and special character.';
