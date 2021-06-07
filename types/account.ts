export interface Profile {
  givenName: string;
  familyName: string;
}

export interface Account extends Profile {
  email: string;
  password: string;
  passwordConfirmation: string;
}
