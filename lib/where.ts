import formatName from "./name";
import formatValue from "./value";
import {ValueDto} from "./value.dto";
import {WhereDto, WhereRangeDto, WhereValueDto} from "./where.dto";

const whereIs = (value: ValueDto, negate: boolean) => {
  const query = formatValue(value);
  if (query === 'NULL') {
    return `IS${negate ? ' NOT ' : ' '}NULL`;
  } else {
    return `${negate ? '<>' : '='} ${query}`;
  }
};

const whereIn = (values: ReadonlyArray<ValueDto>, negate: boolean) => {
  if (!values.length) {
    return '';
  }

  const query = values
    .map(formatValue)
    .join(', ');
  return `${negate ? 'NOT IN' : 'IN'} (${query})`;
}

const whereBetween = (range: WhereRangeDto, negate: boolean) => {
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

const transform = (key: string, value: WhereValueDto) => {
  const [, mode = '*', name] = key.match(/^([*+-])?(.*)$/) || [];
  const negate = mode === '-';

  if (name) {
    let query: string;
    if (Array.isArray(value)) {
      query = whereIn(value, negate);
    } else if (value instanceof Date) {
      query = whereIs(value, negate);
    } else if (typeof value === 'object' && value) {
      query = whereBetween(value as WhereRangeDto, negate);
    } else {
      query = whereIs(value, negate);
    }
    const queries = query ? [`${formatName(name)} ${query}`] : [];
    return {
      mode: negate ? '+' : mode,
      queries
    };
  }

  if (Array.isArray(value)) {
    const queries = value
      .map(formatWhere)
      .filter((query) => !!query);
    return {mode, queries};
  }

  return {
    mode,
    queries: []
  };
}

const formatWhere = (where: WhereDto = {}) => {
  where = typeof where === 'object' && where !== null ? where : {};

  const queries: {
    [mode: string]: Array<string>;
  } = {
    '+': [],
    '-': [],
    '*': []
  };
  Object
    .keys(where)
    .forEach((name) => {
      const issue = transform(name, where[name]);
      queries[issue.mode].push(...issue.queries);
    });
  return Object
    .keys(queries)
    .map((mode) => {
      const list = queries[mode];
      if (list.length === 0) {
        return '';
      }
      if (mode === '+') {
        return list.join(' AND ');
      }
      if (mode === '-') {
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

export default (where?: WhereDto): string => {
  const query = formatWhere(where);
  return query && `WHERE ${query}`;
};
