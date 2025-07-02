"use client"
import { isNotEmpty } from "@mantine/form";
import moment from "moment";
import Link from "next/link";
import React from "react";
// import { useNavigate } from "react-router-dom";

const MyMentorCard = ({ 
  // mentor, 
  schedule 
}: { 
  schedule: any;
  // schedule:any;
}) => {

  const mentor = schedule?.mentor
  
  const colorCodes = {
      pending:'text-[#FFA52F] border border-[#FFA52F] bg-[#FFF3E4]',
      upcoming:'text-blue-400 border-blue-200 bg-blue-50',
      completed:'text-[#01C569] border border-[#01C569] bg-[#EEFFF7]'
  }

  return (
    <div className="border rounded-lg bg-white shadow-sm flex flex-col items-start  gap-3 h-full min-w-[265px]">
      <img src={mentor?.profileImage || '/images/profile.jpg'} alt={mentor.name} className="w-full h-28 rounded-lg object-cover" />
      <div className="px-4">
        <h4 className="font-semibold mt-3 text-lg">{mentor.firstName} {mentor?.lastName}</h4>
        <p className="text-sm text-[#16181B80]">{mentor.title}</p>
        <div className="text-xs text-muted-foreground mt-1"> <span className="font">Date of Request:</span> <span className="font-medium">{ moment(schedule?.created_a as string ).format('MMMM Do YYYY')}</span> </div>
      </div>
      <div className="flex items-center text-sm gap-2 my-2 px-4">
        <span>{ moment(schedule?.date as string ).format('MMMM Do YYYY')}</span>
        <span>·</span>
        <span>{schedule.time}</span>
      </div>
      <div className="flex bg-[#F5F5F599] px-4 py-5 justify-between w-full">
        <div
          // onClick={() => navigate(`/mentor/${mentor.id}`)}
          className="cursor-pointer underline text-[#001D69] font-semibold"
        >
          {schedule?.status == 'UPCOMING'?
            <a href={schedule?.meetingLink} target="_blank" rel="noopener noreferrer"><span>Join Meeting</span></a>:
          <Link href={`/mentors/${mentor._id}`}><span>View Profile</span></Link>}
        </div>
        <span 
          className={`text-xs border px-2 py-0.5 rounded 
            ${schedule?.status == 'UPCOMING' && colorCodes.upcoming}
            ${(schedule?.status == 'PENDING' || !schedule?.status) && colorCodes.pending}
            ${schedule?.status == 'COMPLETED' && colorCodes.completed}
          `}
        >
          {schedule?.status || 'PENDING'} 
        </span>
      </div>
    </div>
  );
};

export default MyMentorCard;