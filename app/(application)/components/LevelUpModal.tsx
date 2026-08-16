"use client"
import React from 'react';
import { Modal, Button } from '@mantine/core';
import { FaLinkedin, FaTwitter, FaLink, FaTrophy } from 'react-icons/fa';
import toast from 'react-hot-toast';

const LevelUpModal = ({ 
    opened, 
    onClose, 
    newLevel, 
    userId, 
    totalXp 
}: { 
    opened: boolean; 
    onClose: () => void; 
    newLevel: string;
    userId: string;
    totalXp: number;
}) => {
    const profileUrl = `https://sqwads.com/project-public?userId=${userId}`;
    const shareText = `🚀 Just levelled up to ${newLevel} on Sqwads with ${totalXp} XP! Every project I complete gets me closer to real opportunities. 👇`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${shareText}\n${profileUrl}`);
        toast.success('Link copied to clipboard!');
    };

    const shareOnLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`, '_blank');
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`, '_blank');
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            withCloseButton={false}
            centered
            overlayProps={{
                backgroundOpacity: 0.75,
                blur: 8,
            }}
            size="md"
            padding={0}
            radius="xl"
        >
            <div className="flex flex-col items-center text-center p-8 relative overflow-hidden bg-white">
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-[#001D69] to-blue-800 -z-10" />
                
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl border-4 border-[#001D69] mt-8">
                    <FaTrophy className="text-yellow-400" size={56} />
                </div>
                
                <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Level Up!</h2>
                <p className="text-gray-600 mb-2 text-lg">
                    You've reached <span className="font-bold text-[#001D69]">{newLevel}</span>!
                </p>
                <p className="text-sm text-gray-500 mb-8 max-w-sm">
                    Your hard work is paying off. Share your new status with your network and show them what you're building.
                </p>

                <div className="w-full space-y-3">
                    <Button
                        onClick={shareOnLinkedIn}
                        fullWidth
                        size="lg"
                        className="bg-[#0077b5] hover:bg-[#006396] text-white flex items-center justify-center gap-2 rounded-xl"
                    >
                        <FaLinkedin size={20} /> Share on LinkedIn
                    </Button>
                    <Button
                        onClick={shareOnTwitter}
                        fullWidth
                        size="lg"
                        className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white flex items-center justify-center gap-2 rounded-xl"
                    >
                        <FaTwitter size={20} /> Share on X
                    </Button>
                    <Button
                        variant="default"
                        fullWidth
                        size="lg"
                        onClick={handleCopyLink}
                        className="flex items-center justify-center gap-2 rounded-xl"
                    >
                        <FaLink size={18} /> Copy Link
                    </Button>
                </div>
                
                <button 
                    onClick={onClose}
                    className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium"
                >
                    Maybe later
                </button>
            </div>
        </Modal>
    );
};

export default LevelUpModal;
