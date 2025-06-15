"use client"
import React, { useState } from "react";
import MentorCard from "../mentors/components/mentor_card";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/instance";

const mentors = [
  {
    id: "1",
    name: "Chukwumeka Michael",
    title: "Fullstack Developer",
    image: "/lovable-uploads/94e6458f-4ac5-4184-b17a-a97183284e61.png",
    meetingDate: "Thurs, 2nd Oct, 2024",
    meetingTime: "11:00 - 11:30 AM",
    joinedAgo: "35 minutes ago",
    // status:'UPCOMING'
  },
  {
    id: "2",
    name: "Kunle Adebayo",
    title: "Backend Engineer",
    image: "/lovable-uploads/94e6458f-4ac5-4184-b17a-a97183284e61.png",
    meetingDate: "Thurs, 2nd Oct, 2024",
    meetingTime: "11:00 - 11:30 AM",
    joinedAgo: "2 minutes ago",
  },
  {
    id: "3",
    name: "Peter Florence",
    title: "Frontend Developer",
    image: "/lovable-uploads/94e6458f-4ac5-4184-b17a-a97183284e61.png",
    meetingDate: "Thurs, 2nd Oct, 2024",
    meetingTime: "11:00 - 11:30 AM",
    joinedAgo: "22 minutes ago",
  },
  {
    id: "4",
    name: "Adewale Taofeeq",
    title: "Data Analyst",
    image: "/lovable-uploads/aaf735be-be5e-4b65-af71-2d6062a59f97.png",
    meetingDate: "Thurs, 2nd Oct, 2024",
    meetingTime: "11:00 - 11:30 AM",
    joinedAgo: "5 minutes ago",
  }
];

;

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