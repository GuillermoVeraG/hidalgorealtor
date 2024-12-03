import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const property = {
  getProperty: defineAction({
    accept: "form",
    input: z.object({
      address: z.string(),
      type: z.string(),
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
      return `Hello, ${input.address}!`;
    },
  }),
};
