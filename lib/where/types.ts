import {ValueDto} from "../value.dto";

export type WhereDto = {
  [name: string]: WhereValueDto;
} | {
  [mode in WhereModeDto | '']: ReadonlyArray<WhereDto>;
}

export type WhereValueDto = ValueDto | ReadonlyArray<ValueDto> | WhereRangeDto;

export interface WhereRangeDto {
  min?: ValueDto;
  max?: ValueDto;
}

export enum WhereModeDto {
  or = '*',
  and = '+',
  not = '-'
}
