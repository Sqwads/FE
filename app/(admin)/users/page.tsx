"use client"
import Image from "next/image";
import SearchFilters from "../components/searchfilters";
import AppTable from "../components/appTable";
import { ColumnDef } from "@tanstack/react-table";
import { useCustomTable } from "@/src/hooks/useCustomTable";
import { Avatar, Badge, Button, Menu } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/src/api/instance";
import moment from 'moment'
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

const UserListPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(5)

  const userDataHeader : ColumnDef<any>[] =[
    {
      header:'Name',
      accessorKey:'firstName',
      cell:({ row})=>
        <div className="flex items-center gap-2">
          {row.original.profileImage ? (
            <Avatar src={row.original.profileImage} alt={row.original.firstName} radius="xl" />
          ) : (
            <div className="w-8 h-8 flex items-center font-bold justify-center bg-blue-500 text-white rounded-full">
              {row.original.firstName?.charAt(0)}
            </div>
          )}
          <span>{`${row.original.firstName} ${row.original.lastName}`}</span>
        </div>
    },
    {
      header:'Domain',
      accessorKey:'domain' ,
      cell:({ row})=> row.original?.skills_of_interest[0],
    },
    {
      header:'Email',
      accessorKey:'email' ,
      cell:(value)=> value.getValue(),
    },
    {
      header:'Projects',
      accessorKey:'projects' ,
      cell:(value)=> value.getValue() || 0,
    },
    {
      header:'Status',
      accessorKey:'status' ,
      cell:({ row})=>
        <Badge
          color={row.original.status === "ACTIVE" ? "green" : "orange"}
          variant="light"
          radius="sm"
          size="md"
          className={`font-semibold ${
            row.original.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
          }`}
        >
          {row.original.status}
        </Badge> 
    },
    {
      header:'Date Joined',
      accessorKey:'createdAt' ,
      cell:(value)=> moment(value.getValue() as string ).format('MMMM Do YYYY'),
    },
    {
      header:'Action',
      id:'action',
      cell:()=>  
      <Menu position="bottom-end" shadow="md" width={200}>
        <Menu.Target>
          <Button variant="subtle" size="compact-icon">
            <BsThreeDotsVertical />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>View Profile</Menu.Item>
          <Menu.Item>Edit User</Menu.Item>
          <Menu.Item color="red">Suspend User</Menu.Item>
        </Menu.Dropdown>
      </Menu>
     }
  ]

  const {data: usersData, isLoading: userInfoIsLoading} = useQuery({
    queryFn: ()=>instance.get(
      '/user/all',
      {
        params:{
          pageSize,
          pageNumber: currentPage,
          ...(searchQuery.length > 1 && {searchQuery})
        }
      }
    ),
    queryKey: ['users', searchQuery, currentPage, pageSize],
    placeholderData: (prev) => prev
  })
  const totalPages = Math.ceil(usersData?.data?.totalNoOfRecords/pageSize)

  const {table} = useCustomTable({
    columns: userDataHeader,
  tableData: usersData?.data?.users
  })

  const handleSearch = (e:any)=>{
    const keyword = e.target.value
    
    setCurrentPage(1)
    setSearchQuery(keyword)
     
  }

  const handleNextPage = ()=>{   
    if(currentPage+1 <= totalPages){
      setCurrentPage(currentPage+1)
    }
  }
  const handlePrevPage = ()=>{
    if(currentPage-1 > 0){
      setCurrentPage(currentPage-1)
    }
  }

  return (
    <section className="py-14 lg:px-10 px-3">
        <div className="flex justify-between items-center  rounded-lg">
          {/* Title and Subtitle */}
          <div>
            <h1 className="text-3xl font-medium text-blue-600">Sqwads Users</h1>
            <p className="text-gray-500 mt-1">An Overview of all sqwads users over the years</p>
          </div>
    
          {/* Export as CSV Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
            aria-label="Export as CSV"
          >
            Export as CSV
            <Image 
              src="/images/download.png"
              alt="download"
              width={30}
              height={20}
            />
          </button>
        </div>

        <SearchFilters
            onChange={handleSearch}
            handleNextPage = {handleNextPage}
            handlePrevPage={handlePrevPage}
            totalRecords = {usersData?.data?.totalNoOfRecords}
            currentPage = {currentPage}
            pageSize = {pageSize}
         />

        <AppTable
          table={table}
          // table={table}
        />

        {
          (usersData?.data?.users?.length <= 0 && !userInfoIsLoading) &&
          <div className="h-64 flex items-center justify-center flex-col">
              <FiShoppingCart size={80} color="lightgray" className="mb-7" />
              <div className="font-semibold text-xl text-[lightgray]">Noting to See here</div>
          </div>
        }
       
    </section>
  );
}

export default UserListPage;
