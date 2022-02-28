import { ValueDto } from "../value.dto";
export declare type WhereDto = {
    [name: string]: WhereValueDto;
} | {
    [mode in WhereModeDto | '']: ReadonlyArray<WhereDto>;
};
export declare type WhereValueDto = ValueDto | ReadonlyArray<ValueDto> | WhereRangeDto;
export interface WhereRangeDto {
    min?: ValueDto;
    max?: ValueDto;
}
export declare enum WhereModeDto {
    or = "*",
    and = "+",
    not = "-"
}
