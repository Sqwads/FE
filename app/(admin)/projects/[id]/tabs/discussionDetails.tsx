"use client"

import { instance } from '@/api/instance';
import CommentInput from '@/app/(application)/components/CommentInput';
import DiscussionPost from '@/app/(application)/components/DiscussionPost';
import NavigationTabs from '@/app/(application)/components/NavigationTabs';
import ProjectHeader from '@/app/(application)/components/ProjectHeader';
import ReactionButtons from '@/app/(application)/components/ReactionButtons';
import { Textarea } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Link from 'next/link';
import { comment } from 'postcss';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { FiArrowLeft, FiPaperclip, FiSmile, FiX } from 'react-icons/fi';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { IoArrowBackSharp } from 'react-icons/io5';

const DiscussionDetails = ({
    discussionId,
    onBack
}: any) => {

   
    const queryClient = useQueryClient();

    const [commentText, setCommentText] = useState('');

    const {data: response, isPending} = useQuery({
        queryKey: ['discussion', discussionId],
        queryFn: () => instance.get(`/project/discussions/${discussionId}`),
        enabled: !!discussionId
    });

    const {mutate, isPending: commentCreateIsPending} = useMutation({
        mutationFn: (data:any)=> instance.post(`/project/discussion/comment`, data),
        mutationKey: ['create-discussion-comment'],
        onSuccess(data, variables, context) {
            setCommentText('')
            toast.success('Comment created successfully')
            queryClient.invalidateQueries({
                queryKey:  ['discussion', discussionId]
            })
        },
        onError(error, variables, context) {
            toast.error('Error creating comment')
        }
    })

      
    const handleCommentSubmit = () => {
        // console.log('Submitting comment:', commentText);
        mutate({
            discussionId,
            comment: commentText
        })
    };

    const discussion = response?.data?.data?.discussion
    const comments = response?.data?.data?.comments

   
    return ( 
        <div className="lg:px-6 bg-white min-h-screen">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="max-w-[800px]">
                   <div className="">
                    <IoArrowBackSharp onClick={onBack} size={20} className='mb-3 cursor-pointer' color='#001D69' />
                    <DiscussionPost
                        authorName={`${discussion?.creator?.firstName} ${discussion?.creator?.lastName}`}
                        avatarUrl={''}
                        postedTime={
                            discussion?.createdAt ? 
                            formatDistanceToNow(parseISO(discussion?.createdAt), { addSuffix: true }).toUpperCase() :
                            ''
                        }
                        title={discussion?.title}
                        content={discussion?.details || ''}
                        upvotes={comments?.length || 0}   
                        commentsCount={comments?.length || 0}
                    />
                   </div>

                    {/* <ReactionButtons reactions={discussionData.reactions} /> */}

                    <div className="mb-14 mt-14">
                        <h3 className="text-lg font-medium mb-4 flex items-center"> <BiSolidCommentDetail size={27} className='mr-3' /> Comments ({comments?.length || 0})</h3>
                        {comments?.map((item:any, index:number)=>
                         <div key={index} className="border-t  lg:px-7 px-2 py-5">
                            <div className="flex flex-shrink">
                                {/* <img src="/images/alex.png" className='h-14 w-14 rounded-full object-cover mr-4' alt="" /> */}
                                <div className="flex rounded-full h-10 w-10 mr-4 bg-blue-800 items-center justify-center text-2xl text-white font-medium">
                                    {item?.creator?.firstName[0]}

                                   
                                </div>
                                <div className='mr-7 flex-1'>
                                    <div className='text-[#001D69] text-sm mb-2'>
                                        {item?.creator?.firstName} {item?.creator?.lastName}
                                         <span className='text-xs text-[#717680] ml-4'>    
                                            <span className='text-xl mr-2'>•</span> 
                                            POSTED {" "}
                                            { 
                                                item?.created_at ? 
                                                formatDistanceToNow(parseISO(item?.created_at), { addSuffix: true }).toUpperCase() :
                                                ''
                                            }
                                        </span>
                                    </div>
                                    <div className='text-[#717680]'>{item?.message}</div>
                                </div>
                                
                            </div>
                         </div>
                        )}
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <Textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Type your comment here |"
                            className=" mb-3"
                            rows={3}
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <button className="text-gray-500 cursor-not-allowed hover:text-gray-700">
                                <FiSmile size={18} />
                              </button>
                              <button className="text-gray-500 cursor-not-allowed hover:text-gray-700">
                                <FiPaperclip size={18} />
                              </button>
                            </div>
                            <button 
                              onClick={handleCommentSubmit}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50"
                              disabled={!commentText.trim() || commentCreateIsPending} // Disable button if textarea is empty
                            >
                              {commentCreateIsPending? 'Creating...':"Comment"}
                            </button>
                          </div>
                    </div>

                </div> 
            </div>
        </div>
     );
}
 
export default DiscussionDetails;