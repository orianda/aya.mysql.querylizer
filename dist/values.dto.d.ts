import { ValueDto } from "./value.dto";
export declare type ValuesDto = ValuesListDto | ValuesItemDto;
export declare type ValuesListDto = ReadonlyArray<ValuesItemDto>;
export interface ValuesItemDto {
    [name: string]: ValueDto;
}
