import * as Yup from "yup";

import { Form, Formik } from "formik";
import { SelectBox, TextField } from "../fields";

import { Address } from "types/account";
import { AddressApi } from "services/backendApi/address";
import FormContainer from "../container";
import { SubmitButton } from "components/buttons";
import { anyObject } from "types/object";
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
    .max(100, "Must be at most 100 characters")
    .required("Required"),
  street2: Yup.string().max(100, "Must be at most 100 characters"),
  city: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(100, "Must be at most 100 characters")
    .required("Required"),
  state: Yup.mixed()
    .when("country", {
      is: "CAN",
      then: Yup.mixed().oneOf(
        Object.keys(provinceList),
        "invalid Province/Territory"
      ),
      otherwise: Yup.mixed().oneOf(Object.keys(stateList), "invalid state"),
    })
    .required("Required"),
  zip: Yup.mixed()
    .when("country", {
      is: "CAN",
      then: Yup.string()
        .matches(/\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b/, "invalid postal code")
        .min(6, "invalid postal code")
        .max(7, "invalid postal code"),
      otherwise: Yup.string()
        .matches(/\b\d{5}\b/, "invalid zip code")
        .length(5, "invalid zip code"),
    })
    .required("Required"),
  country: Yup.mixed().oneOf(Object.keys(countryList), "invalid country"),
});

function stateSelect(country: string) {
  const placeholder = country ? "" : "Select country first";

  if (!country) {
    var label = "Province/State";
  } else {
    var label = country == "CAN" ? "Province/Territory" : "State";
  }

  if (!country) {
    var options: anyObject = {};
  } else {
    var options: anyObject = country == "CAN" ? provinceList : stateList;
  }

  return (
    <SelectBox
      label={label}
      name="state"
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
      placeholder={placeholder}
      disabled={!country}
    />
  );
}

function trimValues(values: Address) {
  values.street1 = values.street1.trim();
  values.street2 = values.street2?.trim();
  values.city = values.city.trim();
  values.zip = values.zip.replace(/\s+/g, "");

  return values;
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
        onSubmit={(values, actions) => {
          AddressApi(session?.accessToken)
            .update(trimValues(values))
            .then(() => {
              toast.success("address updated");
            })
            .catch((error) => {
              toast.error(JSON.stringify(error.response.data));
            })
            .finally(() => {
              actions.setSubmitting(false);
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
