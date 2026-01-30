import { z } from "zod";

const productTypeSchema = z.enum(["motor", "general"]);
const liabilitySubTypeSchema = z.enum(["obcanskopravni", "z_povolani", "domacnost"]).optional();

export const step1Schema = z.object({
  productType: productTypeSchema,
  liabilitySubType: liabilitySubTypeSchema,
});

export const step2Schema = z.object({
  firstName: z.string().min(1, "Jméno je povinné"),
  lastName: z.string().min(1, "Příjmení je povinné"),
  email: z.string().email("Neplatný e-mail"),
  phone: z.string().min(9, "Telefon musí mít alespoň 9 znaků"),
  address: z.string().min(1, "Adresa je povinná"),
  city: z.string().min(1, "Město je povinné"),
  postalCode: z.string().regex(/^\d{3}\s?\d{2}$/, "PSČ ve formátu 123 45"),
});

export const step3Schema = z.object({
  limitAmount: z.number().min(100000, "Limit alespoň 100 000 Kč").max(10000000, "Max 10 000 000 Kč"),
  deductible: z.number().min(0).optional(),
});

const step4Base = z.object({
  startDate: z.string().min(1, "Datum začátku je povinné"),
  endDate: z.string().min(1, "Datum konce je povinné"),
});

export const step4Schema = step4Base.refine(
  (data) => !data.startDate || !data.endDate || new Date(data.endDate) > new Date(data.startDate),
  { message: "Konec pojištění musí být po začátku", path: ["endDate"] }
);

export const fullOnboardingSchema = z
  .object({
    ...step1Schema.shape,
    ...step2Schema.shape,
    ...step3Schema.shape,
    ...step4Base.shape,
    documentImage: z.string().optional(),
  })
  .refine(
    (data) => !data.startDate || !data.endDate || new Date(data.endDate) > new Date(data.startDate),
    { message: "Konec pojištění musí být po začátku", path: ["endDate"] }
  );

export type Step1Values = z.infer<typeof step1Schema>;
export type Step2Values = z.infer<typeof step2Schema>;
export type Step3Values = z.infer<typeof step3Schema>;
export type Step4Values = z.infer<typeof step4Schema>;
