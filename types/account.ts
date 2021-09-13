export interface IProfile {
  email: string;
  given_name?: string;
  family_name?: string;
  picture?: { url: string };
}

export interface ICreateAccount {
  login: string;
  given_name: string;
  family_name: string;
  password: string;
  passwordConfirmation: string;
}

export interface IAddress {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: "CAN" | "USA";
}
