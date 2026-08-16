"use client"
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import { userWrapper } from '@/store';
import { FaFire, FaTrophy, FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const XpSummaryCard = () => {
    const router = useRouter();
    const user = userWrapper((state: any) => state.user);

    const { data: xpData, isLoading } = useQuery({
        queryFn: () => instance.get(`/user/${user?._id}/xp-card`),
        queryKey: ['user-xp', user?._id],
        enabled: !!user?._id
    });

    if (isLoading) {
        return <div className="bg-white p-6 rounded-2xl shadow-sm animate-pulse h-40"></div>;
    }

    const xpSummary = xpData?.data?.data;
    if (!xpSummary) return null;

    return (
        <div 
            onClick={() => router.push('/xp')}
            className="bg-gradient-to-br from-[#001D69] to-[#0A2B5C] rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-shadow relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaTrophy size={80} />
            </div>
            
            <div className="relative z-10 flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-1">Current Level</h3>
                    <div className="text-2xl font-bold flex items-center gap-2">
                        {xpSummary.level}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black">{xpSummary.totalXp.toLocaleString()}</div>
                    <div className="text-sm text-blue-200 font-medium tracking-wider">XP</div>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between text-xs text-blue-100 font-semibold mb-2 uppercase tracking-wide">
                    <span>Progress</span>
                    <span>{xpSummary.nextLevelXp - xpSummary.totalXp} to next level</span>
                </div>
                <div className="w-full bg-blue-900/50 rounded-full h-2 mb-4 overflow-hidden">
                    <div 
                        className="bg-gradient-to-r from-blue-400 to-indigo-300 h-2 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(96,165,250,0.5)]" 
                        style={{ width: `${xpSummary.progressPct}%` }}
                    ></div>
                </div>
            </div>

            <div className="relative z-10 flex gap-4 pt-4 border-t border-white/10 mt-2">
                <div className="flex-1 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <FaFire className="text-orange-400" />
                    </div>
                    <div>
                        <div className="text-xs text-blue-200 uppercase tracking-wider">Reliability</div>
                        <div className="font-bold text-sm">{xpSummary.reliabilityScore ? `${xpSummary.reliabilityScore}%` : 'N/A'}</div>
                    </div>
                </div>
                <div className="flex-1 flex items-center gap-2 border-l border-white/10 pl-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <FaStar className="text-yellow-400" />
                    </div>
                    <div>
                        <div className="text-xs text-blue-200 uppercase tracking-wider">Quality</div>
                        <div className="font-bold text-sm">{xpSummary.qualityRating ? `${xpSummary.qualityRating} / 5` : 'N/A'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default XpSummaryCard;
