import { IDropdownOption } from "types/form";

export const refundReasonList: IDropdownOption[] = [
  { value: "requested_by_customer", text: "Requested By Customer" },
  { value: "duplicate", text: "Duplicate" },
  { value: "fraudulent", text: "Fraudulent" },
  { value: "", text: "Other" },
];
