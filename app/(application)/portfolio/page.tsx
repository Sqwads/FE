"use client"
import  React, { Suspense, useRef, useState } from 'react';
import { IoShareSocial } from 'react-icons/io5';
import { MdEdit, MdOutlineFileUpload } from 'react-icons/md';
import PortfolioProject from './tabs/projects';
import PortfolioAbout from './tabs/about';
import ProjectDetails from './tabs/project-details';
import { userWrapper } from '@/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatTextToSentenceCase } from '@/common';
import toast from 'react-hot-toast';



const Portfolio = ({
    isPublic = false
}:{
    isPublic?: boolean;
}) => {

    const searchParams = useSearchParams()
    const [currentTab, setCurrentTab] = useState('About');
    const [detailsMode, setDetailsMode] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);
     const [file, setFile] = useState<any>(null);
      const [profileImageSrc, setProfileImageSrc] = useState<any>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter()
    const userId = searchParams.get('userId');

    const { user } = userWrapper((state: any) => ({
        user: state.user,
    }));

    const handleImageClick = () => {
        imageInputRef.current?.click();
    };

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

     const handleImageUpload = (file: File) => {
        // console.log(file)
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setProfileImageSrc(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        handleSubmit(file)
    };

    const copyText = ()=>{
        const text = `https://sqwads-dev.vercel.app/project-public?userId=${user?._id}`
        console.log(text)
        navigator.clipboard.writeText(text);
        toast.success('Link to project copied')
    }

    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => instance.patch('/user', data),
        mutationKey: ['user', 'update'],
        onSuccess() {
            toast.success("Image Saved !!!");
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message || 'Failed to Save Image');
        },
    });

    const handleSubmit = (file: File) => {
        const formData = new FormData()
        // console.log(file)
        formData.append('file', file)
        formData.append('fileIsCoverImage', 'true' )
        mutate(formData)
    };

    const currentUser = userId ? fetchedUser: user
    

    return ( 
        <div className='bg-[#F5F5F5] '>
        <div className=' pb-20 bg-white shadow' >

            
           {!detailsMode && 
            <>
            <div 
                className="bg-[#F5F5F5] h-48 flex flex-col items-center justify-center"
                style={{
                    background:'linear-gradient(90deg, #f7cac9 0%, #ede574 100%)',
                    minHeight: 140,
                    alignItems: "center",
                    ...((profileImageSrc || currentUser?.coverImage) && {
                        backgroundImage: `url(${profileImageSrc || currentUser?.coverImage})`,
                        // backgroundPosition: 'center',
                        // backgroundRepeat:'no-repeat',
                        // backgroundSize:'cover'
                    }),
                    
                }} 
            >
               {/* {(!isPublic && !user?.coverImage)&&
               <>
                <div  
                    className="h-14 cursor-not-allowed border w-14 rounded-full flex items-center justify-center">
                    <MdOutlineFileUpload color='gray' size={22} />
                </div>
                <div className="font-semibold text-sm text-[gray] mt-2">Upload a cover image</div>
               </>
               } */}

                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-image-input"
                    onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0]);
                        }
                    }}
                    ref={imageInputRef}
                />

               
            </div>

            <div className="lg:px-10 px-4 border">
                <div className="lg:flex  py-5 ">
                    <img src={currentUser?.profileImage || "/images/profile.jpg"} className='lg:h-32 lg:w-32 h-24 w-24 object-cover rounded-full border mt-[-70px]' alt="" />
                    <div className='flex-1 flex items-center ml-5 lg:mt-0 mt-3 lg:mb-4 mb-6'>
                            <div>
                                <div className="text-xl font-medium mb-">{currentUser?.firstName } {currentUser?.lastName }</div>
                                <div className=" text-[#16181BB2] ">
                                    
                                    {formatTextToSentenceCase(currentUser?.skills_of_interest[0] || '')}
                                    
                               
                                </div>
                                {!isPublic && <div onClick={handleImageClick} className='hidden mt-2 lg:block text-blue-700 text-sm underline cursor-pointer'>Edit Cover Image</div>}
                            </div>
                         {!isPublic &&  <div onClick={handleImageClick} className='ml-5 block lg:hidden  text-blue-700 text-sm underline cursor-pointer'>Edit Cover Image</div>}
                    </div>

                    {!isPublic && 
                    <>
                    <div className='flex items-center '>
                        <button onClick={()=>router.push('/settings')} className='bg-[#EFF3FF] border lg:text-sm text-sm border-[#001D69] flex items-center  text-[#001D69] px-4 py-2 rounded-md mr-3'> <MdEdit className='mr-2' color='#001D69' /> Edit Profile</button>
                        <button onClick={copyText} className='px-4 py-2 rounded-md lg:text-sm text-sm bg-[#001D69] flex items-center text-white'><IoShareSocial className='mr-2' color='white' /> Share Portfolio</button>
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
                        className={`${currentTab=='About' ? 'border-b-2 py-1  font-medium border-[#001D69] text-[#001D69]':'text-[#16181B80]'} font-normal cursor-pointer py-1 px-3 `}
                        onClick={()=>setCurrentTab('About')}
                    >
                        About
                    </div>

                    <div 
                        className={`${currentTab=='Project' ? 'border-b-2 py-1  font-medium border-[#001D69] text-[#001D69]':'text-[#16181B80]'} font-normal cursor-pointer py-1 px-3 `}
                        onClick={()=>setCurrentTab('Project')}>
                        Project
                    </div>

                   
                </div>
                
               <div>
                    {currentTab=='Project' && <PortfolioProject projects={projectResponse?.data?.projects} onProjectSelect={handleProjectSelect} /> }
                    {currentTab=='About' && 
                    <PortfolioAbout 
                            user={{
                                ...currentUser,
                                bio: currentUser?.bio 
                            }}
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