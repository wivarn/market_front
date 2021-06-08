import * as Yup from "yup";

import { Form, Formik } from "formik";
import { SelectBox, SelectOptions, TextField } from "../fields";

import { AddressApi } from "services/backendApi/address";
import FormContainer from "../container";
import { SubmitButton } from "components/buttons";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useSession } from "next-auth/client";

const countryList = {
  CAN: "Canada",
  USA: "United States of America",
};

const provinceList = {
  AB: "Alberta",
  BC: "British Columbia",
  MB: "Manitoba",
  NB: "New Brunswick",
  NL: "Newfoundland and Labrador",
  NT: "Northwest Territories",
  NS: "Nova Scotia",
  NU: "Nunavut",
  ON: "Ontario",
  PE: "Prince Edward Island",
  QC: "Quebec",
  SK: "Saskatchewan",
  YT: "Yukon",
};

const stateList = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const addressSchema = Yup.object().shape({
  street1: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  street2: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters"),
  city: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  state: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  zip: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  country: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
});

function stateSelect(country: string) {
  const placeholder = country ? "" : "Select country first";

  if (!country) {
    var label = "Province/State";
  } else {
    var label = country == "CAN" ? "Province/Territory" : "State";
  }

  if (!country) {
    var options: SelectOptions = {};
  } else {
    var options: SelectOptions = country == "CAN" ? provinceList : stateList;
  }

  return (
    <SelectBox
      label={label}
      name="state"
      type="text"
      placeholder={placeholder}
      options={options}
      disabled={!country}
    />
  );
}

function zipField(country: string) {
  const placeholder = country ? "" : "Select country first";

  if (!country) {
    var label = "Zip/Postal Code";
  }
  var label = country == "CAN" ? "Postal Code" : "Zip Code";

  return (
    <TextField
      label={label}
      name="zip"
      type="text"
      placeholder={placeholder}
      disabled={!country}
    />
  );
}

function zipLabel(country: string) {
  if (!country) {
    return "Zip/Postal Code";
  }
  return country == "CAN" ? "Postal Code" : "Zip Code";
}

export default function AddressForm() {
  const [session, loading] = useSession();

  function getAddresses() {
    const { data, error } = useSWR(
      session ? ["account/address", session.accessToken] : null
    );

    return {
      addresses: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { addresses, isLoading, isError } = getAddresses();

  if (isLoading || loading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  const address = addresses.data[0] || {};

  return (
    <FormContainer>
      <Formik
        initialValues={{
          street1: address.street1 || "",
          street2: address.street2 || "",
          city: address.city || "",
          state: address.state || "",
          zip: address.zip || "",
          country: address.country || "",
        }}
        validationSchema={addressSchema}
        onSubmit={async (values) => {
          AddressApi(session?.accessToken)
            .update(values)
            .then(() => {
              toast.success("address updated");
            });
        }}
      >
        {(formik) => (
          <Form>
            <SelectBox
              label="Country"
              name="country"
              placeholder={
                formik.getFieldProps("country").value ? "" : "Select country"
              }
              options={countryList}
            />

            <TextField label="Address Line 1" name="street1" type="text" />
            <TextField label="Address Line 2" name="street2" type="text" />
            <TextField label="City" name="city" type="text" />

            {stateSelect(formik.getFieldProps("country").value)}
            {zipField(formik.getFieldProps("country").value)}

            <SubmitButton
              text="Update Address"
              disabled={formik.isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
