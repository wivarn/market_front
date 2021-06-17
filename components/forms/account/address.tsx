import * as Yup from "yup";

import { DropdownCombobox, TextFieldFull } from "../fields";
import { Form, Formik, FormikProps } from "formik";

import { Address } from "types/account";
import { AddressApi } from "services/backendApi/address";
import FormContainer from "../container";
import { SubmitButtonFull } from "components/buttons";
import { createRef } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useSession } from "next-auth/client";

const countryList = [
  { value: "CAN", text: "Canada" },
  { value: "USA", text: "United States of America" },
];

const provinceList = [
  { value: "AB", text: "Alberta" },
  { value: "BC", text: "British Columbia" },
  { value: "MB", text: "Manitoba" },
  { value: "NB", text: "New Brunswick" },
  { value: "NL", text: "Newfoundland and Labrador" },
  { value: "NT", text: "Northwest Territories" },
  { value: "NS", text: "Nova Scotia" },
  { value: "NU", text: "Nunavut" },
  { value: "ON", text: "Ontario" },
  { value: "PE", text: "Prince Edward Island" },
  { value: "QC", text: "Quebec" },
  { value: "SK", text: "Saskatchewan" },
  { value: "YT", text: "Yukon" },
];

const stateList = [
  { value: "AL", text: "Alabama" },
  { value: "AK", text: "Alaska" },
  { value: "AZ", text: "Arizona" },
  { value: "AR", text: "Arkansas" },
  { value: "CA", text: "California" },
  { value: "CO", text: "Colorado" },
  { value: "CT", text: "Connecticut" },
  { value: "DE", text: "Delaware" },
  { value: "DC", text: "District Of Columbia" },
  { value: "FL", text: "Florida" },
  { value: "GA", text: "Georgia" },
  { value: "HI", text: "Hawaii" },
  { value: "ID", text: "Idaho" },
  { value: "IL", text: "Illinois" },
  { value: "IN", text: "Indiana" },
  { value: "IA", text: "Iowa" },
  { value: "KS", text: "Kansas" },
  { value: "KY", text: "Kentucky" },
  { value: "LA", text: "Louisiana" },
  { value: "ME", text: "Maine" },
  { value: "MD", text: "Maryland" },
  { value: "MA", text: "Massachusetts" },
  { value: "MI", text: "Michigan" },
  { value: "MN", text: "Minnesota" },
  { value: "MS", text: "Mississippi" },
  { value: "MO", text: "Missouri" },
  { value: "MT", text: "Montana" },
  { value: "NE", text: "Nebraska" },
  { value: "NV", text: "Nevada" },
  { value: "NH", text: "New Hampshire" },
  { value: "NJ", text: "New Jersey" },
  { value: "NM", text: "New Mexico" },
  { value: "NY", text: "New York" },
  { value: "NC", text: "North Carolina" },
  { value: "ND", text: "North Dakota" },
  { value: "OH", text: "Ohio" },
  { value: "OK", text: "Oklahoma" },
  { value: "OR", text: "Oregon" },
  { value: "PA", text: "Pennsylvania" },
  { value: "RI", text: "Rhode Island" },
  { value: "SC", text: "South Carolina" },
  { value: "SD", text: "South Dakota" },
  { value: "TN", text: "Tennessee" },
  { value: "TX", text: "Texas" },
  { value: "UT", text: "Utah" },
  { value: "VT", text: "Vermont" },
  { value: "VA", text: "Virginia" },
  { value: "WA", text: "Washington" },
  { value: "WV", text: "West Virginia" },
  { value: "WI", text: "Wisconsin" },
  { value: "WY", text: "Wyoming" },
];

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
        provinceList.map((province) => {
          return province.value;
        }),
        "invalid Province/Territory"
      ),
      otherwise: Yup.mixed().oneOf(
        stateList.map((state) => {
          return state.value;
        }),
        "invalid state"
      ),
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
  country: Yup.mixed()
    .oneOf(
      countryList.map((country) => {
        return country.value;
      }),
      "invalid country"
    )
    .required("Required"),
});

const stateRef = createRef<HTMLSpanElement>();

function stateSelect(formik: FormikProps<any>) {
  const country = formik.values.country;
  const placeholder = country ? "" : "Select country first";

  const label = (() => {
    if (!country) return "Province/State";
    return country == "CAN" ? "Province/Territory" : "State";
  })();

  const items = (() => {
    if (!country) return [];
    return country == "CAN" ? provinceList : stateList;
  })();

  return (
    <DropdownCombobox
      label={label}
      name="state"
      placeholder={placeholder}
      items={items}
      formik={formik}
      disabled={!country}
      resetRef={stateRef}
    />
  );
}

function zipField(country: string) {
  const placeholder = country ? "" : "Select country first";

  const label = (() => {
    if (!country) return "Zip/Postal Code";
    return country == "CAN" ? "Postal Code" : "Zip Code";
  })();

  return (
    <TextFieldFull
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
            <DropdownCombobox
              label="Country"
              name="country"
              placeholder={
                formik.getFieldProps("country").value ? "" : "Select country"
              }
              items={countryList}
              formik={formik}
              childresetRef={stateRef}
            />

            <TextFieldFull label="Address Line 1" name="street1" type="text" />
            <TextFieldFull label="Address Line 2" name="street2" type="text" />
            <TextFieldFull label="City" name="city" type="text" />

            {stateSelect(formik)}
            {zipField(formik.getFieldProps("country").value)}

            <SubmitButtonFull
              text="Update Address"
              disabled={formik.isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
