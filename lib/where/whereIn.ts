import formatValue from "../value";
import {ValueDto} from "../value.dto";

export const whereIn = (values: ReadonlyArray<ValueDto>, negate: boolean): string => {
  if (!values.length) {
    return '';
  }

  const query = values
    .map(formatValue)
    .join(', ');
  return `${negate ? 'NOT IN' : 'IN'} (${query})`;
}
