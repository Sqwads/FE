"use client"

import Link from 'next/link';
import  React, { useState } from 'react';
import { BsPlusLg, BsThreeDotsVertical } from 'react-icons/bs';
import Card from '../projects/components/card';
import { ColumnDef } from '@tanstack/react-table';
import { Button, Menu } from '@mantine/core';
import moment from 'moment';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/src/api/instance';
import SearchFilters from '../components/searchfilters';
import AppTable from '../components/appTable';
import { useCustomTable } from '@/src/hooks/useCustomTable';

const Admin = () => {

    const queryClient = useQueryClient()
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
     const [pageSize] = useState(5)

    const colorCodes = {
        ACTIVE: ['#01C5691A','#01C569'],
        PENDING: [ '#FFA52F1A', '#FFA52F'],
        ONGOING: ['#36BFFA1A','#36BFFA'],
        SUSPENDED: ['#F532251A', '#F53225']
    }
    
    const adminDtHeader: ColumnDef<any>[] = [
        {
            header: 'Admin Name',
            accessorKey: '',
            cell: ({row})=> `${row.original?.firstName} ${row.original?.lastName}`
        },
        {
                header:'Role',
                accessorKey:'',
                cell:({ row})=> 'Admin'
        },
        {
            header:'Date Added',
            accessorKey:'createdAt',
            cell:(value)=> moment(value.getValue() as string ).format('MMMM Do YYYY'),
        },
        {
            header:'Status',
            accessorKey:'status' ,
            
            cell:({row})=> 
                <div 
                    className='text-center py-1 rounded-md text-xs'
                    style={{
                        //@ts-expect-error
                        background: colorCodes[`${row.original?.status}`][0], 
                        //@ts-expect-error
                        border: `1px solid ${colorCodes[`${row.original?.status}`][1]}`,
                        //@ts-expect-error
                        color:  colorCodes[`${row.original?.status}`][1]
                    }}
                > 
                    {row.original?.status} 
                </div>
        },
        {
            header:'Action',
            id:'action',
            cell:({ row})=>  
            <Menu position="bottom-end" shadow="md" width={200}>
            <Menu.Target>
                <Button variant="subtle" size="compact-icon">
                <BsThreeDotsVertical />
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item >Suspend</Menu.Item>
                {/* <Menu.Item  className="">Edit Project</Menu.Item>
                <Menu.Item className="!cursor-not-allowed">Archive Project</Menu.Item> */}
            </Menu.Dropdown>
            </Menu>
        }
    ]

    const {data: response, isPending} = useQuery({
        queryFn:()=>instance.get(`/user/admin/all`,  {
            params:{
              pageSize,
              pageNumber: currentPage,
              ...(searchQuery.length > 1 && {searchQuery})
            }
        }),
        queryKey: ['projects', searchQuery, currentPage, pageSize],
        placeholderData: (prev) => prev
    })

    const totalPages = Math.ceil(response?.data?.totalNoOfRecords/pageSize)
    const {table} = useCustomTable({
        columns:  adminDtHeader,
        tableData: response?.data?.admins,
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
        <div className='py-10 lg:px-10 px-3'>
            <div className="lg:flex justify-between lg:mb-14 mb-10 items-center  rounded-lg">
                {/* Title and Subtitle */}
                <div className='mb-5 lg:mb-0'>
                    <h1 className="lg:text-2xl text-2xl font ">Admin Control</h1>
                    <p className="text-gray-500 mt-1">Control with clarity, manage with ease</p>
                </div>
        
                {/* Export as CSV Button */}
                <Link href='#'>
                <button
                    className="flex lg:text-base text-sm  items-center gap-2 px-4 py-2 border  bg-[#9BB7FF33] text-[#0234B8] border-[#0234B8] rounded-lg  "
                >
                    <BsPlusLg /> Create New Admin
                </button>
                </Link>
            </div>

            <div className="grid xl:grid-cols-4 grid-cols-2 gap-x-4 gap-y-4">
                <Card
                    cardBackground='#6172F3'
                    iconBackground='#DADEFF'
                    icon='Vector-all.svg'
                    title='Total Admins'
                    value={0}
                    // value={response?.data?.totalNoOfRecords}
                    textColor='#FFFFFF'
                    titleColor='#FFFFFF'
                />
                <Card
                    iconBackground='#01C5691A'
                    icon='Vector-complete.svg'
                    title='Super Admins'
                    value={0}
                    // value={response?.data?.totalCompleted}
                    textColor='#01C569'
                />
                <Card
                    iconBackground='#36BFFA33'
                    icon='Vector-ongoing.svg'
                    title='Sub Admins'
                    value={0}
                    // value={response?.data?.totalOngoing}
                    textColor='#36BFFA'
                />
                <Card
                    iconBackground='#F532251A'
                    icon='Vector-overdue.svg'
                    title='Pending Admins'
                    value={0}
                    // value={response?.data?.totalOverdue}
                    textColor='#F53225'
                />
                
            </div>

            <div className="mt-10">
                <SearchFilters
                    onChange={handleSearch}
                    handleNextPage = {handleNextPage}
                    handlePrevPage={handlePrevPage}
                    totalRecords = {response?.data?.totalNoOfRecords}
                    currentPage = {currentPage}
                    pageSize = {pageSize}
                    showExportBtn
                />
                <AppTable table={table} />
            </div>
        </div>
     );
}
 
export default Admin;