import {NamesDto} from "./names.dto";
import Table from "./Table";
import {ValuesItemDto} from "./values.dto";

export default class Entry {

  constructor(
    public readonly table: Table,
    public readonly id: string
  ) {
  }

  has(id: number | string): string {
    return this.table.count({
      [this.id]: id,
    }, 1);
  }

  get(id: number | string, names?: NamesDto): string {
    return this.table.select(names, {
      [this.id]: id,
    }, 1);
  }

  set(id: number | string, values: ValuesItemDto = {}): string {
    values[this.id] = id;
    return this.table.replace(values);
  }

  add(values: ValuesItemDto = {}): string {
    delete values[this.id];
    return this.table.insert(values);
  }

  mod(id: number | string, values?: ValuesItemDto): string {
    return this.table.update(values, {
      [this.id]: id,
    }, 1);
  }

  rid(id: number | string): string {
    return this.table.remove({
      [this.id]: id,
    }, 1);
  }
}
