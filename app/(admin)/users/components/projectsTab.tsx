import  React from 'react';
import ProjectCard from './project_card';
// import { FiShoppingCart } from 'react-icons/fi';

const ProjectTab = () => {
    return ( 
       <div>
            {/* <div>
                <div className="h-64 flex items-center justify-center flex-col">
                    <FiShoppingCart size={80} color="lightgray" className="mb-7" />
                    <div className="font-semibold text-xl text-[lightgray]">No  Project Yet</div>
                </div>
            </div> */}
            <div className="grid xl:grid-cols-2 gap-x-5 gap-y-5 py-7">
                <div>
                    <ProjectCard/>
                </div>
                <div>
                    <ProjectCard/>
                </div>
            </div>
       </div>
     );
}
 
export default ProjectTab;
