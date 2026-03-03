import styles from './Table.module.css';

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

const SkeletonRow = ({ columnCount }: { columnCount: number }) => (
  <tr className={styles.skeletonRow}>
    {Array.from({ length: columnCount }).map((_, i) => (
      <td key={i} className={styles.td}>
        <div className={styles.skeleton} />
      </td>
    ))}
  </tr>
);

export const Table = <T,>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No data available',
  caption,
}: TableProps<T>) => {
  return (
    <div className={styles.container} role="region" aria-busy={isLoading}>
      <table className={styles.table}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={styles.th}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {isLoading ? (
            <>
              <SkeletonRow columnCount={columns.length} />
              <SkeletonRow columnCount={columns.length} />
              <SkeletonRow columnCount={columns.length} />
            </>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={keyExtractor(row)} className={styles.tr}>
                {columns.map((col) => (
                  <td key={col.key} className={styles.td}>
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.displayName = 'Table';
