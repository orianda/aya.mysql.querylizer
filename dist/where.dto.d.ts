import { ValueDto } from "./value.dto";
export interface WhereDto {
    [name: string]: WhereValueDto;
}
export declare type WhereValueDto = WhereDto | ReadonlyArray<WhereDto> | ReadonlyArray<ValueDto> | ValueDto | WhereRangeDto;
export interface WhereRangeDto {
    min?: number;
    max?: number;
}
