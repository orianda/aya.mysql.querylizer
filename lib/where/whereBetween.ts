import {WhereRangeDto} from "./types";
import formatValue from "../value";

export const whereBetween = (range: WhereRangeDto, negate: boolean): string => {
  const min = formatValue(range.min);
  const max = formatValue(range.max);
  if (min === 'NULL' && max === 'NULL') {
    return '';
  }
  if (min === 'NULL') {
    return (negate ? '> ' : '<= ') + max;
  }
  if (max === 'NULL') {
    return (negate ? '< ' : '>= ') + min;
  }
  return `${negate ? 'NOT BETWEEN' : 'BETWEEN'} ${min} AND ${max}`;
}
