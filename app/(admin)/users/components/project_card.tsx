import CustomProgress from '@/app/components/charts/progressbar';
import  React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';


const ProjectCard = () => {
    return ( 
        <div className='border rounded-lg'>
            <img src="/images/portfolio.png" className='w-full object-cover h-32 rounded-lg border' alt="project" />
            <div className="py-5 px-3 border-b">
                <div className="text-lg font-semibold mb-2">Data Insight Dashboard</div>
                <div className="text-sm text-[#16181BB2] mb-7">
                    Design and develop a user-friendly dashboard that effectively visualizes trends and key metrics from various datasets.
                </div>
                <div className="flex gap-x-4 mb-4">
                    <button className={`px-2 py-1 text-xs rounded-md border border-[#EE46BC] bg-[#FFF2FB] text-[#EE46BC]`}>HTML</button>
                    <button className={`px-2 py-1 text-xs rounded-md border bg-[#EEFFF7] text-[#01C569] border-[#01C569]`}>CSS</button>
                    <button className={`px-2 py-1 text-xs rounded-md border bg-[#EBF9FF] text-[#36BFFA] border-[#36BFFA]`}>Javascript</button>
                    <button className={`px-2 py-1 text-xs rounded-md border bg-[#ECEEFF] text-[#6172F3] border-[#6172F3]`}>API</button>
                </div>

                <div className="">
                    <CustomProgress
                        value={20}
                        label='Completion Level'
                        bgColor={'#F53225'}
                    />
                </div>
            </div>
            <div className="py-3 px-3 flex justify-between">
                <div className="text-[#0234B8]  cursor-pointer flex font-medium">Resume Work <MdKeyboardArrowRight size={25} /></div>
                <div className="text-sm">4 days to go</div>
            </div>
        </div>
     );
}
 
export default ProjectCard;