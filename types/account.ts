export interface Profile {
  givenName: string;
  familyName: string;
}

export interface Account extends Profile {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
