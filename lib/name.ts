import {NameDto} from "./name.dto";

const encode = (value: string) => `\`${value}\``;

export default (value: NameDto): string => {
  if (typeof value === 'string') {
    return encode(value);
  }
  if (typeof value === 'number') {
    return isFinite(value) ? encode(value.toString()) : '';
  }
  return '';
};
