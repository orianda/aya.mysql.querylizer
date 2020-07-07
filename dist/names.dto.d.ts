import { NameDto } from "./name.dto";
export declare type NamesDto = NamesListDto | NamesItemDto;
export declare type NamesListDto = ReadonlyArray<NamesItemDto>;
export declare type NamesItemDto = NameDto;
