"use client"
import  React, { Suspense, useRef, useState } from 'react';
import { IoShareSocial } from 'react-icons/io5';
import { MdEdit, MdOutlineFileUpload, MdLocationOn, MdEmail, MdWork, MdStar } from 'react-icons/md';
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
    const [currentTab, setCurrentTab] = useState('Project');
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
        navigator.clipboard.writeText(text);
        toast.success('Link to portfolio copied')
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
        formData.append('file', file)
        formData.append('fileIsCoverImage', 'true' )
        mutate(formData)
    };

    const currentUser = userId ? fetchedUser: user
    const projects = projectResponse?.data?.projects || []

    return ( 
        <div className='bg-gray-50 min-h-screen'>
            {!detailsMode && (
                <>
                    {/* Cover Image Section */}
                    <div 
                        className="relative h-48 md:h-80 lg:h-64 flex items-center justify-center overflow-hidden"
                        style={{
                            background: profileImageSrc || currentUser?.coverImage 
                                ? `url(${profileImageSrc || currentUser?.coverImage}) center/cover no-repeat`
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                    >
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
                        {!isPublic && (
                            <button 
                                onClick={handleImageClick}
                                className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                            >
                                <MdEdit size={18} /> Edit Cover
                            </button>
                        )}
                    </div>

                    {/* Profile Section */}
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Profile Image */}
                                <div className="relative flex-shrink-0">
                                    <img 
                                        src={currentUser?.profileImage || "/images/profile.jpg"} 
                                        className='w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl border-4 border-white shadow-lg' 
                                        alt="" 
                                    />
                                    {currentUser?.availableForProjects && (
                                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                            <MdStar size={14} /> Available
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <div className="flex-1 w-full">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                                {currentUser?.firstName} {currentUser?.lastName}
                                            </h1>
                                            <p className="text-lg text-[#667eea] font-medium mt-1">
                                                {currentUser?.title || 'Professional'}
                                            </p>
                                        </div>
                                        {!isPublic && (
                                            <div className="flex gap-3">
                                                <button 
                                                    onClick={()=>router.push('/settings')}
                                                    className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-all'
                                                >
                                                    <MdEdit size={18} /> Edit Profile
                                                </button>
                                                <button 
                                                    onClick={copyText}
                                                    className='bg-[#667eea] hover:bg-[#764ba2] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all'
                                                >
                                                    <IoShareSocial size={18} /> Share
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {currentUser?.skills_of_interest?.slice(0, 5).map((skill: string, idx: number) => (
                                            <span 
                                                key={idx}
                                                className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200"
                                            >
                                                {formatTextToSentenceCase(skill)}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
                                            <div className="text-sm text-gray-500">Projects</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{currentUser?.experiences?.length || 0}</div>
                                            <div className="text-sm text-gray-500">Experience</div>
                                        </div>
                                        {currentUser?.location && (
                                            <div className="flex items-center gap-1 text-gray-500">
                                                <MdLocationOn size={18} />
                                                <span className="text-sm">{currentUser.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bio Preview */}
                            {currentUser?.bio && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <p className="text-gray-600 line-clamp-2">
                                        {currentUser.bio}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Tab Navigation */}
                        <div className="mt-8">
                            <div className="flex gap-1 bg-gray-200/50 p-1 rounded-xl w-fit">
                               
                                <button
                                    onClick={()=>setCurrentTab('Project')}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                        currentTab === 'Project' 
                                            ? 'bg-white text-gray-900 shadow-lg' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Projects ({projects.length})
                                </button>
                                 <button
                                    onClick={()=>setCurrentTab('About')}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                        currentTab === 'About' 
                                            ? 'bg-white text-gray-900 shadow-lg' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    About
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-6 pb-12">
                            {currentTab === 'Project' && (
                                <PortfolioProject projects={projects} onProjectSelect={handleProjectSelect} />
                            )}
                            {currentTab === 'About' && (
                                <PortfolioAbout user={currentUser} />
                            )}
                        </div>
                    </div>
                </>
            )}

            {detailsMode && <ProjectDetails project={selectedProject} onBackToProjects={()=>setDetailsMode(false)} />}
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
