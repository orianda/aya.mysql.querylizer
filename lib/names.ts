import formatName from "./name";
import {NamesDto} from "./names.dto";

export default (names: NamesDto = []): string => names
  .map(formatName)
  .filter((name) => !!name)
  .filter((name, index, list) => list.indexOf(name) === index)
  .join(', ') || '*';
