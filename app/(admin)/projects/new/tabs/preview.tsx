import  React from 'react';
import BasicDetails from './basicDetails';
import { UseFormReturnType } from '@mantine/form';
import Timeline from './timeline';
import Skills from './skills';
import Members from './members';
import Others from './others';

const Preview = ({
    basicDetailsForm,
    timelineForm,
    additionalInfoForm,
    skillsList,
    selectedTools,
    selectedMembers,
    selectedProjectead,
    membersOptions,
    handleSubmit,
    projectCreatnIsPending
}:{
    basicDetailsForm: UseFormReturnType<any>,
    timelineForm: UseFormReturnType<any>,
    additionalInfoForm: UseFormReturnType<any>,
    skillsList: any[],
    selectedTools: any[],
    selectedMembers: any[],
    membersOptions: any [],
    selectedProjectead: string,
    handleSubmit: ()=>void;
    projectCreatnIsPending: boolean

}) => {
    return ( 
        <div>
            <div className="mb-7 font-semibold text-lg">Review and Confirm</div>

            <div className='mb-7'>
                <BasicDetails
                    form={basicDetailsForm}
                    previewMode={true}
                />
            </div>

            <div className='mb-7'>
                <Timeline
                    form={timelineForm}
                    previewMode
                />
            </div>

            <div className="mb-7">
                <Skills
                     list={skillsList}
                     selectedTools={selectedTools}
                     previewMode
                />
            </div>

            <div className="mb-7">
                <Members
                    selectedMembers={selectedMembers}
                    membersOptions={membersOptions}
                    selectedProjectead={selectedProjectead}
                    previewMode
                />
            </div>

            <div className="mb-7">
                <Others
                    previewMode
                    form={additionalInfoForm}
                />
            </div>

            <div className="mt-16">
                <button 
                    className={`py-3 px-5 rounded-md bg-[#001D69] rounded-md w-full text-[white] disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled = {projectCreatnIsPending}
                    onClick={handleSubmit}
                >
                    {projectCreatnIsPending?'Creating Project...':'Create Project'}
                </button>
            </div>
        </div>
     );
}
 
export default Preview;
