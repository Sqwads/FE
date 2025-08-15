"use client";

import { Table} from "@mantine/core";
import { RxCaretSort, RxCaretDown, RxCaretUp } from "react-icons/rx";
import { flexRender, Table as ReactTable } from "@tanstack/react-table";

const AppTable = (
  {
    table,
  
    onRowClick,
    excludeFromRowClick = [],
  }: {
    table?: ReactTable<any>;
    onRowClick?: (param: any) => void;
    excludeFromRowClick?: string[];
  }
) => {
  return (
    <div className="overflow-x-scroll  my- ">
      <Table  highlightOnHover className="w-full">
        {/* Table Header */}
        <thead className="bg-blue-900 text-white">
          {table?.getHeaderGroups().map((headerGroup, index)=>
          <tr key={index}>
            {headerGroup.headers.map((header, index)=>
              <th 
                key={index} 
                className="text-left px-4 py-3 whitespace-nowrap"
                onClick={header.column.getToggleSortingHandler()}
              >
                 <div className="flex">
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                    {{
                      asc: header.column.getCanSort() && (
                        <RxCaretUp
                          size={20}
                          color="#EBF1FF"
                          className="cursor-pointer"
                        />
                      ),

                      desc: header.column.getCanSort() && (
                        <RxCaretDown
                          size={20}
                          color="#EBF1FF"
                          className="cursor-pointer"
                        />
                      ),
                    }[header.column.getIsSorted() as string] ??
                      (header.column.getCanSort() && (
                        <RxCaretSort
                          size={20}
                          color="#EBF1FF"
                          className="cursor-pointer"
                        />
                    ))}
                 </div>
                 
              </th>
            )}
                 
         </tr>
          )}
         
        </thead>

        {/* Table Body */}
        <tbody>

          {table?.getRowModel().rows.map((row, index) => (
            <tr
              key={index}
              className=" bg-gray-50 transition-all shadow-sm border-b-[15px] border-t-[15px] border-[white] mb-3 mt-3"
            >
             {row.getVisibleCells().map((cell, i)=>
              <td 
                className="px-4 py-3"
                onClick={() =>
                  onRowClick &&
                  cell.column.id !== "select" &&
                  cell.column.id !== "action" &&
                  !excludeFromRowClick.includes(cell.column.id)
                    ? onRowClick(row.original)
                    : {}
                }
                key={i}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
             )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AppTable;