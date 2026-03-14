export type CountryCode = "DE" | "US" | "GB" | "FR" | "IT" | "ES";

export const countries: {
  code: CountryCode;
  dial: string;
  label: string;
}[] = [
  { code: "DE", dial: "+49", label: "Germany" },
  { code: "US", dial: "+1", label: "United States" },
  { code: "GB", dial: "+44", label: "United Kingdom" },
  { code: "FR", dial: "+33", label: "France" },
  { code: "IT", dial: "+39", label: "Italy" },
  { code: "ES", dial: "+34", label: "Spain" },
];
