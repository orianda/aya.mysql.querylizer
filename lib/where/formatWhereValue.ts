import formatName from "../name";
import {WhereModeDto, WhereValueDto} from "./types";
import {whereValue} from "./whereValue";

export const formatWhereValue = (key: string, value: WhereValueDto): {
  mode: WhereModeDto;
  queries: ReadonlyArray<string>;
} => {
  const [, mode = WhereModeDto.or, name] = key.match(/^([*+-])?(.*)$/) || [];
  const negate = mode === WhereModeDto.not;
  const query = whereValue(value, negate);
  return {
    mode: negate ? WhereModeDto.and : mode as WhereModeDto,
    queries: query ? [`${formatName(name)} ${query}`] : []
  };
}
