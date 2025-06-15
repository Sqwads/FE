"use client"
import React, { useState } from "react";
import MyMentorCard from "./components/my_mentorCard";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { number } from "yup";



const Mentors = () => {

    const [tabs, setTabs] = useState([
      {label:'Pending', isActive: true, key:'PENDING'},
      {label:'Upcoming', isActive: false, key:'UPCOMING'},
      {label:'Completed', isActive: false, key:'COMPLETED'}
    ])

    const handleSelectTab = (selectedIdx: number) => {
        setTabs(tabs.map((tab, idx) => ({
            ...tab,
            isActive: idx === selectedIdx
        })));
    }

    const activeTab = tabs.find(item=> item.isActive)

    const {data: response, isPending} = useQuery({
        queryFn: ()=>instance.get(`/mentors/user-bookings`, {
        params: { 
          status: activeTab?.key
        }}),
        queryKey: ['my-mentors', activeTab],
    })

    const mentors = response?.data?.data


 return(
    <div className="px-8 py-10">
        <div>
        <h2 className="text-3xl font-medium mb-2">My Sessions</h2>
        <p className="text-[#16181B80] mb-6">Learn from experts, get feedback, and grow with personalized mentorship.</p>
        </div>
        <div className="flex gap-4 mb-6">
            {tabs.map((item, idx)=>
                <div 
                    onClick={()=>handleSelectTab(idx)} 
                    key={idx} 
                    className={`text-sm cursor-pointer font-medium px-5 py-1 ${item.isActive? 'text-[#001D69] border-b-2 border-[#001D69]':'text-[#16181B80]'}`}
                >
                    {item.label}
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mentors?.map((mentor:any, idx: number) => (
            <MyMentorCard key={idx} schedule={mentor} />
        ))}

       
        </div>
         {mentors?.length == 0 && 
          <div className="mt-20  text-center text-gray-400 text-medium text-lg">NO {activeTab?.key} SESSION AVAILABLE</div>
        }
    </div>
 )
};

export default Mentors;