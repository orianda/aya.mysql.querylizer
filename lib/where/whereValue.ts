import {WhereRangeDto, WhereValueDto} from "./types";
import {whereBetween} from "./whereBetween";
import {whereIn} from "./whereIn";
import {whereIs} from "./whereIs";

export const whereValue = (value: WhereValueDto, negate: boolean): string => {
  if (Array.isArray(value)) {
    return whereIn(value, negate);
  } else if (value instanceof Date) {
    return whereIs(value, negate);
  } else if (value instanceof Object) {
    return whereBetween(value as WhereRangeDto, negate);
  } else {
    return whereIs(value, negate);
  }
}
