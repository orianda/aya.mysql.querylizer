import {ValueDto} from "./value.dto";

const encodeString = (value: string) => {
  const query = (value as string)
    .toString()
    .replace(/(["\\])/g, '\\$1');
  return `"${query}"`;
};

const encodeNumber = (value: number) => {
  return isFinite(value) ? value.toString() : 'NULL';
}

const encodeBoolean = (value: boolean) => {
  return value ? 'TRUE' : 'FALSE';
}

const encodeDate = (value: Date) => {
  const time = value.getTime();
  if (isNaN(time)) {
    return 'NULL';
  }

  const string = value.toISOString();
  return encodeString(string);
}

export default (value: ValueDto): string => {
  if (typeof value === 'string') {
    return encodeString(value);
  }
  if (typeof value === 'number') {
    return encodeNumber(value);
  }
  if (typeof value === 'boolean') {
    return encodeBoolean(value);
  }
  if (value instanceof Date) {
    return encodeDate(value);
  }
  return 'NULL';
};
