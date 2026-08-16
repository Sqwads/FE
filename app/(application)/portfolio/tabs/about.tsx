import React from 'react';


const PortfolioAbout = ({
    user
}:{
    user?: any;
}) => {
    return ( 
        <div className='py-6'>
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#001D69] rounded-full"></span>
                    Professional Overview
                </h3>
                <div className='text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-2xl border border-gray-100'>
                    {user?.bio ? user.bio : "No bio has been added yet. This user is keeping things mysterious!"}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#001D69] rounded-full"></span>
                    Skills & Expertise
                </h3>
                {user?.skills_of_interest?.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                    {user?.skills_of_interest?.map((skill:any, index:number) => (
                        <div key={index} className="bg-white border border-gray-200 text-gray-700 font-medium py-1.5 px-4 rounded-xl shadow-sm hover:border-[#001D69] hover:text-[#001D69] transition-colors">
                            {skill}
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No skills listed yet.</p>
                )}
            </div>
        </div>
     );
}
 
export default PortfolioAbout;