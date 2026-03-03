export interface ColumnDef<T> {
    readonly key: string;
    readonly header: string;
    readonly cell: (row: T) => React.ReactNode;
    readonly width?: string;
    readonly sortable?: boolean;
}
export interface TableProps<T> {
    readonly columns: ColumnDef<T>[];
    readonly data: T[];
    readonly keyExtractor: (row: T) => string;
    readonly isLoading?: boolean;
    readonly emptyMessage?: string;
    readonly caption?: string;
}
export declare const Table: {
    <T>({ columns, data, keyExtractor, isLoading, emptyMessage, caption, }: TableProps<T>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=Table.d.ts.map