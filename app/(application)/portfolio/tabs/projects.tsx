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
                    description="It looks like you haven't wrapped up any projects yet. Complete a project to start building a portfolio that shows off your skills and hard work!"
                />
            </div>
        }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project:any, index:number) => (
                <div 
                    key={index} 
                    onClick={()=>onProjectSelect(project)}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                >
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={project?.coverImage || "/images/proj-placeholder.jpg"} 
                            className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out' 
                            alt="" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001D69]/90 via-[#001D69]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                            <span className="text-sm font-bold tracking-wider uppercase">View Project</span>
                            <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold">Completed</span>
                        </div>
                    </div>
                    <div className="p-5 border-t border-gray-100">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#001D69] transition-colors line-clamp-1">
                            {project?.name || 'Untitled Project'}
                        </h3>
                        <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                            {project?.description || 'No description available'}
                        </p>
                        {project?.skills_used?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
                                {project?.skills_used?.slice(0, 3).map((skill: string, idx: number) => (
                                    <span 
                                        key={idx}
                                        className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#001D69] px-2 py-1 rounded"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {(project?.skills_used?.length || 0) > 3 && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        +{project.skills_used.length - 3}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}
 
export default PortfolioProject;
