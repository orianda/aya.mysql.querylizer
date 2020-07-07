import {ValueDto} from "./value.dto";

export interface WhereDto {
  [name: string]: WhereValueDto;
}

export type WhereValueDto = WhereDto | ReadonlyArray<WhereDto> | ReadonlyArray<ValueDto> | ValueDto | WhereRangeDto;

export interface WhereRangeDto {
  min?: number;
  max?: number;
}
