"use client"
import { instance } from '@/src/api/instance';
import { MultiSelect, Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import  React, { useEffect, useState } from 'react';


const Members = ({
    // onSelectMembers,
    selectedMembers,
    selectedProjectead,
    membersOptions,
    previewMode,
    handleSearchChange,
    handleSelectMembers,
    handleProjectLeadSelect
}:{
    handleSearchChange?: (val:any)=>void,
    handleSelectMembers?: (val:any)=>void,
    handleProjectLeadSelect?: (val:any)=>void,
    selectedMembers: any[],
    membersOptions: any [],
    selectedProjectead: string,
    previewMode?:boolean
}) => {

  
    return ( 
        <div>
            <div className={`font-semibold mb-7 ${previewMode && 'bg rounded px-4 py-2   bg-[#0234B81A] text-[#0234B8]'}`}>USERS/MEMBERS</div>
             <div className='mb-5'>
                <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">Members</div>
                <MultiSelect
                    data={membersOptions}
                    disabled={previewMode}
                    searchable
                    onSearchChange={handleSearchChange}
                    value={selectedMembers.map((m) => m.value)}
                    onChange={(selectedIds: string[]) => {
                        // Map the selected IDs to their corresponding objects from membersOptions.
                        const selectedObjects = membersOptions.filter((option) =>
                          selectedIds.includes(option.value)
                        );
                        //@ts-ignore
                        handleSelectMembers(selectedObjects);
                    }} 
                    placeholder="Search and select members"
                    // clearable
                    
                />
             </div>

             <div className="mb-4">
                <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">Project Lead</div>
                <Select
                    disabled={previewMode}
                    placeholder="Select Team Lead"
                    data={membersOptions}
                    value={selectedProjectead}
                    onSearchChange={handleSearchChange}
                    onChange={handleProjectLeadSelect}
                    searchable
                />
             </div>
        </div>    
    );
}
 
export default Members;