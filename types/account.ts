export interface IProfile {
  given_name?: string;
  family_name?: string;
  currency?: string;
  picture?: { url: string };
  phone_number?: string;
}

export interface IAccount extends IProfile {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IAddress {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
