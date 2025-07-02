"use client"
import React, { useState } from "react";
import MentorCard from "../mentors/components/mentor_card";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/instance";




const ExploreMentors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5)

    const {data: response, isPending} = useQuery({
      queryFn: ()=>instance.get(`/mentors`),
      queryKey: ['mentors', 'all', searchQuery, currentPage, pageSize]
    })

    const allMentors = response?.data?.mentors || [];

    const [tabs, setTabs] = useState([
        {label:'Pending', isActive: true},
        {label:'Upcoming', isActive: false},
        {label:'Completed', isActive: false}
    ])

  
    const handleSelectTab = (selectedIdx: number) => {
        setTabs(tabs.map((tab, idx) => ({
            ...tab,
            isActive: idx === selectedIdx
        })));
    }


 return(
    <div className="lg:px-8 px-3 py-10">
        <div>
        <h2 className="text-3xl font-medium mb-2">Explore Mentors</h2>
        <p className="text-[#16181B80] mb-6">Learn from experts, get feedback, and grow with personalized mentorship.</p>
        </div>
       

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allMentors?.map((mentor:any, idx:number) => (
            <MentorCard
                key={idx}
                name={`${mentor?.firstName} ${mentor?.lastName}`}
                title={mentor?.title}
                experience={mentor?.years_of_experience}
                image={mentor?.profileImage}
                id={mentor?._id}
            />
        ))}
        </div>
    </div>
 )
};

export default ExploreMentors;