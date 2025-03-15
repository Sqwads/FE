import  React from 'react';
import ProjectCard from './project_card';
import { FiShoppingCart } from 'react-icons/fi';
// import { FiShoppingCart } from 'react-icons/fi';

const ProjectTab = ({
    projects
}:{
    projects: any[]
}) => {
    return ( 
       <div>
            {projects?.length < 1 &&
            <div>
                <div className="h-64 flex items-center justify-center flex-col">
                    <FiShoppingCart size={80} color="lightgray" className="mb-7" />
                    <div className="font-semibold text-xl text-[lightgray]">No  Project Yet</div>
                </div>
            </div>
            }
            <div className="grid xl:grid-cols-2 gap-x-5 gap-y-5 py-7">
                {projects?.slice(0,2)?.map((item:any, idx:number)=>
                <div key={idx}>
                    <ProjectCard project={item} />
                </div>
                )}
            </div>
       </div>
     );
}
 
export default ProjectTab;
