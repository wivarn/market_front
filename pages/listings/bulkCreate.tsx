import * as Yup from "yup";

import Dropzone, { FileRejection } from "react-dropzone";

import { CardContainerFull } from "components/cardContainer";
import { ListingApi } from "services/backendApi/listing";
import { NextSeo } from "next-seo";
import Papa from "papaparse";
import { ParseResult } from "papaparse";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { listingSchema } from "constants/listings";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useState } from "react";
import useSWR from "swr";

delete listingSchema.photos;
delete listingSchema.status;
const headerSchema = Yup.array().of(
  Yup.mixed().oneOf(Object.keys(listingSchema))
);
const bodySchema = Yup.object().shape(listingSchema);

export default function BulkCreateListings(): JSX.Element {
  const [session] = useSession();
  const router = useRouter();
  const [listings, setListings] = useState<ParseResult<any>>({
    data: [],
    errors: [],
    meta: {
      aborted: false,
      cursor: 0,
      delimiter: "",
      fields: [],
      linebreak: "",
      truncated: false,
    },
  });
  const [error, setError] = useState("");

  function getListingTemplate() {
    const { data, error } = useSWR(
      session ? ["account/listing_template", session.accessToken] : null
    );

    return {
      response: data,
      loadingTemplate: !error && !data,
      isError: error,
    };
  }

  const { response, loadingTemplate, isError } = getListingTemplate();

  if (loadingTemplate) return <SpinnerLg text="Loading..." />;
  if (isError) return <div>Error</div>;

  const listingTemplate = response.data;

  const onDropAccepted = (files: File[]) => {
    setError("");
    const reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = () => {
      Papa.parse(`${reader.result}`, {
        header: true,
        skipEmptyLines: "greedy",
        complete: (results) => {
          setListings(results);
        },
        transform: (value, field) => {
          if (field == "condition") {
            return Number(value).toFixed(1);
          }
          if (field == "grading") {
            return value.toLocaleLowerCase() == "true" ? true : false;
          }
          if (value == "") {
            return null;
          }
          return value;
        },
      });
    };
  };

  const onDropRejected = (files: FileRejection[]) => {
    setError(
      files[0].errors
        .map((error) => {
          return error.message;
        })
        .join(", ")
    );
  };

  function renderListingTemplate() {
    const headers = Object.keys(listingSchema);
    return (
      <div>
        <h3>Your listing template</h3>
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => {
                return (
                  <th key={index} className="border border-primary">
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {headers.map((header, index) => {
                return (
                  <td key={index} className="border border-primary">
                    {listingTemplate[header]}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  function renderTable() {
    const headers = listings.meta.fields;
    if (!headers?.length) return null;

    return (
      <table>
        <thead>
          <tr>
            {headers.map((field, index) => {
              let invalidHeader = false;
              try {
                headerSchema.validateSyncAt(`[${index}]`, headers);
              } catch (validationError) {
                invalidHeader = true;
                listings.data = [];
              }
              return (
                <th key={index} className="border border-primary">
                  {field}
                  {invalidHeader ? (
                    <p className="text-error">Invalid field</p>
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {listings.data.map((listing, lIndex) => {
            return (
              <tr key={lIndex}>
                {Object.keys(listing).map((key, vIndex) => {
                  let errors = [];
                  try {
                    bodySchema.validateSyncAt(key, listing);
                  } catch (validationError) {
                    errors = validationError.errors;
                  }
                  return (
                    <td key={vIndex} className="border border-primary">
                      {listing[key] ? `${listing[key]}` : ""}
                      {errors.length ? (
                        <p className="text-error">{`${errors}`}</p>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  async function bulkCreate() {
    ListingApi(session?.accessToken)
      .bulkCreate(listings.data)
      .then(() => {
        toast.success("New listings created");
        router.push("/listings?status=draft");
      });
  }

  if (!session) return <SpinnerLg text="Loading..." />;

  return (
    <>
      <NextSeo title="Bulk Create Listing" />
      <CardContainerFull>
        <Dropzone
          accept="text/csv, .csv"
          onDropAccepted={(files) => onDropAccepted(files)}
          onDropRejected={(files) => onDropRejected(files)}
          maxFiles={1}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="h-48 bg-secondary">
              <input {...getInputProps()} />
              <p>Drag and drop csv file, or click to select file</p>
              {error.length ? <div className="text-error">{error}</div> : null}
            </div>
          )}
        </Dropzone>
        <SubmitButton text="Bulk Create" onClick={bulkCreate} />
        {renderListingTemplate()}
        {renderTable()}
      </CardContainerFull>
    </>
  );
}
