import formatName from "./name";
import {NamesListDto} from "./names.dto";
import formatValue from "./value";
import {ValuesDto, ValuesItemDto, ValuesListDto} from "./values.dto";

const formatList = (values: ValuesListDto) => {
  const keys = values.reduce((keys, row) => {
    const list = Object
      .keys(row)
      .filter((key) => keys.indexOf(key) < 0);
    return keys.concat(list);
  }, [] as NamesListDto);
  const rows = values.map((row) => {
    const query = keys
      .map((name) => formatValue(row[name]))
      .join(', ');
    return `(${query})`;
  });
  const keysQuery = keys
    .map(formatName)
    .join(', ');
  const rowsQuery = rows
    .join(', ');
  return `(${keysQuery}) VALUES ${rowsQuery}`;
};

/**
 * Format single entry
 * @param {Object} values
 * @returns {string}
 */
const formatItem = (values: ValuesItemDto = {}) => {
  const query = Object
    .keys(values)
    .map((key) => {
      const value = formatValue(values[key]);
      const name = formatName(key);
      return `${name} = ${value}`;
    })
    .join(', ');
  return query ? `SET ${query}` : '';
}

export default (values?: ValuesDto): string => Array.isArray(values)
  ? formatList(values as ValuesListDto)
  : formatItem(values as ValuesItemDto);
