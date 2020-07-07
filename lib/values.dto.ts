import {ValueDto} from "./value.dto";

export type ValuesDto = ValuesListDto | ValuesItemDto;

export type ValuesListDto = ReadonlyArray<ValuesItemDto>;

export interface ValuesItemDto {
  [name: string]: ValueDto;
}
