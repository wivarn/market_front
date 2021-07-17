import * as Yup from "yup";

import { ObjectShape } from "yup/lib/object";

export const conditionList = [
  { value: "10.0", text: "Near Mint" },
  { value: "8.0", text: "Excellent" },
  { value: "6.0", text: "Very Good" },
  { value: "4.0", text: "Good" },
  { value: "2.0", text: "Damaged" },
];

export const gradingCompanyList = [
  { value: "BGS", text: "BGS" },
  { value: "CSG", text: "CSG" },
  { value: "HGA", text: "HGA" },
  { value: "KSA", text: "KSA" },
  { value: "MNT", text: "MNT" },
  { value: "PSA", text: "PSA" },
  { value: "SGC", text: "SGC" },
  { value: "OTHER", text: "Other" },
];

export const gradingList = [
  { value: "10.0", text: "10" },
  { value: "9.5", text: "9.5" },
  { value: "9.0", text: "9" },
  { value: "8.5", text: "8.5" },
  { value: "8.0", text: "8" },
  { value: "7.5", text: "7.5" },
  { value: "7.0", text: "7" },
  { value: "6.5", text: "6.5" },
  { value: "6.0", text: "6" },
  { value: "5.5", text: "5.5" },
  { value: "5.0", text: "5" },
  { value: "4.5", text: "4.5" },
  { value: "4.0", text: "4" },
  { value: "3.5", text: "3.5" },
  { value: "3.0", text: "3" },
  { value: "2.5", text: "2.5" },
  { value: "2.0", text: "2" },
  { value: "1.5", text: "1.5" },
  { value: "1.0", text: "1" },
];

export const categoryList = [
  { value: "SPORTS_CARDS", text: "Sports Cards" },
  { value: "TRADING_CARDS", text: "Trading Card Games" },
  { value: "COLLECTIBLES", text: "Collectibles" },
];

export const sportsCardList = [
  { value: "BASEBALL", text: "Baseball" },
  { value: "BASKETBALL", text: "Basketball" },
  { value: "FOOTBALL", text: "Football" },
  { value: "HOCKEY", text: "Hockey" },
  { value: "SOCCER", text: "Soccer" },
  { value: "OTHER", text: "Other" },
];

export const tradingCardList = [
  { value: "CARDFIGHT_VANGUARD", text: "Cardfight Vanguard" },
  { value: "DRAGON_BALL_SUPER", text: "Dragon Ball Super" },
  { value: "FLESH_AND_BLOOD", text: "Flesh and Blood" },
  { value: "MAGIC", text: "Magic The Gathering" },
  { value: "POKEMON", text: "Pokemon" },
  { value: "STAR_WARS_DESTINY", text: "Star Wars Destiny" },
  { value: "YUGIOH", text: "Yu-gi-oh!" },
  { value: "OTHER", text: "Other" },
];

export const collectibleList = [
  { value: "ANTIQUES", text: "Antiques" },
  { value: "ART", text: "Art" },
  { value: "COINS", text: "Coins" },
  { value: "COMICS", text: "Comic Books" },
  { value: "STAMPS", text: "Stamps" },
  { value: "TOYS", text: "Toys" },
  { value: "WATCHES", text: "Watches" },
  { value: "OTHER", text: "Other" },
];

export const listingSchema: ObjectShape = {
  category: Yup.mixed()
    .oneOf(
      categoryList.map((category) => {
        return category.value;
      })
    )
    .when("state", (state, schema) => {
      return state != "draft"
        ? schema.required("Category is required")
        : schema;
    }),
  subcategory: Yup.mixed()
    .when("category", {
      is: "SPORTS_CARDS",
      then: Yup.mixed().oneOf(
        sportsCardList.map((sports_card) => {
          return sports_card.value;
        })
      ),
    })
    .when("category", {
      is: "TRADING_CARDS",
      then: Yup.mixed().oneOf(
        tradingCardList.map((trading_card) => {
          return trading_card.value;
        })
      ),
    })
    .when("category", {
      is: "COLLECTIBLES",
      then: Yup.mixed().oneOf(
        collectibleList.map((collectible) => {
          return collectible.value;
        })
      ),
    })
    .when("state", (state, schema) => {
      return state != "draft"
        ? schema.required("Sub-category is required")
        : schema;
    }),
  photos: Yup.array(Yup.string())
    .max(10)
    .when("state", (state, schema) => {
      return state != "draft" ? schema.min(1) : schema;
    }),
  title: Yup.string()
    .min(2, "Title must be more than 2 characters")
    .max(256, "Title must be less than 256 characters")
    .required("Title is required"),
  description: Yup.string().nullable(),
  grading: Yup.boolean(),
  grading_company: Yup.mixed().when("graded", {
    is: true,
    then: Yup.mixed()
      .oneOf(
        gradingCompanyList.map((gradingCompany) => {
          return gradingCompany.value;
        }),
        "This is not a valid grading company"
      )
      .required("Grading company is required"),
  }),
  condition: Yup.mixed()
    .when("grading_company", (grading_company, schema) => {
      if (grading_company == null || grading_company == undefined) {
        return schema.oneOf(
          conditionList.map((condition) => {
            return condition.value;
          }),
          "This is not a valid condition"
        );
      }
      return schema.oneOf(
        gradingList.map((grading) => {
          return grading.value;
        }),
        "This is not a valid grading"
      );
    })
    .when("state", (state, schema) => {
      return state != "draft"
        ? schema.required("Condition is required")
        : schema;
    }),
  price: Yup.number()
    .min(1, "Price must more than 1.00")
    .max(99999999.99, "Price must be less than 99999999.99")
    .when("state", (state, schema) => {
      return state != "draft" ? schema.required("Price is required") : schema;
    }),
  domestic_shipping: Yup.number()
    .min(0, "Shipping can't be less than 0")
    .max(99999999.99, "Shipping must be less than 99999999.99")
    .when("state", (state, schema) => {
      return state != "draft"
        ? schema.required("Shipping price is required")
        : schema;
    }),

  international_shipping: Yup.number()
    .min(0, "Shipping can't be less than 0")
    .max(99999999.99, "Shipping must be less than 99999999.99")
    .nullable(),
  state: Yup.string().required("Required"),
};
