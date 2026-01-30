export type ProductType = "motor" | "general";

export type LiabilitySubType =
  | "obcanskopravni"
  | "z_povolani"
  | "domacnost";

export interface OnboardingFormValues {
  productType: ProductType;
  liabilitySubType?: LiabilitySubType;
  // Pojištěný
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  birthNumber?: string;
  companyId?: string;
  // Rozsah
  limitAmount: number;
  deductible?: number;
  // Doba pojištění
  startDate: string;
  endDate: string;
  // Camera / document (mock – base64 or placeholder)
  documentImage?: string;
}
