"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userWrapper } from '@/store';
import { FiCompass } from 'react-icons/fi';
import { MdOutlineWavingHand } from 'react-icons/md';

// Import components
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import { instance } from '@/api/instance';
import Preloader from '@/app/components/preloader';

export default function ExploreProjectsPage() {
    const { user } = userWrapper((state: any) => ({
        user: state.user,
    }));

    const [currentPage, setCurrentPage] = useState(1);

    const { data: exploreProjectResponse, isLoading: exploreProjectIsLoading } = useQuery({
        queryFn: () => instance.get('/project/all', {
            params: {
                pageNumber: currentPage,
                pageSize: 20
            },
        }),
        queryKey: ['projects-explore', currentPage],
    });

    const totalPages = Math.ceil((exploreProjectResponse?.data?.totalNoOfRecords || 0) / 20);

    const handleNextPage = () => {
        if (currentPage + 1 <= totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage - 1 > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <div className="lg:px-8 px-3 py-14">
            {/* Welcome Header */}
            <div className="lg:mb-16 mb-5">
                <h1 className="lg:text-3xl text-2xl flex items-center">
                    Great to see you again, {user?.firstName || 'User'}!{' '}
                    <MdOutlineWavingHand className="ml-2 text-yellow-400" />
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    "The only way to do great work is to love what you do."
                </p>
            </div>

            {/* Explore Projects Section */}
            <div className="lg:mb-28 mb-20">
                <SectionHeader title="Explore Projects" icon={<FiCompass size={20} />} showSeeAll={false} seeAllLink="" />

                {exploreProjectIsLoading ? (
                    <Preloader/>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:mt-16 mt-6">
                            {exploreProjectResponse?.data?.projects?.map((item: any, idx: number) =>
                                <ProjectCard
                                    key={idx}
                                    projectId={item?._id}
                                    image={item?.coverImage}
                                    title={item?.name}
                                    description={item?.description}
                                    tags={item?.skills?.flatMap((item: any) => item?.tools).slice(0, 3) || []}
                                    collaborators={item?.teamMembers?.map((member: any) => member?.user)}
                                />
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-10 space-x-4">
                                <button
                                    className={`px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <span className="px-3 py-2 text-gray-600 font-semibold items-center flex">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    className={`px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                                    onClick={handleNextPage}
                                    disabled={currentPage >= totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
