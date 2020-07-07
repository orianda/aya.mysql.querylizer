import formatName from "./name";
import formatNames from "./names";
import formatWhere from "./where";
import formatOrder from "./order";
import formatLimit from "./limit";
import formatValues from "./values";
import {NamesDto} from "./names.dto";
import {WhereDto} from "./where.dto";
import {OrderDto} from "./order.dto";
import {AmountDto, OffsetDto} from "./limit.dto";
import {ValuesDto} from "./values.dto";

const sql = (chunks: ReadonlyArray<string>, ...args: ReadonlyArray<string>) => {
  const query = [];
  for (let i = 0, l = chunks.length; i < l; i++) {
    query[i * 2] = chunks[i].trim();
  }
  for (let i = 0, l = args.length; i < l; i++) {
    query[i * 2 + 1] = args[i].trim();
  }
  return query
    .filter((chunk) => !!chunk)
    .join(' ');
};

export default class Table {

  constructor(
    public readonly name: string
  ) {
  }

  count(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto): string {
    const name = formatName(this.name);
    const queryWhere = formatWhere(where);
    const queryLimit = formatLimit(amount, offset);
    return sql`SELECT COUNT(*) AS \`amount\` FROM ${name} ${queryWhere} ${queryLimit}`;
  }

  select(names?: NamesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string {
    const name = formatName(this.name);
    const queryNames = formatNames(names);
    const queryWhere = formatWhere(where);
    const queryOrder = formatOrder(order);
    const queryLimit = formatLimit(amount, offset);
    return sql`SELECT ${queryNames} FROM ${name} ${queryWhere} ${queryOrder} ${queryLimit}`;
  }

  insert(values?: ValuesDto): string {
    const name = formatName(this.name);
    const queryValues = formatValues(values) || '() VALUES ()';
    return sql`INSERT INTO ${name} ${queryValues}`;
  }

  update(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string {
    const name = formatName(this.name);
    const queryValues = formatValues(values);
    const queryWhere = formatWhere(where);
    const queryOrder = formatOrder(order);
    const queryLimit = formatLimit(amount, offset);
    return queryValues && sql`UPDATE ${name} ${queryValues} ${queryWhere} ${queryOrder} ${queryLimit}`;
  }

  replace(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string {
    const name = formatName(this.name);
    const queryValues = formatValues(values);
    const queryWhere = formatWhere(where);
    const queryOrder = formatOrder(order);
    const queryLimit = formatLimit(amount, offset);
    return queryValues && sql`REPLACE ${name} ${queryValues} ${queryWhere} ${queryOrder} ${queryLimit}`;
  }

  remove(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string {
    const name = formatName(this.name);
    const queryWhere = formatWhere(where);
    const queryOrder = formatOrder(order);
    const queryLimit = formatLimit(amount, offset);
    return sql`DELETE FROM ${name} ${queryWhere} ${queryOrder} ${queryLimit}`;
  }
}
