import { DataSource } from "./DataSource";

export type User = {
    name: string;
    email: string;
    preferences?: {
        category?: string;
        author?: string;
        source: DataSource;
    }
}