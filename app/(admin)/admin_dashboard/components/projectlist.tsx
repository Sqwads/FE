"use client"
import { instance } from "@/src/api/instance";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const projects = [
    { name: "Weather Forecast App", members: 22, image: "/images/weather.png" },
    { name: "Data Insights Dashboard", members: 14, image: "/images/data_insights.png" },
    { name: "Cybersecurity Tool", members: 35, image: "/images/cybersecurity.png" },
    { name: "University of Ilorin Examination Portal", members: 12, image: "/images/unilorin.png" },
];


  
  const ProjectsList = () => {

    const {data: response, isPending} = useQuery({
      queryFn:()=>instance.get(`/project/all`,  {
          params:{
            pageSize: 4,
          }
      }),
      queryKey: ['projectsss'],
      // placeholderData: (prev) => prev
    })

    return (
      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-[#16181B]">Squads Projects</h2>
          <button className="text-blue-600 text-sm">See all</button>
        </div>
        <ul className="space-y-4">
          {response?.data?.projects?.map((project:any, index:number) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={project?.coverImage} 
                  alt={project.name} 
                  // width={50}
                  // height={20}
                    className="w-10 h-10 rounded-md"
                 />
                <p className="font-medium">{project.name}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{project?.teamMembers?.length}</p>
                <p className="text-sm text-gray-500">members</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProjectsList;