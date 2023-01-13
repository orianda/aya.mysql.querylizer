import {WhereDto, WhereModeDto, WhereValueDto} from "./types";
import {whereValue} from "./whereValue";
import formatName from "../name";
import {isObject} from "../util/isObject";

export const formatWhere = (where: WhereDto): string => {
  if (!isObject(where)) {
    return '';
  }

  const queries: Record<WhereModeDto, Array<string>> = {
    [WhereModeDto.or]: [],
    [WhereModeDto.and]: [],
    [WhereModeDto.not]: []
  };
  Object
    .keys(where)
    .forEach((key) => {
      const value = where[key as keyof WhereDto];
      let mode: WhereModeDto;
      let list: ReadonlyArray<string>;
      if (
        key === '' ||
        key === WhereModeDto.or ||
        key === WhereModeDto.and ||
        key === WhereModeDto.not
      ) {
        mode = key || WhereModeDto.or;
        const wheres = Array.isArray(value) ? value : [];
        list = wheres.map(formatWhere);
      } else {
        const [, prefix = WhereModeDto.or, name] = key.match(/^([*+-])?(.*)$/) || [];
        const negate = prefix === WhereModeDto.not;
        mode = negate ? WhereModeDto.and : prefix as WhereModeDto;
        const query = whereValue(value as WhereValueDto, negate);
        list = query ? [`${formatName(name)} ${query}`] : [];
      }
      queries[mode].push(...list);
    });
  return Object
    .keys(queries)
    .map((key) => {
      const mode = key as WhereModeDto;
      const list = queries[mode].filter((item) => !!item);
      if (list.length === 0) {
        return '';
      }
      if (mode === WhereModeDto.and) {
        return list.join(' AND ');
      }
      if (mode === WhereModeDto.not) {
        return `NOT (${list.join(' OR ')})`;
      }
      if (list.length === 1) {
        return list[0];
      }
      return `(${list.join(' OR ')})`;
    })
    .filter((query) => !!query)
    .join(' AND ');
}
