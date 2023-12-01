import { DataSource } from "./DataSource";

export type Criteria = {
    source?: DataSource,
    category?: string,
    keyword?: string,
    author?: string,
    date?: Date
};