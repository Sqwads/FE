import Image from 'next/image';
import CustomProgress from '../../../../app/components/charts/progressbar';
import { trimSentence } from '../../../../src/common';
import { customColors } from '../../../../src/common/data';
import moment from 'moment';
import  React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';


const ProjectCard = ({
    project
}: any) => {


     const tools = project?.skills?.flatMap((item:any)=> item?.tools)
     
     const getTimeDifference = (dateString: string) => {
        const givenDate = moment(dateString); // Convert to Moment.js date
        const today = moment(); // Get today's date
    
        const isFuture = givenDate.isAfter(today, "day"); // Check if the date is in the future
    
        const monthsDiff = Math.abs(today.diff(givenDate, "months"));
        const weeksDiff = Math.abs(today.diff(givenDate, "weeks"));
        const daysDiff = Math.abs(today.diff(givenDate, "days"));
    
        let timeDifference;
        
        if (monthsDiff >= 1) {
            timeDifference = `${monthsDiff} month${monthsDiff > 1 ? "s" : ""}`;
        } else if (weeksDiff >= 1) {
            timeDifference = `${weeksDiff} week${weeksDiff > 1 ? "s" : ""}`;
        } else {
            timeDifference = `${daysDiff} day${daysDiff > 1 ? "s" : ""}`;
        }
    
        return isFuture ? `${timeDifference} to go` : `${timeDifference} ago`;
    };
     
    return ( 
        <div className='border rounded-lg'>
            <Image src={project?.coverImage? project?.coverImage: "/images/signup_bg.png" }className='w-full object-cover h-32 rounded-lg border' alt="project" />
            <div className="py-5 px-3 border-b">
                <div className="text-lg font-semibold mb-2">{project?.name}</div>
                <div className="text-sm text-[#16181BB2] mb-7 min-h-10">
                    {trimSentence(project?.overview)}
                </div>
                <div className="flex flex-wrap gap-y-3 gap-x-2 mb-4">
                    {tools?.map((item: string, idx: number)=>
                        <button 
                            className={`px-2 py-1 text-xs rounded-md `}
                            key={idx}
                            style={{
                                background: customColors[idx % customColors.length].light,
                                color:  customColors[idx % customColors.length].deep,
                                border: `1px solid ${ customColors[idx % customColors.length].deep}`
                            }}
                        >
                            {item}
                        </button>
                    )}
                  
                </div>

                <div className="">
                    <CustomProgress
                        value={project?.completionLeve}
                        label='Completion Level'
                        bgColor={'#F53225'}
                    />
                </div>
            </div>
            <div className="py-3 px-3 flex justify-between">
                <div className="text-[#0234B8]  cursor-pointer flex font-medium">Resume Work <MdKeyboardArrowRight size={25} /></div>
                <div className="text-sm">{getTimeDifference(project?.endDate)} </div>
            </div>
        </div>
     );
}
 
export default ProjectCard;