import {AmountDto, OffsetDto} from "./limit.dto";

export default (amount: AmountDto = 0, offset: OffsetDto = 0) => {
  if (amount > 0 && offset > 0) {
    return `LIMIT ${offset}, ${amount}`;
  }
  if (amount > 0) {
    return `LIMIT ${amount}`;
  }
  if (offset > 0) {
    return `LIMIT OFFSET ${offset}`;
  }
  return '';
};
