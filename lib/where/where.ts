import {formatWhere} from "./formatWhere";
import {WhereDto} from "./types";

export const where = (where?: WhereDto): string => {
  const query = where ? formatWhere(where) : '';
  return query && `WHERE ${query}`;
}
