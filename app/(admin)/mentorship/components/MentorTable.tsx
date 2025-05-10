'use client';

import React from 'react';
import { FiMoreVertical, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { Menu } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MentorTableProps {
  mentors: Mentor[];
  onSort: (column: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSuspendMentor: (mentorId: string) => void;
}

export interface Mentor {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  domain: string;
  email: string;
  sessions: number;
  lastActive: string;
  status: 'ACTIVE' | 'INACTIVE';
  dateJoined: string;
}

const MentorTable: React.FC<MentorTableProps> = ({
  mentors,
  onSort,
  sortColumn,
  sortDirection = 'asc',
  onSuspendMentor
}) => {
  const router = useRouter();

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? (
      <FiArrowUp className="w-3 h-3 ml-1" />
    ) : (
      <FiArrowDown className="w-3 h-3 ml-1" />
    );
  };

  const handleViewMentor = (mentorId: string) => {
    router.push(`/mentorship/sessions/${mentorId}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-white uppercase bg-blue-900">
          <tr>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => onSort('name')}>
              <div className="flex items-center">
                Name
                {renderSortIcon('name')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => onSort('domain')}>
              <div className="flex items-center">
                Domain
                {renderSortIcon('domain')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => onSort('email')}>
              <div className="flex items-center">
                Email
                {renderSortIcon('email')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => onSort('sessions')}>
              <div className="flex items-center">
                Sessions
                {renderSortIcon('sessions')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => onSort('lastActive')}>
              <div className="flex items-center">
                Last Active
                {renderSortIcon('lastActive')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => onSort('status')}>
              <div className="flex items-center">
                Status
                {renderSortIcon('status')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => onSort('dateJoined')}>
              <div className="flex items-center">
                Date Joined
                {renderSortIcon('dateJoined')}
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor, index) => (
            <tr key={mentor.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white bg-${mentor.avatarColor}-500 mr-3`}>
                  {mentor.initials}
                </div>
                <span className="font-medium">{mentor.name}</span>
              </td>
              <td className="px-6 py-4">{mentor.domain}</td>
              <td className="px-6 py-4">{mentor.email}</td>
              <td className="px-6 py-4">{mentor.sessions}</td>
              <td className="px-6 py-4">{mentor.lastActive}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  mentor.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {mentor.status}
                </span>
              </td>
              <td className="px-6 py-4">{mentor.dateJoined}</td>
              <td className="px-6 py-4 text-right">
                <Menu position="bottom-end" shadow="md" width={200} withinPortal>
                  <Menu.Target>
                    <button className="font-medium text-gray-500 hover:text-gray-900">
                      <FiMoreVertical className="h-5 w-5" />
                    </button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => handleViewMentor(mentor.id)}>
                      View Mentor
                    </Menu.Item>
                    <Menu.Item 
                      color={mentor.status === 'INACTIVE' ? 'blue' : 'red'}
                      onClick={() => onSuspendMentor(mentor.id)}
                    >
                      {mentor.status === 'INACTIVE' ? 'Activate Mentor' : 'Suspend Mentor'}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MentorTable;