import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.PUBLIC_RESEND_API_KEY);

export const emails = {
  sendEmailSeller: defineAction({
    accept: "form",
    input: z.object({
      "Customer-Name": z.string(),
      "Customer-Email": z.string(),
      "Customer-Service": z.string(),
      "Customer-Message": z.string(),
    }),
    handler: async (input) => {
      const {
        "Customer-Name": name,
        "Customer-Email": email,
        "Customer-Service": service,
        "Customer-Message": message,
      } = input;

      const emailFrom = "Contact Audienzelabs <hello@audienzelabs.com>";

      const { data, error } = await resend.emails.send({
        from: emailFrom,
        to: ["hello@audienzelabs.com"],
        subject: "Audienzelabs Contact Form " + name,
        html:
          `<p><strong>From:</strong> ${name} (<strong>${email}</strong>) </p>` +
          `<p><strong>Service ${service}</strong></p>` +
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
