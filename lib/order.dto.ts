export type OrderDto = OrderListDto | OrderItemDto;

export type OrderListDto = ReadonlyArray<OrderItemDto>;

export type OrderItemDto = string;
