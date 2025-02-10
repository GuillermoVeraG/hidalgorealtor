import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.PUBLIC_RESEND_API_KEY);

export const emails = {
  sendEmailSeller: defineAction({
    accept: "form",
    input: z.object({
      FirstName: z.string(),
      LastName: z.string(),
      Email: z.string().email(),
      Prefix: z.string(),
      Phone: z.string(),
      Location: z.string(),
      "min-sqft": z.number(),
      "max-sqft": z.number(),
      parking: z.optional(z.boolean()),
      pool: z.optional(z.boolean()),
      view: z.optional(z.boolean()),
    }),
    handler: async (input) => {
      const {
        FirstName,
        LastName,
        Email,
        Prefix,
        Phone,
        Location,
        "min-sqft": minsqft,
        "max-sqft": maxsqft,
        parking,
        pool,
        view,
      } = input;

      const emailFrom = "Seller Audienzelabs <hello@audienzelabs.com>";

      const { data, error } = await resend.emails.send({
        from: emailFrom,
        to: ["hello@audienzelabs.com"],
        subject: `Audienzelabs Seller Form ${FirstName} ${LastName}`,
        html:
          `<p><strong>From:</strong> ${FirstName} ${LastName} (<strong>${Email}</strong>) </p>` +
          `<p><strong>Phone:</strong> ${Prefix} ${Phone}</p>` +
          `<p><strong>Location:</strong> ${Location}</p>` +
          `<p><strong>Sqft:</strong> ${minsqft} to ${maxsqft}</p>` +
          `<p><strong>Ameniaties:</strong> ${parking ? "Parking" : ""} ${pool ? "Pool" : ""} ${view ? "View" : ""}</p>`,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return data;
    },
  }),

  sendEmailContact: defineAction({
    accept: "form",
    input: z.object({
      Name: z.string(),
      Email: z.string(),
      Phone: z.optional(z.string()),
      Message: z.string(),
    }),
    handler: async (input) => {
      const {
        Name: name,
        Email: email,
        Phone: phone,
        Message: message,
      } = input;

      const emailFrom =
        "Contact Hidalgo Realtor <alexandra@hidalgorealtor.com>";

      const { data, error } = await resend.emails.send({
        from: emailFrom,
        to: ["alexandra@hidalgorealtor.com"],
        subject: "Hidalgo Realtor Contact Form " + name,
        html:
          `<p><strong>From:</strong> ${name} (<strong>${email}</strong>) </p>` +
          `<p><strong>Phone: ${phone}</strong></p>` +
          `<p>${message}</p>`,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return data;
    },
  }),
};
