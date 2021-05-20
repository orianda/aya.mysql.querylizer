import { NamesDto } from "./names.dto";
import { WhereDto } from "./where.dto";
import { OrderDto } from "./order.dto";
import { AmountDto, OffsetDto } from "./limit.dto";
import { ValuesDto } from "./values.dto";
export default class Table {
    readonly name: string;
    readonly schema: string;
    private readonly reference;
    constructor(name: string, schema?: string);
    count(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto): string;
    select(names?: NamesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string;
    insert(values?: ValuesDto): string;
    update(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string;
    replace(values?: ValuesDto, where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string;
    remove(where?: WhereDto, amount?: AmountDto, offset?: OffsetDto, order?: OrderDto): string;
}
