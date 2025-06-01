'use client';

import React, { useState } from 'react';
import { FiUsers, FiClock, FiUserCheck, FiCalendar, FiFilter, FiMoreVertical } from 'react-icons/fi';
import KPICard from './components/KPICard';
import SearchBar from './components/SearchBar';
import FilterButton from './components/FilterButton';
import MentorTable from './components/MentorTable';
import Pagination from './components/Pagination';
import { Mentor } from './components/MentorTable';

const MentorDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSuspendMentor = (mentorId: string) => {
    console.log(`Toggling mentor status for mentor ID: ${mentorId}`);
    // Implement actual suspension logic here
  };
  // Sample data for KPI cards
  const kpiData = [
    {
      title: 'All Mentors',
      value: 32,
      change: { value: 13, isIncrease: true },
      period: 'last week',
      iconBgColor: 'bg-indigo-100',
      icon: <FiUsers className="h-5 w-5 text-indigo-600" />
    },
    {
      title: 'Mentorship Minutes',
      value: 4950,
      change: { value: 0.8, isIncrease: false },
      period: 'last week',
      iconBgColor: 'bg-blue-100',
      icon: <FiClock className="h-5 w-5 text-blue-600" />
    },
    {
      title: 'Active Mentors',
      value: 30,
      change: { value: 13, isIncrease: true },
      period: 'last week',
      iconBgColor: 'bg-purple-100',
      icon: <FiUserCheck className="h-5 w-5 text-purple-600" />
    },
    {
      title: 'Upcoming Sessions',
      value: 60,
      change: { value: 3, isIncrease: false },
      period: 'last week',
      iconBgColor: 'bg-red-100',
      icon: <FiCalendar className="h-5 w-5 text-red-600" />
    }
  ];

  // Sample data for mentors table
  const mentorsData: Mentor[] = [
    {
      id: '1',
      name: 'Nnenna Oyekachi',
      initials: 'NO',
      avatarColor: 'blue',
      domain: 'Product Design',
      email: 'noyekachi@gmail.com',
      sessions: 2,
      lastActive: 'Yesterday, 05:25pm',
      status: 'ACTIVE',
      dateJoined: 'March 4, 2024'
    },
    {
      id: '2',
      name: 'Usman Sani',
      initials: 'US',
      avatarColor: 'blue',
      domain: 'Front End Dev.',
      email: 'usani@gmail.com',
      sessions: 1,
      lastActive: 'A day ago',
      status: 'ACTIVE',
      dateJoined: 'March 4, 2024'
    },
    {
      id: '3',
      name: 'Usman Sani',
      initials: 'US',
      avatarColor: 'blue',
      domain: 'Front End Dev.',
      email: 'usani@gmail.com',
      sessions: 1,
      lastActive: 'A day ago',
      status: 'ACTIVE',
      dateJoined: 'March 4, 2024'
    },
    {
      id: '4',
      name: 'Usman Sani',
      initials: 'US',
      avatarColor: 'blue',
      domain: 'Front End Dev.',
      email: 'usani@gmail.com',
      sessions: 1,
      lastActive: 'A day ago',
      status: 'ACTIVE',
      dateJoined: 'March 4, 2024'
    },
    {
      id: '5',
      name: 'Usman Sani',
      initials: 'US',
      avatarColor: 'blue',
      domain: 'Front End Dev.',
      email: 'usani@gmail.com',
      sessions: 1,
      lastActive: 'A day ago',
      status: 'ACTIVE',
      dateJoined: 'March 4, 2024'
    },
    {
      id: '6',
      name: 'Usman Sani',
      initials: 'US',
      avatarColor: 'blue',
      domain: 'Front End Dev.',
      email: 'usani@gmail.com',
      sessions: 1,
      lastActive: 'A day ago',
      status: 'ACTIVE',
      dateJoined: 'March 4, 2024'
    },
    {
      id: '7',
      name: 'Usman Sani',
      initials: 'US',
      avatarColor: 'blue',
      domain: 'Front End Dev.',
      email: 'usani@gmail.com',
      sessions: 1,
      lastActive: 'A day ago',
      status: 'ACTIVE',
      dateJoined: 'March 4, 2024'
    },
    {
      id: '8',
      name: 'Usman Sani',
      initials: 'US',
      avatarColor: 'blue',
      domain: 'Front End Dev.',
      email: 'usani@gmail.com',
      sessions: 1,
      lastActive: 'A day ago',
      status: 'ACTIVE',
      dateJoined: 'March 4, 2024'
    },
    {
      id: '9',
      name: 'Usman Sani',
      initials: 'US',
      avatarColor: 'blue',
      domain: 'Front End Dev.',
      email: 'usani@gmail.com',
      sessions: 1,
      lastActive: 'A day ago',
      status: 'ACTIVE',
      dateJoined: 'March 4, 2024'
    },
    {
      id: '10',
      name: 'Usman Sani',
      initials: 'US',
      avatarColor: 'blue',
      domain: 'Front End Dev.',
      email: 'usani@gmail.com',
      sessions: 1,
      lastActive: 'A day ago',
      status: 'ACTIVE',
      dateJoined: 'March 4, 2024'
    }
  ];

  // Filter mentors based on search query
  const filteredMentors = mentorsData.filter(mentor => 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Handle filter button click
  const handleFilterClick = () => {
    // Implement filter functionality
    console.log('Filter button clicked');
  };

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Items per page
  const itemsPerPage = 15;
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMentors = filteredMentors.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="py-7 px-5 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-medium text-[#0234B8]">Sqwads Mentors</h1>
        <p className="text-gray-600">An Overview of all sqwads mentors</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            period={kpi.period}
            iconBgColor={kpi.iconBgColor}
            icon={kpi.icon}
          />
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-64">
          <SearchBar placeholder="Search" onSearch={handleSearch} />
        </div>
        <div className="flex items-center justify-between w-full md:w-auto">
          <FilterButton onClick={handleFilterClick} />
          <div className="ml-4">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredMentors.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Mentors Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
      <MentorTable
          mentors={currentMentors}
          onSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSuspendMentor={handleSuspendMentor}
        />

      </div>
    </div>
  );
};

export default MentorDashboard;
