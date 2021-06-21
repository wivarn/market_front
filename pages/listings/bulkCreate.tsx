import { CSVReader, readString } from "react-papaparse";

import { NextSeo } from "next-seo";
import { ParseResult } from "papaparse";
import { useState } from "react";

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

  const onDrop = (_: ParseResult<any>[], file: any) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      readString(`${reader.result}`, {
        header: true,
        dynamicTyping: true,
        worker: true,
        skipEmptyLines: "greedy",
        complete: (results) => {
          setListings(results);
        },
      });
    };
  };

  function renderTable() {
    if (!listings.meta.fields?.length) return null;
    return (
      <table>
        <thead>
          <tr>
            {listings.meta.fields.map((field, index) => {
              return <th key={index}>{field}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {listings.data.map((listing, lIndex) => {
            return (
              <tr key={lIndex}>
                {Object.values(listing).map((value, vIndex) => {
                  return <td key={lIndex + vIndex}>{`${value}`}</td>;
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
      <CSVReader onDrop={onDrop}>
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      {renderTable()}
    </>
  );
}
