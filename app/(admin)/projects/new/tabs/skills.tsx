"use client"
import { sortList } from '@/src/common';
import { customColors, skills } from '@/src/common/data';
import { MultiSelect } from '@mantine/core';
import React from 'react';

const Skills = ({
    handleSelect,
    handleSelectTool,
    list,
    selectedTools,
    previewMode
}:{
    handleSelect?: (e:any)=>void,
    handleSelectTool?: (e:any,  skill:string)=>void;
    list: any[],
    selectedTools: any[],
    previewMode?: boolean
}) => {

    const skillsList = skills.map(item=>item.name).sort()


    const getSkillTools = (skill:string)=>{
        return skills.find(item=> item.name == skill)?.tools
    }

    return ( 
        <div>
            <div className={`font-semibold mb-7 ${previewMode && 'bg rounded px-4 py-2   bg-[#0234B81A] text-[#0234B8]'}`}>SKILLS</div>

            <div className='mb-5'>
                <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">Domain</div>
                <MultiSelect
                    data={skillsList}
                    searchable
                    value={list}
                    // @ts-ignore
                    onChange={(e)=>handleSelect(e )}
                    disabled={previewMode}
                />
             </div>

             <div>
                {list.map((item, idx)=>
                    <div key={idx} className='mb-7'>
                        <div className="mb-1  text-[#16181BB2] text-sm">{`Skills for ${item}`}</div>
                        <MultiSelect
                            //@ts-ignore
                            onChange={(e)=>handleSelectTool(e, item)}
                            styles={{
                                pill:{
                                    background: '#ECEEFF',
                                    border:`1px solid #6172F3`,
                                    color:'#6172F3'
                                },
                            }}
                            value={selectedTools[idx]?.tools}
                            data={getSkillTools(item)}
                            disabled={previewMode}
                        />
                    </div>
                )}
             </div>

        </div>
     );
}
 
export default Skills;
