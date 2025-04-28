import { generate } from "otp-generator";

export const optgenerator = () => {
  return generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
};
