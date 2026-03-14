import { parsePhoneNumberFromString } from "libphonenumber-js";

export function validatePhone(countryCode: string, number: string) {
  const phone = parsePhoneNumberFromString(`${countryCode}${number}`);

  if (!phone) return false;

  return phone.isValid();
}
