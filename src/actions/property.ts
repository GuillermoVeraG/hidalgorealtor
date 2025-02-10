import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import {
  getApiSearchParams,
  getFullUrl,
  getUrlSearchParams,
  getUrlLocationParams,
  getPropertyParams,
} from "@/utils/property";
import type { PropertyResult, PropertyResultItems } from "@/utils/property";

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
  getUrlLocationParams: defineAction({
    accept: "form",
    input: z.object({
      address: z.string(),
    }),
    handler: async (input) => {
      const searchParams = getUrlLocationParams(input);
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
      pagination: z.object({
        total: z.number().gt(0),
        page: z.number().gte(0),
      }),
    }),
    handler: async (input) => {
      const searchParams = getApiSearchParams(input.data);
      const fullUrl = getFullUrl(
        input.pagination.total,
        input.pagination.page,
        searchParams,
        input.key,
        input.urlBase
      );

      //console.log(fullUrl);
      const response = await fetch(encodeURI(fullUrl));
      const data = await response.json();
      const { total, bundle } = data;
      const dataProperty = bundle.map((item: PropertyResult) => {
        return {
          mlsnumber: item.ListingId,
          address: item.UnparsedAddress,
          sqft: item.LivingArea,
          beds: item.BedroomsTotal,
          baths: item.BathroomsTotalDecimal,
          proptype: item.PropertyType,
          propsubtype: item.PropertySubType,
          price: item.ListPrice,
          photos: item.Media.map((media: { MediaURL: string }) => {
            return media.MediaURL;
          }),
          subdivision: item.SubdivisionName,
          description: item.PublicRemarks,
          yearbuilt: item.YearBuilt,
          latitude: item.Latitude,
          longitude: item.Longitude,

          garage: item.GarageSpaces,
        } as PropertyResultItems;
      });

      return {
        total,
        dataProperty,
      };
    },
  }),
  getProperty: defineAction({
    input: z.object({
      data: z.object({
        mlsnumber: z.string(),
      }),
      key: z.string(),
      urlBase: z.string(),
    }),
    handler: async (input) => {
      const searchParams = getPropertyParams(input.data);

      if (searchParams === false) return undefined;

      const fullUrl = getFullUrl(1, 0, searchParams, input.key, input.urlBase);

      const response = await fetch(encodeURI(fullUrl));
      const data = await response.json();
      const { total, bundle } = data;
      const dataProperty = bundle.map((item: PropertyResult) => {
        return {
          mlsnumber: item.ListingId,
          address: item.UnparsedAddress,
          sqft: item.LivingArea,
          beds: item.BedroomsTotal,
          baths: item.BathroomsTotalDecimal,
          proptype: item.PropertyType,
          propsubtype: item.PropertySubType,
          price: item.ListPrice,
          photos: item.Media.map((media: { MediaURL: string }) => {
            return media.MediaURL;
          }),
          subdivision: item.SubdivisionName,
          description: item.PublicRemarks,
          yearbuilt: item.YearBuilt,
          latitude: item.Latitude,
          longitude: item.Longitude,

          garage: item.GarageSpaces,
        } as PropertyResultItems;
      });

      return {
        total,
        dataProperty,
      };
    },
  }),
};
