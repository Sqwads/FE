import  React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

const ProjectDetails = (
    {
        onBackToProjects,
        project
    }:{
        onBackToProjects: () => void;
        project?: any;
    }
) => {
    return ( 
        <div className='lg:px-10 px-3 py-14'>
            <div className="flex justify-between">
                <div className="font-medium lg:text-2xl text-xl">{project?.name}</div>
                <div>
                    <button onClick={onBackToProjects} className='bg-[#001D69] lg:text-base text-sm text-white rounded-md flex items-center gap-x-2 py-2 px-3'>Go to Project <FaLongArrowAltRight /></button>
                </div>
            </div>

            <div className='h-[400px] lg:mt-5 mt-10'>
                <img src={project?.coverImage || "/images/proj-placeholder.jpg"} className='h-full rounded-lg w-full object-cover' alt="" />
            </div>
        </div>
     );
}
 
export default ProjectDetails;
