"use client";

import { TextInput, Button } from "@mantine/core";
import { FiSearch } from "react-icons/fi";
import { BsListUl } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const SearchFilters = ({
  onChange,
  handleNextPage,
  handlePrevPage,
  showExportBtn,
  currentPage,
  totalRecords,
  pageSize,
  onExport,
  isExporting
}: {
  onChange: (e: any) => void,
  handleNextPage: () => void,
  handlePrevPage: () => void,
  currentPage: number,
  totalRecords: number,
  pageSize: number,
  showExportBtn?: boolean,
  onExport?: () => void,
  isExporting?: boolean
}) => {

  const pageStart = ((currentPage - 1) * pageSize) + 1
  const end = pageStart + pageSize - 1
  const pageEnd = end > totalRecords ? totalRecords : end
  const totalPage = Math.ceil(totalRecords / pageSize)


  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full py-7 gap-4">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto">
        {/* Search Input */}
        <div className="w-full md:w-[20rem]">
          <TextInput
            placeholder="Search"
            leftSection={<FiSearch size={16} className="text-gray-500" />}
            size="md"
            className="w-full"
            onChange={(e) => onChange(e)}
            styles={{
              input: {
                background: "#F6F6F6",
                border: "1px solid #D5D7DA",
                transition: "border-color 0.2s ease",
                "&:focus": {
                  borderColor: "#3B82F6",
                  boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
                },
              },
            }}
          />
        </div>

        {/* Filter and Sort Buttons */}
        <div className="flex gap-3 w-auto md:w-auto">
          <Button
            variant="outline"
            leftSection={<BsListUl size={16} />}
            className="flex-1 md:flex-none"
            aria-label="Filters"
          >
            Filters
          </Button>
          {showExportBtn &&
            <button
              className="flex lg:hidden lg:text-base text-sm  items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Export as CSV"
              onClick={onExport}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export as CSV'}

            </button>
          }
          {/* <Button
            variant="outline"
            leftSection={<BsFilter size={16} />}
            className="flex-1 md:flex-none"
            aria-label="Sort"
          >
            Sort
          </Button> */}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-4">
        <span className="text-gray-500"> {`${pageStart} to ${pageEnd} of ${totalRecords}`}</span>
        <Button
          variant="subtle"
          size="compact-icon"
          aria-label="Previous Page"
          onClick={handlePrevPage}
          disabled={currentPage - 1 <= 0}
        >
          <IoChevronBack size={16} />
        </Button>
        <Button
          variant="subtle"
          size="compact-icon"
          aria-label="Next Page"
          disabled={currentPage + 1 > totalPage}
          onClick={handleNextPage}
        >
          <IoChevronForward size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;