'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Badge, Loader } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

import { instance } from '@/src/api/instance';

const InterviewSlotSelection: React.FC = () => {
    const params = useParams();
    const token = params.token as string;
    const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
    const [confirmed, setConfirmed] = useState(false);
    const [zoomLink, setZoomLink] = useState('');

    const { data: interviewData, isLoading, isError } = useQuery({
        queryFn: () => instance.get(`/interview/${token}`),
        queryKey: ['interview', token],
        enabled: !!token,
    });

    const { mutate: selectSlot, isPending: selecting } = useMutation({
        mutationFn: (slotIndex: number) => instance.post(`/interview/select-slot`, { token, slotIndex }),
        onSuccess(response: any) {
            setConfirmed(true);
            setZoomLink(response?.data?.data?.zoomJoinLink || '');
            toast.success('Interview slot confirmed!');
        },
        onError(err: any) {
            toast.error(err?.response?.data?.message || err.message || 'Something went wrong');
        },
    });

    const interview = interviewData?.data?.data;

    const handleConfirmSlot = () => {
        if (selectedSlotIndex === null) {
            return toast.error('Please select a time slot');
        }
        selectSlot(selectedSlotIndex);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#EBF1FF] to-[#F8FAFF] flex items-center justify-center">
                <div className="text-center">
                    <Loader size="lg" color="#001D69" />
                    <p className="mt-4 text-gray-500">Loading interview details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#EBF1FF] to-[#F8FAFF] flex items-center justify-center px-4">
                <div className="max-w-md text-center bg-white rounded-2xl shadow-lg p-10">
                    <div className="text-5xl mb-4">😔</div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Interview Not Found</h2>
                    <p className="text-gray-500">This interview invite may have expired or the link is invalid.</p>
                </div>
            </div>
        );
    }

    // Already confirmed state
    if (interview?.status === 'CONFIRMED' || confirmed) {
        const slot = interview?.selectedSlot || (interview?.availableSlots && selectedSlotIndex !== null ? interview.availableSlots[selectedSlotIndex] : null);
        const link = zoomLink || interview?.zoomJoinLink || '';
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#EBF1FF] to-[#F8FAFF] flex items-center justify-center px-4">
                <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 md:p-10">
                    <div className="text-center mb-8">
                        <div className="text-5xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold text-[#001D69] mb-2">Interview Confirmed!</h2>
                        <p className="text-gray-500">Your interview has been scheduled. Check your email for the details.</p>
                    </div>

                    {slot && (
                        <div className="bg-blue-50 rounded-xl p-5 mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xl">📅</span>
                                <div>
                                    <p className="text-xs text-gray-500">Date</p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {moment(slot.date).format('dddd, MMMM Do YYYY')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🕐</span>
                                <div>
                                    <p className="text-xs text-gray-500">Time</p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {slot.startTime} — {slot.endTime}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-[#2D8CFF] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1a7ae8] transition-colors"
                        >
                            🎥 Join Zoom Meeting
                        </a>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#EBF1FF] to-[#F8FAFF] py-8 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#001D69] mb-1">
                        Sqwads
                    </h1>
                    <p className="text-gray-400 text-sm">Interview Scheduling</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* Project Info Banner */}
                    <div className="bg-[#001D69] px-6 py-5 text-white">
                        <Badge color="white" variant="light" size="sm" className="mb-2" styles={{ root: { color: '#001D69' } }}>
                            Interview Invite
                        </Badge>
                        <h2 className="text-lg font-semibold">
                            {(interview?.project as any)?.name || 'Project Interview'}
                        </h2>
                    </div>

                    {/* Welcome Message */}
                    <div className="px-6 py-5 border-b border-gray-100">
                        <p className="text-sm text-gray-500 mb-1 font-medium">
                            Hello {(interview?.user as any)?.firstName} 👋
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4 mt-3">
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                {interview?.inviteMessage}
                            </p>
                        </div>
                    </div>

                    {/* Time Slots */}
                    <div className="px-6 py-5">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">
                            Select a time that works for you
                        </h3>

                        <div className="space-y-3">
                            {interview?.availableSlots?.map((slot: any, index: number) => {
                                const isSelected = selectedSlotIndex === index;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSlotIndex(index)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                                            ? 'border-[#001D69] bg-blue-50 shadow-md'
                                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {/* Radio indicator */}
                                                <div
                                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-[#001D69]' : 'border-gray-300'
                                                        }`}
                                                >
                                                    {isSelected && (
                                                        <div className="w-3 h-3 rounded-full bg-[#001D69]" />
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {moment(slot.date).format('dddd, MMMM Do YYYY')}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {slot.startTime} — {slot.endTime}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="text-xs text-gray-400">
                                                📅
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                        <button
                            onClick={handleConfirmSlot}
                            disabled={selectedSlotIndex === null || selecting}
                            className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${selectedSlotIndex !== null && !selecting
                                ? 'bg-[#001D69] text-white hover:bg-[#002a8f] shadow-md'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {selecting ? 'Confirming...' : 'Confirm Selected Time'}
                        </button>
                        <p className="text-xs text-gray-400 text-center mt-3">
                            A Zoom meeting link will be generated and sent to your email
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    Powered by Sqwads • Interview Scheduler
                </p>
            </div>
        </div>
    );
};

export default InterviewSlotSelection;
