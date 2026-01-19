"use client"
import AppTable from '@/app/(admin)/components/appTable';
import { formatTextToSentenceCase } from '@/common';
import { exportToCsv } from '@/common/export';
import { useCustomTable } from '@/hooks/useCustomTable';
import { Badge, Button, Menu } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Applications = ({
    applications,
    projectId,
    projectName,
    handleManageApplication
}:{
    applications: any[],
    projectId: string,
    projectName?: string,
    handleManageApplication: (applicationId: string, action: string) => void
}) => {

    const router = useRouter()
    const userDataHeader : ColumnDef<any>[] =[
        {
            header:'Name',
            accessorKey:'',
            cell:({ row})=>
            <div className="flex items-center gap-2">
                {`${row.original?.user?.firstName} ${row.original?.user?.lastName}`}
            </div>
        },
        {
            header:'Role Applied',
            accessorKey:'role' ,
            cell:({ row})=> formatTextToSentenceCase(row.original?.role),
        },
        {
            header:'Email',
            accessorKey:'email' ,
            cell:({row})=> row.original?.user?.email,
        },
        {
            header:'Date Applied',
            accessorKey:'createdAt' ,
            cell:(value)=> moment(value.getValue() as string ).format('MMMM Do YYYY'),
        },
        {
            header:'Status',
            accessorKey:'status' ,
            cell:({ row})=>
            <Badge
                color={
                    row.original?.status === "ACCEPTED"
                        ? "green"
                        : row.original?.status === "PENDING"
                        ? "orange"
                        : row.original?.status === "REJECTED"
                        ? "red"
                        : "gray"
                }
                variant="light"
                radius="sm"
                size="md"
                className={`font-semibold 
                    ${row.original?.status === "ACCEPTED" && "bg-green-100 text-green-800" }
                    ${row.original?.status === "PENDING" && "bg-orange-100 text-orange-800" }
                    ${row.original?.status === "REJECTED" && "bg-red-100 text-red-800" }
                    ${!["ACCEPTED", "PENDING", "REJECTED"].includes(row.original?.status) && "bg-gray-100 text-gray-800"}
                `}
            >
                {row.original?.status}
            </Badge>
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
                <Menu.Item onClick={()=>router.push(`/users/${row.original.user?._id}`)}>View Profile</Menu.Item>
                <Menu.Item onClick={()=>handleManageApplication(row.original?._id, 'ACCEPTED')} color='green' className="">Accept User</Menu.Item>
                <Menu.Item onClick={()=>handleManageApplication(row.original?._id, 'REJECTED')} color='red' className="">Reject User</Menu.Item>
                
            </Menu.Dropdown>
            </Menu>
            }
    ]

    const {table} = useCustomTable({
        columns:  userDataHeader,
        tableData: applications || [],
    })

    const handleExportCSV = () => {
        // console.log('Exporting CSV...');
        const csvData = applications.map(app => ({
            Name: `${app.user?.firstName} ${app.user?.lastName}`,
            'Role Applied': formatTextToSentenceCase(app.role),
            Email: app.user?.email,
            'Application Date': moment(app.createdAt).format('MMMM Do YYYY'),
            Status: app.status,
        }));
        const filename = `project_${projectName}_applications.csv`;

        exportToCsv(filename, csvData);
        // console.log('CSV Exported.');
    }
    return ( 
        <div className='py-'>
            
            <AppTable table={table} />

            <div className="flex  mt-5"> 
                <button
                    className="flex  lg:text-base text-sm  items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    aria-label="Export as CSV"
                    onClick={handleExportCSV}
                >
                    Export as CSV
                </button>
            </div>

             {applications.length === 0 && (
                <div className='text-center lg:text-xl lg:mt-24 mt-14 text-gray-400 '>
                    No User Applications Found for this Project
                </div>
                )
            }
        </div>
     );
}
 
export default Applications;
