import { WhereModeDto, WhereValueDto } from "./types";
export declare const formatWhereValue: (key: string, value: WhereValueDto) => {
    mode: WhereModeDto;
    queries: ReadonlyArray<string>;
};
