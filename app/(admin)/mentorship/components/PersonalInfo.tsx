'use client';

import React from 'react';
import { FiLinkedin, FiFacebook, FiTwitter } from 'react-icons/fi';

interface PersonalInfoProps {
  fullName: string;
  email: string;
  role: string;
  organization: string;
  bio: string;
  socialLinks?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  fullName,
  email,
  role,
  organization,
  bio,
  socialLinks
}) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Full Name</label>
          <input 
            type="text" 
            value={fullName} 
            readOnly 
            className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input 
            type="email" 
            value={email} 
            readOnly 
            className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Role</label>
          <input 
            type="text" 
            value={role} 
            readOnly 
            className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Organization</label>
          <input 
            type="text" 
            value={organization} 
            readOnly 
            className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Bio</label>
          <textarea 
            value={bio} 
            readOnly 
            rows={6}
            className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
          />
        </div>
        
        {socialLinks && (
          <div>
            <label className="block text-sm text-gray-600 mb-2">Social Links</label>
            <div className="flex space-x-2">
              {socialLinks.linkedin && (
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <FiLinkedin />
                </a>
              )}
              {socialLinks.facebook && (
                <a 
                  href={socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <FiFacebook />
                </a>
              )}
              {socialLinks.twitter && (
                <a 
                  href={socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <FiTwitter />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
