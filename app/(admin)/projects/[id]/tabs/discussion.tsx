"use client"
import DiscussionItem from '@/app/(application)/components/DiscussionItem';
import { sampleDiscussions } from '@/app/(application)/components/DiscussionTabContent';
import  React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { Modal, Button, Input, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import toast from 'react-hot-toast';
import { formatDistanceToNow, parseISO } from 'date-fns';



const Discussions = ({
    projectId,
    onDiscussionClick,
    showNewBtn
}:any) => {

    const [activeFilter, setActiveFilter] = useState<'All' | 'Owned'>('All');
    const otherDiscussions = sampleDiscussions.filter(d => !d.isPinned);
    const [opened, { open, close }] = useDisclosure(false);
    const queryClient = useQueryClient();

    const discussionValidator = Yup.object({
        title: Yup.string().required('Title is required'),
        details: Yup.string().required('Description is required'),
    })

    const form = useForm({
        initialValues: {
            title: '',
            details: '',
        },
        validate: yupResolver(discussionValidator),
        
    });

    const {isPending: projDiscIsPending, data:projectDiscussions} = useQuery({
        queryFn: () => instance.get(`/project/${projectId}/discussions`),
        queryKey: ['get-project-discussions'],
        
    })

    const {mutate, isPending} = useMutation({
        mutationFn: (data)=>instance.post('/project/discussion', data ),
        mutationKey: ['create-discussion'],
        onSuccess(data, variables, context) {
            toast.success('Discussion created successfully')
            queryClient.invalidateQueries({
                queryKey: ['get-project-discussions']
            })
            form.reset();
            close()
        },
        onError(error, variables, context) {
           toast.error('Error creating discussion')
        }
    })

    const handleSubmit = async (values: any) => {
        mutate({
            ...values,
            projectId: projectId
        })
    }

    // console.log('projectDiscussions', projectDiscussions?.data?.data)


    return ( 
    <div>
        <h2 className="text-xl font-bold mb-4">Discussions</h2>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 gap-3 md:gap-4">
            <div className="relative w-full md:flex-grow">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    type="text"
                    placeholder="Enter Keyword"
                    // value={''}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            {
                showNewBtn &&
                <button onClick={()=>open()} className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex-shrink-0">
                    <FaPlus className="mr-2" />
                    Create New
                </button>
            }
        </div>

        {/* Filter Tabs and Sort Dropdown */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="flex space-x-4 border-b border-gray-200 mb-3 sm:mb-0">
            <button 
                className={`pb-2 px-1 text-sm sm:text-base ${activeFilter === 'All' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveFilter('All')}
            >
                All
            </button>
            <button 
                className={`pb-2 px-1 text-sm sm:text-base ${activeFilter === 'Owned' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveFilter('Owned')}
            >
                Owned
            </button>
            </div>
            <div className="relative">
            {/* Basic dropdown appearance, functionality to be added */}
            {/* <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                {sortOrder}
                <FiChevronDown className="ml-1" />
            </button> */}
            {/* Dropdown menu would go here */}
            </div>
        </div>

      

        {/* Other Discussions */}
        <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Other discussions</h3>
            {projectDiscussions?.data?.data?.length > 0 ? (
            projectDiscussions?.data?.data?.map((discussion:any, index:number) => (
               <div 
                    className='cursor-pointer' 
                    key={index}
                    onClick={()=>onDiscussionClick(discussion?._id)}
                >
                 <DiscussionItem 
                    key={`other-${index}`} 
                    // authorName={discussion?.creator?.firstName} 
                    authorName='Sqwads Admin'
                    title={discussion?.title}
                    comments={discussion?.number_of_comments}
                    upvotes={discussion?.number_of_comments}
                    createdAt={formatDistanceToNow(parseISO(discussion?.createdAt), { addSuffix: true })}
                    // authorRole='Sqwads Admin'
                 />
               </div>
            ))
            ) : (
            <p className="text-gray-500 text-center py-6">No other discussions yet.</p>
            )}
        </div>

       

        <>
            <Modal opened={opened} onClose={close} title="Create New Discussion" centered>
                {/* Modal content goes here */}
                <form  onSubmit={form.onSubmit( handleSubmit)}>
                <div className=" px-5 py-10">
                    <div className='mb-5'>
                        <Input
                            placeholder="Discussion Title"
                            {...form.getInputProps('title')}
                        />
                    </div>
                    <div className='mb-7'>
                        <Textarea
                        className="w-full border rounded p-3 h-40 resize-y"
                            placeholder="Description"
                           {...form.getInputProps('details')}
                            minRows={4}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button disabled={isPending} className='bg-[#001D69] disabled:cursor-not-allowed disabled:opacity-50 text-white rounded-lg w-full py-3 ' type='submit'  >
                            {isPending ? 'Creating...' : 'Create Discussion'}
                        </button>
                    </div>
                </div>
                </form>
            </Modal>
            
        </>
    </div>
     );
}
 
export default Discussions;