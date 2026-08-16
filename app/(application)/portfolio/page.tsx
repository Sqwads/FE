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

    const user = userWrapper((state: any) => state.user);

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
        queryKey: ['projects', user?._id || userId],
        enabled: !!user?._id || !!userId
    });

    const {data:userData} = useQuery({
        queryFn: ()=>instance.get(`/user/${userId}`),
        queryKey: ['user', userId],
        enabled: !!userId
    })

    const {data:xpData} = useQuery({
        queryFn: ()=>instance.get(`/user/${userId || user?._id}/xp-card`),
        queryKey: ['user-xp', userId || user?._id],
        enabled: !!userId || !!user?._id
    })

    const fetchedUser = userData?.data?.profile
    const xpSummary = xpData?.data?.data

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
        <div className='bg-[#F8FAFC] min-h-screen pb-20'>
            {!detailsMode && (
                <>
                    {/* Hero Cover Section */}
                    <div 
                        className="relative h-64 md:h-96 w-full flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 z-0">
                             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8FAFC] z-10" style={{ height: '100%', top: '0', background: 'linear-gradient(to bottom, transparent 60%, #F8FAFC 100%)' }}></div>
                             <div 
                                className="w-full h-full"
                                style={{
                                    background: profileImageSrc || currentUser?.coverImage 
                                        ? `url(${profileImageSrc || currentUser?.coverImage}) center/cover no-repeat`
                                        : 'linear-gradient(135deg, #4F46E5 0%, #001D69 100%)',
                                }}
                             />
                        </div>

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
                                className="absolute top-6 right-6 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-lg border border-white/20 text-sm font-medium"
                            >
                                <MdEdit size={18} /> Update Cover
                            </button>
                        )}
                    </div>

                    {/* Main Content Container */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32 md:-mt-40">
                        <div className="flex flex-col lg:flex-row gap-6">
                            
                            {/* Left Column: Profile Card */}
                            <div className="lg:w-1/3 flex flex-col gap-6">
                                {/* Profile Info Card */}
                                <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-6 border border-gray-100">
                                    <div className="relative flex justify-center -mt-20 mb-4">
                                        <div className="relative">
                                            <img 
                                                src={currentUser?.profileImage || "/images/profile.jpg"} 
                                                className='w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-white shadow-2xl' 
                                                alt="" 
                                            />
                                            {currentUser?.availableForProjects && (
                                                <div className="absolute -bottom-2 right-2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-emerald-500/30 border-2 border-white">
                                                    <MdStar size={14} /> Available
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-center mb-6">
                                        <h1 className="text-2xl font-bold text-gray-900">
                                            {currentUser?.firstName} {currentUser?.lastName}
                                        </h1>
                                        <p className="text-[#001D69] font-medium mt-1">
                                            {currentUser?.title || 'Professional'}
                                        </p>
                                        
                                        {currentUser?.location && (
                                            <div className="flex items-center justify-center gap-1.5 text-gray-500 mt-2 text-sm font-medium">
                                                <MdLocationOn size={16} className="text-[#001D69]" />
                                                <span>{currentUser.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    {!isPublic && (
                                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                            <button 
                                                onClick={copyText}
                                                className='flex-1 bg-[#001D69] hover:bg-blue-900 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20 font-medium !text-sm'
                                            >
                                                <IoShareSocial size={15} /> Share Profile
                                            </button>
                                            <button 
                                                onClick={()=>router.push('/settings')}
                                                className='flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all border border-gray-200 font-medium !text-sm'
                                            >
                                                <MdEdit size={15} /> Edit
                                            </button>
                                        </div>
                                    )}

                                    {/* XP Mini Summary */}
                                    {xpSummary && (
                                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 mb-6 border border-indigo-100/50">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-[#001D69] flex items-center justify-center text-white font-bold text-xs shadow-md">
                                                        XP
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-indigo-900/70 font-semibold uppercase tracking-wider">Current Level</div>
                                                        <div className="font-bold text-[#001D69] leading-tight">{xpSummary.level}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-black text-xl text-[#001D69]">{xpSummary.totalXp.toLocaleString()}</div>
                                                    <div className="text-xs text-indigo-900/70 font-semibold">XP Earned</div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-indigo-200/50 rounded-full h-1.5 mb-1.5 overflow-hidden">
                                                <div className="bg-[#001D69] h-1.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${xpSummary.progressPct}%` }}></div>
                                            </div>
                                            <div className="text-[10px] text-right font-medium text-indigo-900/60 uppercase">
                                                {xpSummary.nextLevelXp - xpSummary.totalXp} XP to next level
                                            </div>
                                            
                                            <div className="flex divide-x divide-indigo-200 mt-4 pt-4 border-t border-indigo-200/50">
                                                <div className="flex-1 text-center">
                                                    <div className="text-lg font-bold text-[#001D69]">{xpSummary.reliabilityScore ? `${xpSummary.reliabilityScore}%` : '—'}</div>
                                                    <div className="text-[10px] font-semibold text-indigo-900/70 uppercase">Reliability</div>
                                                </div>
                                                <div className="flex-1 text-center">
                                                    <div className="text-lg font-bold text-[#001D69]">{xpSummary.qualityRating || '—'}</div>
                                                    <div className="text-[10px] font-semibold text-indigo-900/70 uppercase">Quality (5.0)</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                                            <div className="text-2xl font-black text-gray-900">{projects.length}</div>
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Projects</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                                            <div className="text-2xl font-black text-gray-900">{currentUser?.experiences?.length || 0}</div>
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Experience</div>
                                        </div>
                                    </div>

                                    {/* Skills Section */}
                                    {currentUser?.skills_of_interest?.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Top Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {currentUser?.skills_of_interest?.slice(0, 6).map((skill: string, idx: number) => (
                                                    <span 
                                                        key={idx}
                                                        className="bg-blue-50 text-[#001D69] px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-100"
                                                    >
                                                        {formatTextToSentenceCase(skill)}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Content Tabs */}
                            <div className="lg:w-2/3 flex flex-col gap-6 mt-6 lg:mt-0">
                                
                                {/* Bio Card (Always visible on desktop, tab on mobile) */}
                                {currentUser?.bio && (
                                    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 hidden lg:block">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-[#001D69] rounded-full"></span>
                                            About Me
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {currentUser.bio}
                                        </p>
                                    </div>
                                )}

                                {/* Main Tab Content */}
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
                                    {/* Tab Navigation */}
                                    <div className="flex border-b border-gray-100">
                                        <button
                                            onClick={()=>setCurrentTab('Project')}
                                            className={`flex-1 py-5 font-bold text-sm uppercase tracking-wider transition-all relative ${
                                                currentTab === 'Project' 
                                                    ? 'text-[#001D69]' 
                                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            Portfolio ({projects.length})
                                            {currentTab === 'Project' && (
                                                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#001D69] rounded-t-full"></div>
                                            )}
                                        </button>
                                        <button
                                            onClick={()=>setCurrentTab('About')}
                                            className={`flex-1 py-5 font-bold text-sm uppercase tracking-wider transition-all relative lg:hidden ${
                                                currentTab === 'About' 
                                                    ? 'text-[#001D69]' 
                                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            About
                                            {currentTab === 'About' && (
                                                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#001D69] rounded-t-full"></div>
                                            )}
                                        </button>
                                    </div>

                                    {/* Tab Body */}
                                    <div className="p-6">
                                        {currentTab === 'Project' && (
                                            <PortfolioProject projects={projects} onProjectSelect={handleProjectSelect} />
                                        )}
                                        {currentTab === 'About' && (
                                            <div className="lg:hidden">
                                                <PortfolioAbout user={currentUser} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
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
