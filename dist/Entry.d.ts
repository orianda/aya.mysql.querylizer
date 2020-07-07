import Table from "./Table";
import { NamesDto } from "./names.dto";
import { ValuesItemDto } from "./values.dto";
export default class Entry {
    readonly table: Table;
    readonly id: string;
    constructor(table: Table, id: string);
    has(id: number | string): string;
    get(id: number | string, names?: NamesDto): string;
    set(id: number | string, values?: ValuesItemDto): string;
    add(values?: ValuesItemDto): string;
    mod(id: number | string, values?: ValuesItemDto): string;
    rid(id: number | string): string;
}
