"use client"
import  React, { useState } from 'react';
import { BsPlusLg, BsThreeDotsVertical } from 'react-icons/bs';
import Card from './components/card';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import { Button, Menu } from '@mantine/core';
import { useCustomTable } from '@/src/hooks/useCustomTable';
import AppTable from '../components/appTable';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/src/api/instance';
import { formatTextToSentenceCase } from '@/src/common';
import SearchFilters from '../components/searchfilters';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Projects = () => {

    const colorCodes = {
        COMPLETED: ['#01C5691A','#01C569'],
        ARCHIVE: [ '#5339161a', '#FFA52F'],
        ONGOING: ['#36BFFA1A','#36BFFA'],
        OVERDUE: ['#F532251A', '#F53225']
    }

    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(5)
    const router = useRouter()
   
    const projectDtHeader: ColumnDef<any>[] = [
        {
            header: 'Project Name',
            accessorKey: 'name',
            cell: value=>value.getValue()
        },
        {
              header:'Domains',
              accessorKey:'firstName',
              cell:({ row})=>
                <div className="">
                    {formatTextToSentenceCase(
                        row.original.teamMembers?.map((item:any)=>item?.role).join(', ')
                    )}
                </div>
        },
        {
            header:'Users',
            accessorKey:'firstName',
            cell:({ row})=>
              <div className="flex">
                  {row.original.teamMembers?.slice(0,2)?.map((item:any, index:any)=>
                    <div key={index}>
                        {item?.user?.profileImage ?
                         <img src={item?.user?.profileImage} className='h-8 w-8 rounded-full border object-cover' alt="image" />:
                         <div 
                            className='rounded-full h-8 w-8 bg-blue-600 text-white font-medium ml-[-0.4rem] items-center justify-center flex text-lg'
                        >
                            {item.user?.firstName[0]}
                        </div>
                        }
                    </div>
                  )}
                  {
                   ( row.original?.teamMembers?.length - 2) > 0 &&
                   <div className="flex rounded-full text-xs items-center justify-center border border-[#9BB7FF] h-8 w-8 text-[#001D69]">
                    {row.original?.teamMembers?.length - 2}+
                    </div>
                  }
                  
              </div>
        },
        {
            header:'Deadline',
            accessorKey:'endDate' ,
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
            header: 'Action',
            id: 'action',
            cell: ({ row }) => (
                <Menu position="bottom-end" shadow="md" width={200}>
                    <Menu.Target>
                        <Button variant="subtle" size="compact-icon">
                            <BsThreeDotsVertical />
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item component={Link} href={`/projects/${row.original._id}`}>
                            View Project
                        </Menu.Item>
                        <Menu.Item onClick={() => router.push(`/projects/new?mode=edit&project=${row.original._id}`)}>
                            Edit Project
                        </Menu.Item>
                        <Menu.Item className="!cursor-not-allowed">Archive Project</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            )
        }
    
    ]

    const {data: response, isPending} = useQuery({
        queryFn:()=>instance.get(`/project/all`,  {
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
        columns:  projectDtHeader,
        tableData: response?.data?.projects,
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
                    <h1 className="lg:text-2xl text-2xl font ">Project Management</h1>
                    <p className="text-gray-500 mt-1">Manage and monitor all projects seamlessly</p>
                </div>
        
                {/* Export as CSV Button */}
                <Link href='/projects/new'>
                <button
                    className="flex lg:text-base text-sm  items-center gap-2 px-4 py-2 border  bg-[#9BB7FF33] text-[#0234B8] border-[#0234B8] rounded-lg  "
                >
                    <BsPlusLg /> New Project
                </button>
                </Link>
            </div>

            <div className="grid xl:grid-cols-5 grid-cols-2 gap-x-4 gap-y-4">
                <Card
                    cardBackground='#6172F3'
                    iconBackground='#DADEFF'
                    icon='Vector-all.svg'
                    title='All Projects'
                    value={response?.data?.totalNoOfRecords}
                    textColor='#FFFFFF'
                    titleColor='#FFFFFF'
                />
                <Card
                    iconBackground='#01C5691A'
                    icon='Vector-complete.svg'
                    title='Completed'
                    value={response?.data?.totalCompleted}
                    textColor='#01C569'
                />
                <Card
                    iconBackground='#36BFFA33'
                    icon='Vector-ongoing.svg'
                    title='Ongoing'
                    value={response?.data?.totalOngoing}
                    textColor='#36BFFA'
                />
                <Card
                    iconBackground='#F532251A'
                    icon='Vector-overdue.svg'
                    title='Overdue'
                    value={response?.data?.totalOverdue}
                    textColor='#F53225'
                />
                <Card
                    iconBackground='#EE46BC33'
                    icon='Vector-archive.svg'
                    title='Archive'
                    value={response?.data?.totalArchived}
                    textColor='#EE46BC'
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
 
export default Projects;