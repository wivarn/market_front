import * as Yup from "yup";

import Dropzone, { FileRejection } from "react-dropzone";

import { NextSeo } from "next-seo";
import Papa from "papaparse";
import { ParseResult } from "papaparse";
import { listingSchema } from "constants/listings";
import { useState } from "react";

delete listingSchema.photos;
delete listingSchema.status;
const lSchema = Yup.object().shape(listingSchema);
// const headerSchema = Yup.array().ensure().cast(["category", "subcategory", "title", "grading_company", ""]);

export default function BulkCreateListings(): JSX.Element {
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

  const onDropAccepted = (files: File[]) => {
    setError("");
    const reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = () => {
      Papa.parse(`${reader.result}`, {
        header: true,
        // dynamicTyping: true,
        // worker: true,
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

  function renderTable() {
    if (!listings.meta.fields?.length) return null;
    return (
      <table>
        <thead>
          <tr>
            {listings.meta.fields.map((field, index) => {
              return (
                <th key={index} className="border border-primary">
                  {field}
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
                  let error = [];
                  try {
                    lSchema.validateSyncAt(key, listing);
                  } catch (validationError) {
                    error = validationError.errors;
                  }
                  return (
                    <td key={vIndex} className="border border-primary">
                      {listing[key] ? `${listing[key]}` : ""}
                      {error.length ? (
                        <p className="text-error">{`${error}`}</p>
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

  return (
    <>
      <NextSeo title="Bulk Create Listing" />
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
      {renderTable()}
    </>
  );
}
