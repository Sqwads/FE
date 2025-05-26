"use client"
import  React, { Suspense, useState } from 'react';
import { IoShareSocial } from 'react-icons/io5';
import { MdEdit, MdOutlineFileUpload } from 'react-icons/md';
import PortfolioProject from './tabs/projects';
import PortfolioAbout from './tabs/about';
import ProjectDetails from './tabs/project-details';
import { userWrapper } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import { useSearchParams } from 'next/navigation';
import { formatTextToSentenceCase } from '@/common';
import toast from 'react-hot-toast';



const Portfolio = ({
    isPublic = false
}:{
    isPublic?: boolean;
}) => {

    const searchParams = useSearchParams()
    const [currentTab, setCurrentTab] = useState('Project');
    const [detailsMode, setDetailsMode] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const userId = searchParams.get('userId');

    const { user } = userWrapper((state: any) => ({
        user: state.user,
    }));

    const { data: projectResponse, isLoading: projectIsLoading } = useQuery({ 
          queryFn: () => instance.get('/project/all', {
        params: { 
            userId: user?._id || userId,
            type: 'portfolio',
        },
    }), 
        queryKey: ['projects'],
        enabled: !!user?._id || !!userId
    });

     const {data:userData} = useQuery({
        queryFn: ()=>instance.get(`/user/${userId}`),
        queryKey: ['user', userId],
        enabled: !!userId
    })

    const fetchedUser = userData?.data?.profile

    const handleProjectSelect = (project: any) => {
        setSelectedProject(project);     
        setDetailsMode(true);
    };


    const copyText = ()=>{
        const text = `https://sqwads-dev.vercel.app/project-public?userId=${user?._id}`
        console.log(text)
        navigator.clipboard.writeText(text);
        toast.success('Link to project copied')
    }

    return ( 
        <div className='w-full pb-20'>

            
           {!detailsMode && 
            <>
             <div className="bg-[#F5F5F5] h-48 flex flex-col items-center justify-center">
               {!isPublic &&
               <>
                <div className="h-14 cursor-not-allowed border w-14 bg-[#E9E9E9] rounded-full flex items-center justify-center">
                    <MdOutlineFileUpload size={22} />
                </div>
                <div className="font-semibold text-sm">Upload a cover image</div>
               </>
               }
            </div>

            <div className="lg:px-10 px-4">
                <div className="lg:flex  py-5 ">
                    <img src="/images/profile.jpg" className='lg:h-32 lg:w-32 h-24 w-24 object-cover rounded-full border mt-[-70px]' alt="" />
                    <div className='flex-1 ml-5 lg:mt-0 mt-3 lg:mb-0 lg:mb-4 mb-6'>
                        <div className="text-xl font-medium mb-">{userId ? fetchedUser?.firstName: user?.firstName } {userId ? fetchedUser?.lastName: user?.lastName }</div>
                        <div className=" text-[#16181BB2] ">
                            {userId ? 
                            formatTextToSentenceCase(fetchedUser?.skills_of_interest[0] || ''):
                            formatTextToSentenceCase( user?.skills_of_interest[0] || '') 
                            }.
                        </div>
                    </div>

                    {!isPublic && 
                    <>
                    <div className='flex items-end'>
                        <button className='bg-[#EFF3FF] border lg:text-base cursor-not-allowed text-sm border-[#001D69] flex items-center  text-[#001D69] px-4 py-2 rounded-md mr-3'> <MdEdit className='mr-2' color='#001D69' /> Edit Profile</button>
                        <button onClick={copyText} className='px-4 py-2 rounded-md lg:text-base text-sm bg-[#001D69] flex items-center text-white'><IoShareSocial className='mr-2' color='white' /> Share Portfolio</button>
                         {/* <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=https://sqwads-dev.vercel.app/projects/68334f99a3584c928cc6637d`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >share</a> */}
                    </div>
                    </>
                    }
                </div>

                <div className='border-b lg:mt-6 flex gap-x-5'>
                    <div 
                        className={`${currentTab=='Project' ? 'border-b-2 py-1  font-medium border-[#001D69] text-[#001D69]':'text-[#16181B80]'} font-normal cursor-pointer py-1 px-3 `}
                        onClick={()=>setCurrentTab('Project')}>
                        Project
                    </div>

                    <div 
                        className={`${currentTab=='About' ? 'border-b-2 py-1  font-medium border-[#001D69] text-[#001D69]':'text-[#16181B80]'} font-normal cursor-pointer py-1 px-3 `}
                        onClick={()=>setCurrentTab('About')}
                    >
                        About
                    </div>
                </div>
                
               <div>
                    {currentTab=='Project' && <PortfolioProject projects={projectResponse?.data?.projects} onProjectSelect={handleProjectSelect} /> }
                    {currentTab=='About' && 
                    <PortfolioAbout 
                        user={
                            userId ? 
                            {
                                ...fetchedUser,
                                bio: `I am ${fetchedUser?.firstName} ${fetchedUser?.lastName}, a passionate and dedicated individual with a strong interest in ${formatTextToSentenceCase(fetchedUser?.skills_of_interest?.join(', ') || '')}. With a keen focus on ${formatTextToSentenceCase(fetchedUser?.topics_of_interest?.join(', ') || '')}, I am committed to continuous learning and growth in the tech industry. My objectives include finding exciting projects and building a robust portfolio that showcases my skills and achievements. I am always eager to collaborate, innovate, and contribute to impactful solutions.`
                            } : 
                            {
                                ...user,
                                bio: `I am ${user?.firstName} ${user?.lastName}, a passionate and dedicated individual with a strong interest in ${formatTextToSentenceCase(user?.skills_of_interest?.join(', ') || '')}. With a keen focus on ${formatTextToSentenceCase(user?.topics_of_interest?.join(', ') || '')}, I am committed to continuous learning and growth in the tech industry. My objectives include finding exciting projects and building a robust portfolio that showcases my skills and achievements. I am always eager to collaborate, innovate, and contribute to impactful solutions.`
                            }
                        }
                    /> 
                    }
               </div>
            </div>
            </>
           }

           {
            detailsMode && <ProjectDetails project={selectedProject} onBackToProjects={()=>setDetailsMode(false)} />
           }
        </div>
    );
}

const PortfolioWrapper = ({isPublic}:any)=>{
    return (
        <Suspense>
            <Portfolio isPublic={isPublic} />
        </Suspense>
    )
}
 
export default PortfolioWrapper;