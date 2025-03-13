import {
    useReactTable
    , flexRender
    , getCoreRowModel
    , getPaginationRowModel
    , getSortedRowModel
    , SortingState
    , getFilteredRowModel

} from "@tanstack/react-table";

import { useState } from "react";

interface SimpleTableProps {
    data: Array<any>;
    columns: Array<any>;
}


function SimpleTable({ data, columns }: SimpleTableProps) {

    let [sorting, setSorting] = useState<SortingState>([]);
    let [filter, setFilter] = useState("");

    let tTble = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filter
        },
        onSortingChange: (updater) => setSorting(updater),

    })

    const sortingIcon = (direction: false | 'asc' | 'desc') => {
        if (direction === "asc") {
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        } else if (direction === "desc") {
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        }
        return null;
    };


    return <div>

        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />

        <table>
            <thead>
                {
                    tTble.getHeaderGroups().map(headerG => (
                        <tr key={headerG.id}  >
                            {
                                headerG.headers.map(tHeader => (
                                    <th key={tHeader.id}
                                        onClick={tHeader.column.getToggleSortingHandler()}>
                                        {tHeader.isPlaceholder ? null : flexRender(tHeader.column.columnDef.header, tHeader.getContext())}
                                        {sortingIcon(tHeader.column.getIsSorted())}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>

            <tbody>
                {
                    tTble.getRowModel().rows.map(row => (
                        <tr key={row.id} >
                            {
                                row.getVisibleCells().map(cell => (
                                    <td  >
                                        {
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>

        </table>

        <button onClick={() => { tTble.setPageIndex(0) }} >
            primer pagina
        </button>

        <button onClick={() => { tTble.previousPage() }} >
            Anterior pagina
        </button>
        <button onClick={() => { tTble.nextPage() }} >
            Siguiente pagina
        </button>

        <button onClick={() => { tTble.setPageIndex(tTble.getPageCount() - 1) }} >
            Ultima pagina
        </button>
    </div>
}

export default SimpleTable;