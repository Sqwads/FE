"use client"
import React, { useState } from 'react';
import BasicInformation from './tabs/basicDetails';
import SkillsExperience from './tabs/skills';
import SocialProfiles from './tabs/social';
import Security from './tabs/security';
import { useRef } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { instance } from '@/api/instance';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';


const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('basic');
  const [file, setFile] = useState<any>(null);
  const [profileImageSrc, setProfileImageSrc] = useState<any>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

const handleImageClick = () => {
    imageInputRef.current?.click();
};

    const handleImageUpload = (file: File) => {
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
        setProfileImageSrc(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => instance.patch('/user', data),
        mutationKey: ['user', 'update'],
        onSuccess() {
            toast.success("Changes Saved !!!");
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message || 'Action Failed');
        },
    });

    

    const handleSubmit = (values: any) => {
        const formData = new FormData()
        formData.append('file', file)
        mutate(formData)
    };

    const sidebarItems = [
        { id: 'basic', label: 'Basic Information' },
        { id: 'skills', label: 'Skills & Experience' },
        { id: 'social', label: 'Social Profiles' },
        { id: 'security', label: 'Security' }
    ];

    const {data:response, isPending: userInfoIsLoading} = useQuery({
        queryFn: ()=>instance.get('/user/profile'),
        queryKey: ['user-profile'],
    });

    const user = response?.data


  return (
    <div className="min-h-screen bg-background py-14">
        {/* Profile Header */}
      <div className='px-10'>
        <h2 className="text-lg text-[#001D69] font-semibold mb-6 text-card-foreground">USER PROFILE</h2>
        <div className="flex items-center mb-8">
        
        <div className="relative">
            <img
                src={profileImageSrc || user?.profileImage || '/images/profile.jpg'}
                alt="Profile"
                onClick={handleImageClick}
                className="w-20 border cursor-pointer h-20 rounded-full object-cover"
            />

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
            
            <div onClick={handleImageClick} className="absolute cursor-pointer -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
            <MdModeEdit size={12} color='white' />
            </div>
        </div>
        <div className="ml-4">
            <h1 className="text-2xl font-bold text-card-foreground">{user?.firstName} {user?.lastName}</h1>
            <p className="text-sm text-[#16181B]">{user?.title || 'N/A'}</p>
            {file && 
            <button onClick={handleSubmit} disabled={isPending} className="px-3 disabled:opacity-50 disabled:cursor-not-allowed py-1 ml-3 text-sm bg-[gray] mt-3 text-white rounded-md">
                {isPending?'Saving...':'Save'}
            </button>}
        </div>
        </div>
      </div>

      <div className="lg:flex">
        {/* Sidebar */}
        <div className="lg:w-64   bg-card  p-6">
          
          <nav className="space-y-2  lg:block flex flex-wrap gap-x-3 items-center">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`lg:w-full text-left border lg:border-0 px-2 lg:px-6 py-2 flex items-center rounded-md text-sm transition-colors ${
                  activeSection === item.id
                    ? 'font-semibold text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <span
                  className={
                    activeSection === item.id
                      ? 'lg:underline underline-offset-2'
                      : ''
                  }
                >
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1  lg:px-8">
          <div className="max-w-4xl  ">
            <div className="bg-card rounded-lg shadow-sm  px-8">
             

             
                {activeSection === 'basic' && (
                  <BasicInformation user={user} />
                )}
                {activeSection === 'skills' && <SkillsExperience user={user}  />}
                {activeSection === 'social' && <SocialProfiles user={user} />}
                {activeSection === 'security' && <Security  />}

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;