import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import {
  getApiSearchParams,
  getFullUrl,
  getUrlSearchParams,
} from "@/utils/property";
import type { PropertyResult } from "@/utils/property";

export const property = {
  getUrlParams: defineAction({
    accept: "form",
    input: z.object({
      address: z.string(),
      type: z.string(),
      subtype: z.string(),
      beds: z.number().gte(0),
      baths: z.number().gte(0),
      view: z.optional(z.boolean()),
      parking: z.optional(z.boolean()),
      pool: z.optional(z.boolean()),
      "min-price": z.number().gte(0),
      "max-price": z.number().gt(0),
      "min-sqft": z.number().gte(0),
      "max-sqft": z.number().gt(0),
    }),
    handler: async (input) => {
      const searchParams = getUrlSearchParams(input);
      return searchParams;
    },
  }),
  getProperties: defineAction({
    input: z.object({
      data: z.object({
        address: z.string(),
        type: z.string(),
        subtype: z.string(),
        beds: z.number().gte(0),
        baths: z.number().gte(0),
        view: z.optional(z.boolean()),
        parking: z.optional(z.boolean()),
        pool: z.optional(z.boolean()),
        "min-price": z.number().gte(0),
        "max-price": z.number().gt(0),
        "min-sqft": z.number().gte(0),
        "max-sqft": z.number().gt(0),
      }),
      key: z.string(),
      urlBase: z.string(),
    }),
    handler: async (input) => {
      const searchParams = getApiSearchParams(input.data);
      const fullUrl = getFullUrl(10, 0, searchParams, input.key, input.urlBase);

      const response = await fetch(encodeURI(fullUrl));
      const data = await response.json();
      const { total, bundle } = data;
      const dataProperty = bundle.map((item: PropertyResult) => {
        return {
          ListingId: item.ListingId,
          BathroomsTotalDecimal: item.BathroomsTotalDecimal,
          BedroomsTotal: item.BedroomsTotal,
          GarageSpaces: item.GarageSpaces,
          Latitude: item.Latitude,
          ListPrice: item.ListPrice,
          LivingArea: item.LivingArea,
          Longitude: item.Longitude,
          Media: item.Media.map((media: { MediaURL: string }) => {
            return media.MediaURL;
          }),
          PropertySubType: item.PropertySubType,
          PropertyType: item.PropertyType,
          PublicRemarks: item.PublicRemarks,
          SubdivisionName: item.SubdivisionName,
          UnparsedAddress: item.UnparsedAddress,
          YearBuilt: item.YearBuilt,
        };
      });

      return {
        total,
        dataProperty,
      };
    },
  }),
};
