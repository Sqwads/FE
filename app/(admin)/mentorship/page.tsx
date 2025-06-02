'use client';

import React, { useState } from 'react';
import { FiUsers, FiClock, FiUserCheck, FiCalendar, FiFilter, FiMoreVertical } from 'react-icons/fi';
import KPICard from './components/KPICard';
import SearchBar from './components/SearchBar';
import FilterButton from './components/FilterButton';
import MentorTable from './components/MentorTable';
import Pagination from './components/Pagination';
import { Mentor } from './components/MentorTable';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import { Badge, Button, Menu } from '@mantine/core';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Link from 'next/link';
import { useCustomTable } from '@/hooks/useCustomTable';
import AppTable from '../components/appTable';
import SearchFilters from '../components/searchfilters';
import { useRouter } from 'next/navigation';

const MentorDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(5)
   const router = useRouter()


  const {data: response, isPending} = useQuery({
    queryFn: ()=>instance.get(`/mentors`),
    queryKey: ['mentors', 'all', searchQuery, currentPage, pageSize]
  })

  const allMentors = response?.data?.mentors || [];

  const kpiData = [
    {
      title: 'All Mentors',
      value: response?.data?.totalNoOfRecords || 0,
      change: { value: 10, isIncrease: true },
      period: 'last week',
      iconBgColor: 'bg-indigo-100',
      icon: <FiUsers className="h-5 w-5 text-indigo-600" />
    },
    {
      title: 'Mentorship Minutes',
      value: 0,
      change: { value: 0, isIncrease: false },
      period: 'last week',
      iconBgColor: 'bg-blue-100',
      icon: <FiClock className="h-5 w-5 text-blue-600" />
    },
    {
      title: 'Active Mentors',
      value: response?.data?.totalActiveMentors || 0,
      change: { value: 10, isIncrease: true },
      period: 'last week',
      iconBgColor: 'bg-purple-100',
      icon: <FiUserCheck className="h-5 w-5 text-purple-600" />
    },
    {
      title: 'Upcoming Sessions',
      value: 0,
      change: { value: 0, isIncrease: false },
      period: 'last week',
      iconBgColor: 'bg-red-100',
      icon: <FiCalendar className="h-5 w-5 text-red-600" />
    }
  ];

  const handleSearch = (e:any)=>{
    const keyword = e.target.value
    
    setCurrentPage(1)
    setSearchQuery(keyword)
     
  }

  const totalPages = Math.ceil(response?.data?.totalNoOfRecords/pageSize)
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
  

  const mentorsHeader: ColumnDef<any>[] = [
    {
        header: 'Name',
        accessorKey: 'name',
        cell: ({row})=> <div className='flex items-center'>
            <div className='mr-3'>
              {row.original?.profileImage ?
                <img src={row.original?.profileImage} className='h-10 w-14 object-cover border rounded-lg' alt="" />:
                <div className='bg-[#5483FF] text-white font-semibold text-lg h-10 w-10 rounded-lg flex items-center justify-center'>
                    {row.original?.firstName[0]}{row.original?.lastName[0]}
                </div>
              }
            </div>
            <div>{`${row.original?.firstName} ${row.original?.lastName}` || 'N/A'}</div>
        </div>  
    },
    {
          header:'Domains',
          accessorKey:'title',
          cell:({ row})=> row.original?.title || 'N/A'
    },
    {
        header:'Email',
        accessorKey:'email',
        cell:({ row})=>row.original?.email
    },
    {
        header:'Sessions',
        accessorKey:'email',
        cell:({ row})=>'0'
    },
    {
        header:'Date Joined',
        accessorKey:'created_at' ,
        cell:(value)=> moment(value.getValue() as string ).format('MMMM Do YYYY'),
    },
    {
        header:'Status',
        accessorKey:'status' ,
        
        cell:({row})=> 
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
                    <Menu.Item  onClick={()=>router.push(`/mentorship/${row.original._id}`)} >
                        View Mentor
                    </Menu.Item>
                    <Menu.Item color='red' >
                       Suspend Mentor
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        )
    }

  ]

  const {table} = useCustomTable({
    tableData: allMentors,
    columns: mentorsHeader
  })
 

  return (
    <div className="py-10 lg:px-14 px-4 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-medium text-[#0234B8]">Sqwads Mentors</h1>
        <p className="text-gray-600">An Overview of all sqwads mentors</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            period={kpi.period}
            iconBgColor={kpi.iconBgColor}
            icon={kpi.icon}
          />
        ))}
      </div>

     

       <div className="mt-10">
          <SearchFilters
              onChange={handleSearch}
              handleNextPage = {handleNextPage}
              handlePrevPage={handlePrevPage}
              totalRecords = {response?.data?.totalNoOfRecords}
              currentPage = {currentPage}
              pageSize = {pageSize}
              // showExportBtn
          />
          <AppTable table={table} />
      </div>
    </div>
  );
};

export default MentorDashboard;
