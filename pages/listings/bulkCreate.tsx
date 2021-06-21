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
import useSWR from "swr";
import { useSession } from "next-auth/client";
import { useState } from "react";

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
            return listingTemplate[field] || null;
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
      <div className="mx-auto my-4 overflow-x-auto">
        <h4 className="py-2 text-center">Listing Template</h4>
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => {
                return (
                  <th
                    key={index}
                    className="p-2 text-sm font-medium text-accent-lightest bg-info-darker"
                  >
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
                  <td
                    key={index}
                    className="p-2 text-sm border border-info-darker"
                  >
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
      <div className="mx-auto my-4 overflow-x-auto">
        <h4 className="py-2 text-center">Listing Preview</h4>
        <table className="flex-grow table-auto">
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
                  <th
                    key={index}
                    className="p-2 text-sm font-medium text-accent-lightest bg-info-darker"
                  >
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
                      <td
                        key={vIndex}
                        className="p-2 text-sm bg-white border border-info-darker"
                      >
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
      </div>
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
            <>
              <h4 className="py-2 text-center border-b border-accent">
                Bulk upload your listings
              </h4>
              <div
                {...getRootProps()}
                className="flex justify-center h-48 p-2 m-4 border-2 border-dashed rounded-md bg-accent-lightest border-accent-dark"
              >
                <input {...getInputProps()} />
                <p className="flex items-center text-center">
                  Drag and drop a csv file, or click to a select file to upload.
                </p>
                {error.length ? (
                  <div className="text-error">{error}</div>
                ) : null}
              </div>
            </>
          )}
        </Dropzone>
        <div className="px-4 py-2 border-b border-accent">
          <p className="mb-2">
            Upload a csv with your listings and preview it in the table below.
            Once you are happy with the input click save to create your bulk
            listings in draft state. Don't forget to add photos before
            publishing!
          </p>
          <SubmitButton text="Save all as draft" onClick={bulkCreate} />
        </div>

        {renderListingTemplate()}
        {renderTable()}
      </CardContainerFull>
    </>
  );
}
