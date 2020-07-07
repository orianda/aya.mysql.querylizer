import {NameDto} from "./name.dto";

export type NamesDto = NamesListDto | NamesItemDto;

export type NamesListDto = ReadonlyArray<NamesItemDto>;

export type NamesItemDto = NameDto;
