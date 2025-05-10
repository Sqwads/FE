"use client"

import Link from 'next/link';
import  React, { useState } from 'react';
import { BsPlusLg, BsThreeDotsVertical } from 'react-icons/bs';
import Card from '../projects/components/card';
import { ColumnDef } from '@tanstack/react-table';
import { Button, Menu, Modal } from '@mantine/core';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/src/api/instance';
import SearchFilters from '../components/searchfilters';
import AppTable from '../components/appTable';
import { useCustomTable } from '@/src/hooks/useCustomTable';
import toast from 'react-hot-toast';
import { useDisclosure } from '@mantine/hooks';

const Admin = () => {

    const queryClient = useQueryClient()
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(5)
    const [verificationMoalOpened, { open:openVerificationModal, close:closeVerificationModal }] = useDisclosure(false);
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [selectedStatus, setSelectedStatus] = useState<any>(null)

    const colorCodes = {
        ACTIVE: ['#01C5691A','#01C569'],
        PENDING: [ '#FFA52F1A', '#FFA52F'],
        ONGOING: ['#36BFFA1A','#36BFFA'],
        SUSPENDED: ['#F532251A', '#F53225']
    }

    const grammerDict: any = {
        SUSPENDED: 'Suspension',
        ACTIVE: 'Activation',
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
                cell:({ row})=> row.original?.role?.replace("_", " ")
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
                    className='text-center w-24 py-1 rounded-md text-xs'
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
                {row.original?.status != 'SUSPENDED' && 
                    <Menu.Item 
                        disabled={row.original?.role == 'SUPER_ADMIN'}
                        onClick={()=>handleSelectUser('SUSPENDED',row.original)}
                    >
                        Suspend Admin
                    </Menu.Item>
                }

                {row.original?.status != 'ACTIVE' && 
                    <Menu.Item 
                        disabled={row.original?.role == 'SUPER_ADMIN'}
                        onClick={()=>handleSelectUser('ACTIVE',row.original)} 
                    >
                        Activate Admin
                    </Menu.Item>
                }
                
               
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
        queryKey: ['admins', searchQuery, currentPage, pageSize],
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

    const handleSelectUser = ( status:string, user:any)=>{
        setSelectedUser(user)
        setSelectedStatus(status)

        openVerificationModal()
    }

    const handleClearSelection = ()=>{
        
        closeVerificationModal()
        setSelectedStatus(null)
        setSelectedUser(null)
    }

    const {mutate, isPending: statusUpdatePending} = useMutation({
        mutationFn: (data:any)=>instance.patch(`/user/admin/status`, data),
        mutationKey: ['admin', 'status'],
        onSuccess() {
            toast.success('Admin Status Modified Successfuly')
            queryClient.invalidateQueries({
              queryKey:  ['admins']
            })
            handleClearSelection()
        },
        onError() {
            toast.error('Failed to Modify Admin status!')
        },
    })


    const handleSubmit = ()=>{
        const payload = {
            userId: selectedUser?.userId,
            status: selectedStatus
        }

        mutate(payload)
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
                    className="flex cursor-not-allowed lg:text-base text-sm  items-center gap-2 px-4 py-2 border  bg-[#9BB7FF33] text-[#0234B8] border-[#0234B8] rounded-lg  "
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
                    // value={0}
                    value={response?.data?.totalNoOfRecords}
                    textColor='#FFFFFF'
                    titleColor='#FFFFFF'
                />
                <Card
                    iconBackground='#01C5691A'
                    icon='Vector-complete.svg'
                    title='Super Admins'
                    // value={0}
                    value={response?.data?.totalSuperAdmins}
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
                    // value={0}
                    value={response?.data?.totalPendingAdmins}
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

            <Modal 
                centered
                opened={verificationMoalOpened} 
                onClose={handleClearSelection} 
                size={'md'}
                styles={{
                    content:{
                    borderRadius:"1rem",  
                    }
                }}
            >

                <div className="py-4 flex flex-col items-center justify-center">
                    <img src="/images/bin.png" className="mb-7" alt="bin" />
                    <div className="text-2xl font-medium mb-2">Confirm {`${grammerDict[selectedStatus] }`}</div>
                    <div className="text-[#16181BB2] px-7 text-sm mb-7 text-center">
                        Confirm {grammerDict[selectedStatus]} of 
                        <span className="font-bold"> {selectedUser?.firstName} {selectedUser?.lastName} ({selectedUser?.email})</span> 
                        .
                         Are you sure?
                    </div>

                    <div>
                    <button
                        onClick={handleClearSelection}
                        className="py-2 text-sm rounded-md bg-[#EFF3FF] border border-[#001D69] px-4 text-[#001D69]"
                    >
                        Cancel
                    </button>
                    <button 
                        disabled={statusUpdatePending}
                        onClick={handleSubmit}
                        className={`py-2 ml-3 text-sm rounded-md bg-[#F532251A] border border-[#F53225] px-4 text-[#F53225] ${statusUpdatePending && 'opacity-50'}`}
                    >
                        {statusUpdatePending ?'Saving...':'Confirm'}
                    </button>
                    </div>
                    
                </div>
            </Modal>
        </div>
     );
}
 
export default Admin;