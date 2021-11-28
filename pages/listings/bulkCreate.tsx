import * as Yup from "yup";

import Dropzone, { FileRejection } from "react-dropzone";

import { BackButton } from "components/buttons";
import { CardContainer6xl } from "components/cardContainer";
import { InfoMessage } from "components/message";
import { ListingApi } from "services/backendApi/listing";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import Papa from "papaparse";
import { ParseResult } from "papaparse";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { UploadIcon } from "components/icons";
import { UserSettingsContext } from "contexts/userSettings";
import { listingSchema } from "constants/listings";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

delete listingSchema.photos;
delete listingSchema.state;
const headerSchema = Yup.array().of(
  Yup.mixed().oneOf(Object.keys(listingSchema))
);
const bodySchema = Yup.object().shape(listingSchema);

export default function BulkCreateListings(): JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();
  const [submittingBulkCreate, setSubmittingBulkCreate] = useState(false);
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
  const { userSettings } = useContext(UserSettingsContext);
  const listingTemplate = userSettings.listing_template;

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
          if (field == "accept_offers") {
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

  function renderTable() {
    const headers = listings.meta.fields;
    if (!headers?.length) return null;

    return (
      <div className="mx-auto my-4 overflow-x-auto">
        <div className="flex py-2 space-x-4 ">
          <h4 className="py-2 text-center">Listing Preview</h4>
          <SubmitButton
            text="Save all as draft"
            submitting={submittingBulkCreate}
            onClick={bulkCreate}
          />
        </div>
        <div className="mb-4">
          <InfoMessage>
            Review your listings before clicking on save. After saving as draft
            you will need to add photos and publish each listing to the
            marketplace.
          </InfoMessage>
        </div>
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
                    className="p-2 text-sm font-semibold border text-accent-lightest bg-info border-info-darker"
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
                <tr
                  key={lIndex}
                  className="odd:bg-accent-lightest even:bg-accent-lighter"
                >
                  {Object.keys(listing).map((key, vIndex) => {
                    let errors = [];
                    try {
                      bodySchema.validateSyncAt(key, listing);
                    } catch (validationError: any) {
                      errors = validationError.errors;
                    }
                    return (
                      <td
                        key={vIndex}
                        className="p-2 text-sm border border-info-darker"
                      >
                        {listing[key] === null ? "" : `${listing[key]}`}
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
    setSubmittingBulkCreate(true);
    ListingApi(session?.accessToken)
      .bulkCreate(listings.data)
      .then(() => {
        toast.success("New listings created");
        router.push("/listings?state=draft&sort=newest");
      })
      .finally(() => {
        setSubmittingBulkCreate(false);
      });
  }

  if (!session || !listingTemplate.id) return <SpinnerLg text="Loading..." />;

  return (
    <>
      <NextSeo title="Bulk Create Listing" />
      <PageContainer>
        <CardContainer6xl>
          <div className="absolute -top-8">
            <BackButton text="Back" href="/listings?state=active&sort=newest" />
          </div>
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
                  className="flex items-center justify-center h-48 p-2 m-4 border-2 border-dashed rounded-md bg-accent-lightest border-accent-dark"
                >
                  <input {...getInputProps()} />
                  <UploadIcon />
                  <p className="flex items-center text-center">
                    Drag and drop a csv file, or click to a select file to
                    upload.
                  </p>
                  {error.length ? (
                    <div className="text-error">{error}</div>
                  ) : null}
                </div>
              </>
            )}
          </Dropzone>
          <div className="px-4 py-2">
            <p className="mb-2">
              Upload a csv with your listings and preview it in the table below.
              Once you are happy with the input click save to create your bulk
              listings in draft state. You will then need to add photos and
              publish each listing to the markeplace.
            </p>
            <a
              href="https://docs.google.com/spreadsheets/d/13Dt1hu_LygaMPwtkOHvH5h6p18skhFiUS2ekZGOwQYg/edit?usp=sharing"
              rel="noreferrer"
              target="_blank"
              className="underline text-info hover:text-primary"
            >
              Click here for instructions and template
            </a>
          </div>
        </CardContainer6xl>
        <div className="grid grid-cols-1 mx-auto">{renderTable()}</div>
      </PageContainer>
    </>
  );
}
