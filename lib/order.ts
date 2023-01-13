import formatName from "./name";
import {OrderDto} from "./order.dto";

export default (order: OrderDto = []) => {
  const query = (Array.isArray(order) ? order : [order])
    .filter((order: unknown): order is string | number => typeof order === 'string' || typeof order === 'number' && isFinite(order))
    .map((order) => {
      const [, mode = '+', name] = order
        .toString()
        .match(/^([+-])?(.*)$/) || [];
      return {name, mode};
    })
    .filter((order, index, orders) => orders
      .slice(index + 1)
      .every(({name}) => name !== order.name))
    .map(({name, mode}) => formatName(name) + ' ' + (mode === '-' ? 'DESC' : 'ASC'))
    .join(', ');
  return query ? `ORDER BY ${query}` : '';
};
