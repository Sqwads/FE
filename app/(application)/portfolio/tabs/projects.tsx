import  React from 'react';
import EmptyState from '../../components/EmptyState';


const PortfolioProject = ({
    onProjectSelect,
    projects = []
}:{
    onProjectSelect: (project:any) => void;
    projects?: any[];
}) => {
    return ( 
         <>
        {projects.length < 1 && 
            <div className="mt-5">
                <EmptyState 
                    title="No Completed Projects Yet!" 
                    description="It looks like you haven’t wrapped up any projects yet. Complete a project to start building a portfolio that shows off your skills and hard work!."
                    // actionText="Explore Project"
                    // actionLink="/dashboard"
                />
            </div>
        }
         <div className="lg:mt-14 mt-7 gap-x-4 gap-y-5 grid lg:grid-cols-3">
           {projects.map((project:any, index:number) => (
             <div key={index} onClick={()=>onProjectSelect(project)} className='h-64'>
                <img src={project?.coverImage || "/images/proj-placeholder.jpg"} className='h-full rounded-lg cursor-pointer w-full object-cover' alt="" />
            </div>
           ))}
                   
        </div>
         </>
     );
}
 
export default PortfolioProject;