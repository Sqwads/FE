"use client"

import {
  
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { useMemo, useState } from "react";
  
  interface ITableProps {
    tableData: any[] | undefined;
    columns: any[];
    columnsToHide?: Record<string, boolean>;
  }
  
  function useCustomTable({ tableData, columns, columnsToHide = {} }: ITableProps) {
    const data = useMemo(() => tableData || [], [tableData]);
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState(columnsToHide);
  
    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
        rowSelection,
        columnVisibility,
      },
      onColumnVisibilityChange: setColumnVisibility,
      enableRowSelection: true, //enable row selection for all rows
      // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
      onRowSelectionChange: setRowSelection,
      manualPagination: true,
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
    return { table };
  }
  
  export { useCustomTable };