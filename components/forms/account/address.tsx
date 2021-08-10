import * as Yup from "yup";

import { DropdownCombobox, TextFieldFull } from "../fields";
import { Form, Formik, FormikProps } from "formik";
import { GenericErrorMessage, InfoMessage } from "components/message";
import { countryList, provinceList, stateList } from "constants/address";

import { AddressApi } from "services/backendApi/address";
import FormContainer from "../container";
import { IAddress } from "types/account";
import Link from "next/link";
import { SpinnerLg } from "components/spinner";
import { SubmitButtonFull } from "components/buttons";
import { UserSettingsContext } from "contexts/userSettings";
import { createRef } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useState } from "react";

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

function renderAddressWarning() {
  return (
    <InfoMessage>
      <span>
        You must enter your address before you can buy or sell.{" "}
        <Link href="#">
          <a className="underline text-info">Learn more.</a>
        </Link>
      </span>
    </InfoMessage>
  );
}

const stateRef = createRef<HTMLSpanElement>();
const idPrefix = "listing-form-";

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
      id={`${idPrefix}zip`}
      placeholder={placeholder}
      disabled={!country}
    />
  );
}

function trimValues(values: IAddress) {
  values.street1 = values.street1.trim();
  values.street2 = values.street2?.trim();
  values.city = values.city.trim();
  values.zip = values.zip.replace(/\s+/g, "");

  return values;
}

export default function AddressForm(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const router = useRouter();
  const [address, setAddress] = useState<IAddress | null>(null);
  const [error, setError] = useState(false);
  const { userSettings, assignUserSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    if (sessionLoading) return;
    AddressApi(session?.accessToken)
      .get()
      .then((addressResponse) => {
        setAddress(addressResponse.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [sessionLoading]);

  if (sessionLoading || !address) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage />;
  const noAddress = !Object.keys(address).length;

  return (
    <FormContainer>
      {noAddress ? renderAddressWarning() : null}
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
              toast.success("Your address has been updated");
              if (noAddress) {
                assignUserSettings({
                  ...userSettings,
                  address_set: true,
                  country: values.country,
                });
                router.push("/account/payments");
              }
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
            <div className="my-2 space-y-2">
              <DropdownCombobox
                label="Country"
                name="country"
                placeholder={
                  formik.getFieldProps("country").value ? "" : "Select country"
                }
                items={countryList}
                childresetRef={stateRef}
              />

              <TextFieldFull
                label="Address Line 1"
                name="street1"
                id={`${idPrefix}street1`}
              />
              <TextFieldFull
                label="Address Line 2"
                name="street2"
                id={`${idPrefix}street2`}
              />
              <TextFieldFull label="City" name="city" id={`${idPrefix}city`} />

              {stateSelect(formik)}
              {zipField(formik.getFieldProps("country").value)}

              <SubmitButtonFull
                text="Update Address"
                submitting={formik.isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
