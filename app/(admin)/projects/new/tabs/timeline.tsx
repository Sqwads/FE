import { TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import  React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';

const Timeline = ({
    form,
    handleProceed,
    previewMode
}:{
    form: UseFormReturnType<any>,
    handleProceed?: ()=>void,
    previewMode?: boolean
}) => {
    return ( 
        <div>
            <div className={`font-semibold mb-7 ${previewMode && 'bg rounded px-4 py-2   bg-[#0234B81A] text-[#0234B8]'}`}>TIMELINE</div>

            {/* @ts-ignore */}
            <form onSubmit={form.onSubmit(handleProceed)}>
                <div className="mb-4">
                    <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">Start Date</div>
                    <DateInput
                        styles={{
                            input:{fontSize:'1rem'}
                        }}
                        rightSection={<FaRegCalendarAlt />}
                        size='md'
                        {...form?.getInputProps('startDate')}
                        disabled={previewMode}
                       placeholder='Select Date'
                    />
                </div>

                <div className="mb-4">
                    <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">End Date</div>
                    <DateInput
                        styles={{
                            input:{fontSize:'1rem'}
                        }}
                        size='md'
                        {...form.getInputProps('endDate')}
                        rightSection={<FaRegCalendarAlt />}
                        disabled={previewMode}
                        placeholder='Select Date'
                    />
                </div>

                {!previewMode &&
                <div className="flex justify-end mt-10">
                    <button type='submit' className='py-3 px-5 bg-[#001D69] rounded-md text-sm text-[white]'>Proceed to Next</button>
                </div>
                }
            </form>
        </div>
     );
}
 
export default Timeline;
