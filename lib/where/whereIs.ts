import formatValue from "../value";
import {ValueDto} from "../value.dto";

export const whereIs = (value: ValueDto, negate: boolean): string => {
  const query = formatValue(value);
  if (query === 'NULL') {
    return `IS${negate ? ' NOT ' : ' '}NULL`;
  } else {
    return `${negate ? '<>' : '='} ${query}`;
  }
}
