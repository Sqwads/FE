"use client"
import AppTable from '../../../../../app/(admin)/components/appTable';
import { formatTextToSentenceCase } from '../../../../../src/common';
import { useCustomTable } from '../../../../../src/hooks/useCustomTable';
import { Badge, Button, Menu, TextInput } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import  React, { useState } from 'react';
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';

const Members = ({
    members
}:{
    members: any[]
}) => {

    const router = useRouter()
    // const [query, setQuery] = useState('')
    const [filteredMembers, setFilteredMembers] = useState<any>([])
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
          header:'Role',
          accessorKey:'role' ,
          cell:({ row})=> formatTextToSentenceCase(row.original?.role),
        },
        {
          header:'Email',
          accessorKey:'email' ,
          cell:({row})=> row.original?.user?.email,
        },
        {
            header:'Date Joined',
            accessorKey:'createdAt' ,
            cell:(value)=> moment(value.getValue() as string ).format('MMMM Do YYYY'),
        },
        {
          header:'Status',
          accessorKey:'status' ,
          cell:({ row})=>
            <Badge
              color={row.original.user?.status === "ACTIVE" ? "green" : "orange"}
              variant="light"
              radius="sm"
              size="md"
              className={`font-semibold ${
                row.original.user?.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
              }`}
            >
              {row.original.user?.status}
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
              <Menu.Item onClick={()=>router.push(`/users/${row.original.user?.userId}`)}>View Profile</Menu.Item>
              <Menu.Item className="!cursor-not-allowed">Edit User</Menu.Item>
              {/* {row.original?.status == 'ACTIVE' && <Menu.Item onClick={()=>handleSuspendUser(row.original)} color="red">Suspend User</Menu.Item>}
              {row.original?.status == 'SUSPENDED' && <Menu.Item onClick={()=>handleActivateUser(row.original?.userId)}  color="#028d4c">Activate User</Menu.Item>} */}
            </Menu.Dropdown>
          </Menu>
         }
    ]

    const handleFilter = (query: string)=>{
        console.log('query', query)
        if(query.length < 2) return  
        const members_c = [...members]
        const filtered = members_c.filter((item:any, idx:number)=> 
            item?.user?.firstName?.toLowerCase() == query.toLowerCase() ||
            item?.user?.lastName?.toLowerCase() == query.toLowerCase()
        )
        
        setFilteredMembers(filtered)

    }

    const {table} = useCustomTable({
        columns:  userDataHeader,
        tableData: filteredMembers.length > 0 ? filteredMembers: members,
    })
    

    return ( 
        <div className=" py-5">
            <div className='max-w-[350px] mb-5'>
                <TextInput
                    leftSection={<BsSearch/>}
                    placeholder='Search by name'
                    onChange={(e)=>handleFilter(e.target.value)}
                    // value={query}
                 />
            </div>
            <AppTable table={table} />
        </div>
     );
}
 
export default Members;
