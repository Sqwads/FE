"use client"

import React from "react";


const AboutSection = ({mentor}:any) => {

  return(
    <div className="lg:pr-10">
      <p className="mb-5 text-gray-500">
        {mentor?.story}
      </p>
      <div className="mb-4">
        <div className="mr-2 font-semibold mb-2">My Skills:</div>
        <span className="inline-flex gap-2 flex-wrap">
          {mentor?.skills?.map((item: any, idx:number)=>
          <span key={idx} className="bg-blue-50 text-blue-700 rounded-lg px-2 py-1 text-xs font-medium">{item}</span>
          )}
          
        </span>
      </div>
      <div>
        <div className="mb-2 font-semibold">Mentorship Areas:</div>
        <ul className="list-disc pl-6  text-gray-500 space-y-1">
          {mentor?.skills?.map((item:any, idx:number)=>
          <li key={idx}>{item}</li>
          )}
         
        </ul>
      </div>
    </div>
);
}


export default AboutSection;