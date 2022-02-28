import formatLimit from "./limit";
import {AmountDto, OffsetDto} from "./limit.dto";
import formatName from "./name";
import formatNames from "./names";
import {NamesDto} from "./names.dto";
import formatOrder from "./order";
import {OrderDto} from "./order.dto";
import formatValues from "./values";
import {ValuesDto} from "./values.dto";
import {where as formatWhere, WhereDto} from "./where";

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

  private readonly reference: string;

  constructor(
    public readonly name: string,
    public readonly schema: string = ''
  ) {
    this.reference = [schema, name]
      .filter((value) => !!value)
      .map(formatName)
      .join('.');
  }

  count(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto): string {
    const queryWhere = formatWhere(where);
    const queryLimit = formatLimit(amount, offset);
    return sql`SELECT COUNT(*) AS \`amount\` FROM ${this.reference} ${queryWhere} ${queryLimit}`;
  }

  select(names?: NamesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string {
    const queryNames = formatNames(names);
    const queryWhere = formatWhere(where);
    const queryOrder = formatOrder(order);
    const queryLimit = formatLimit(amount, offset);
    return sql`SELECT ${queryNames} FROM ${this.reference} ${queryWhere} ${queryOrder} ${queryLimit}`;
  }

  insert(values?: ValuesDto): string {
    const queryValues = formatValues(values) || '() VALUES ()';
    return sql`INSERT INTO ${this.reference} ${queryValues}`;
  }

  update(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string {
    const queryValues = formatValues(values);
    const queryWhere = formatWhere(where);
    const queryOrder = formatOrder(order);
    const queryLimit = formatLimit(amount, offset);
    return queryValues && sql`UPDATE ${this.reference} ${queryValues} ${queryWhere} ${queryOrder} ${queryLimit}`;
  }

  replace(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string {
    const queryValues = formatValues(values);
    const queryWhere = formatWhere(where);
    const queryOrder = formatOrder(order);
    const queryLimit = formatLimit(amount, offset);
    return queryValues && sql`REPLACE ${this.reference} ${queryValues} ${queryWhere} ${queryOrder} ${queryLimit}`;
  }

  remove(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string {
    const queryWhere = formatWhere(where);
    const queryOrder = formatOrder(order);
    const queryLimit = formatLimit(amount, offset);
    return sql`DELETE FROM ${this.reference} ${queryWhere} ${queryOrder} ${queryLimit}`;
  }
}
