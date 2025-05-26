import React from 'react';


const PortfolioAbout = ({
    user
}:{
    user?: any;
}) => {
    return ( 
        <div className='lg:px-10 py-10'>
            <div className="font-semibold text-lg mb-3">Overview</div>
            <div className='mb-8'>
               {user?.bio}
            </div>

            <div className="font-semibold text-lg mb-3">Skills</div>
            <div className="flex gap-x-3 gap-y-2 flex-wrap">
               {user?.skills_of_interest?.map((skill:any, index:number) => (
                 <div key={index} className="border border-[#16181B] min-w-10 py-1 px-3 rounded-md">{skill}</div>
               ))}
            </div>
        </div>
     );
}
 
export default PortfolioAbout;