"use client";

import { TextInput, Button } from "@mantine/core";
import { FiSearch } from "react-icons/fi";
import { BsFilter, BsListUl } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const SearchFilters = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full p-4 gap-4">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto">
        {/* Search Input */}
        <div className="w-full md:max-w-[40rem]">
          <TextInput
            placeholder="Search"
            leftSection={<FiSearch size={16} className="text-gray-500" />}
            size="md"
            className="w-full"
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
        <div className="flex gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            leftSection={<BsListUl size={16} />}
            className="flex-1 md:flex-none"
            aria-label="Filters"
          >
            Filters
          </Button>
          <Button
            variant="outline"
            leftSection={<BsFilter size={16} />}
            className="flex-1 md:flex-none"
            aria-label="Sort"
          >
            Sort
          </Button>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-4">
        <span className="text-gray-500">1-15 of 2500</span>
        <Button
          variant="subtle"
          size="compact-icon"
          aria-label="Previous Page"
        >
          <IoChevronBack size={16} />
        </Button>
        <Button
          variant="subtle"
          size="compact-icon"
          aria-label="Next Page"
        >
          <IoChevronForward size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;