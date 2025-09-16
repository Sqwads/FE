import { Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import  React from 'react';

const Others = ({
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
            <div className={`font-semibold mb-7 ${previewMode && 'bg rounded px-4 py-2   bg-[#0234B81A] text-[#0234B8]'}`}>OTHERS</div>
            {/* @ts-ignore */}
            <form onSubmit={form.onSubmit(handleProceed)} >
                <div className="mb-5">
                    <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">Any additional Info</div>
                    <Textarea
                    className="w-full rounded p-3 resize-y"
                    rows={10}
                        {...form?.getInputProps('additionalInfo')}
                        size='xl'
                        styles={{
                            input:{
                                fontSize:'0.9rem',
                                height:'200px'
                            }
                        }}
                        disabled={previewMode}
                    />
                </div>
               {!previewMode &&
                <div className="flex justify-end mt-10">
                    <button type='submit' className='py-2 px-5 bg-[#001D69] rounded-md text-sm text-[white]'>Review and Confirm</button>
                </div>
               }
            </form>
        </div>
     );
}
 
export default Others;
