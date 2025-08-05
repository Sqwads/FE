import  React from 'react';
import Portfolio from '../(application)/portfolio/page';

const ProjectPublic = () => {
    return ( 
        <div className='bg-[#F5F5F5] '> 
            <div className="max-w-[900px] mx-auto  bg-white">
                <Portfolio isPublic />
            </div>
        </div>
     );
}
 
export default ProjectPublic;
