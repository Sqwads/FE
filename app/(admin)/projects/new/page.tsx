"use client"

import React, {  Suspense, useEffect, useState } from 'react';
import BasicDetails from './tabs/basicDetails';
import toast from 'react-hot-toast';
import { useForm, UseFormReturnType, yupResolver } from '@mantine/form';
import { AdditionalInfoValidator, BasicDetailsValidator, TimeLineValidator } from './validators';
import Timeline from './tabs/timeline';
import Skills from './tabs/skills';
import Members from './tabs/members';
import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../../../../src/api/instance';
import Others from './tabs/others';
import Preview from './tabs/preview';
import { useRouter, useSearchParams } from 'next/navigation';

const CreateProject = () => {

    interface ITab {
        name: string;
        formState?: UseFormReturnType<any, (values: any) => any>;
        isActive?: boolean;
        hasFormValidation: boolean;
        definedValidation?: (e:any)=>boolean;
    }

    const router = useRouter()
    const searchParams = useSearchParams()
    const [imageSrc, setImageSrc] = useState<any>(null);
    const [file, setFile] = useState<any>(null);
    const [skills, setSkills] = useState<any[]>([])
    const [selectedTools, setSelectedTools] = useState<any[]>([])
    const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
    const [membersOptions, setMembersOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedProjectLead, setSelectedProjectLead] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const projectId = searchParams.get('project')
   
   

    const {data: fetchedProject} = useQuery({
        queryFn: ()=>instance.get(`/project/${projectId}`),
        queryKey: ['projects', projectId],
        enabled: !!projectId
    })

    useEffect(()=>{
        if(!projectId) return
        const data = fetchedProject?.data

        if(data?.coverImage){
            setImageSrc(data?.coverImage)
        }

        form.setValues({
            name: data?.name,
            features: data?.features,
            description: data?.description,
            overview: data?.overview
        })
        
        timelineForm.setValues({
            startDate: new Date(data?.startDate),
            endDate:new Date(data?.endDate)
        })

        setSkills(data?.skills?.map((item:any)=>item?.name))
        setSelectedTools(data?.skills || [])
        const availableUserOptions = data?.teamMembers?.map((item:any)=>({
            label: `${item?.user?.firstName} ${item?.user?.lastName} - ${item?.role}`,
            value: item?.user?._id
        })) || []

        setMembersOptions( removeDuplicates(
            [
                ...availableUserOptions, 
                {
                    label: `${data?.projectLead?.firstName} ${data?.projectLead?.lastName}`,
                    value: data?.projectLead?._id
                }
            ]
        ))

        setSelectedMembers(availableUserOptions)
        setSelectedProjectLead(data?.projectLead?._id)
        additionalInfoForm.setValues({
            additionalInfo: data?.additionalInfo
        })

        
     

    }, [fetchedProject?.data])

    const form = useForm({
        initialValues: {
            name: '', features: '', description: '', overview: '',
        },
        validate: yupResolver(BasicDetailsValidator)
    })

    const timelineForm = useForm({
        initialValues: {
            startDate: '' as string | Date, endDate: '' as string | Date
        },
        validate: yupResolver(TimeLineValidator)
    })

    const additionalInfoForm = useForm({
        initialValues: {
            additionalInfo: ''
        },
        validate: yupResolver(AdditionalInfoValidator)
    })


    const validateSkillsAndTools = (updatedSelectedTools:any[])=>{
        console.log(updatedSelectedTools)
        if(updatedSelectedTools.length <= 0){
            return false
        }
        return true
    }

    const validateMembersPayload = (users: any)=>{
        if(users?.selectedMembers.length < 1){
            return false
        }else if(users?.selectedProjectLead == ''){
            return false
        }else{
            return true
        }
    }

    const [tabs, setTabs] = useState<ITab[]>([
        { name: 'Basic Details', hasFormValidation:true,formState: form, isActive: true },
        { name: 'Timeline', hasFormValidation:true,  formState: timelineForm },
        { name: 'Skills', hasFormValidation:false, definedValidation:validateSkillsAndTools,  isActive: false },
        { name: 'Users/Members', hasFormValidation:false, definedValidation: validateMembersPayload, isActive:false },
        { name: 'Others', hasFormValidation:true, formState: additionalInfoForm, isActive: false },
        { name: 'Preview', hasFormValidation:false, isActive: false },

    ])

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            setFile(file);
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSKillsSelect = (list:any[])=>{
        setSkills(list)
        const filterRedundantTools = selectedTools.filter(item=> list.includes(item.name))
        setSelectedTools(filterRedundantTools)
    }

    const handleSelectTools = (list:any, skill: string)=>{
        const selectedTools_c = [...selectedTools]
        const skillExist = selectedTools_c.find((item:any)=>item.name == skill )
        if(skillExist){
            const idx = selectedTools_c.indexOf(skillExist)
            selectedTools_c[idx].tools = list
        }else{
            selectedTools_c.push({
                name: skill,
                tools:list
            })
        }
       
        setSelectedTools(selectedTools_c)
        // console.log(selectedTools)
    }

    //THESE FUNCTIONS ARE MEANT FOR THE MEMBERS TABS
    const {data: usersData, isLoading: userInfoIsLoading} = useQuery({
        queryFn: ()=>instance.get( `/user/all?searchQuery=${searchQuery}` ),
        queryKey: [searchQuery],
        enabled: searchQuery.length >= 2
    })

    const handleSelectMembers = (values:string[])=>{
        setSelectedMembers(values)
        // console.log(selectedMembers)
    }

    const handleSearchChange = (query: string) => {
        // console.log(query)
        setSearchQuery(query)
    };


    function removeDuplicates(arr: any[]) {
        const seen = new Set();
        return arr.filter((item: any) => {
          if (seen.has(item.value)) {
            return false;
          } else {
            seen.add(item.value);
            return true;
          }
        });
    }

    useEffect(() => {
        if (usersData) {
            const formattedOptions = usersData?.data?.users?.map((user: any) => ({
                label: `${user?.firstName} ${user?.lastName} - ${user?.skills_of_interest[0]}`, // Display name
                value: user._id, // Unique ID
            }));
           
            setMembersOptions(removeDuplicates([...formattedOptions, ...membersOptions]));
        }
    }, [usersData]);

    const handleProjectLeadSelect = (val:any)=>{
        console.log(val)
        setSelectedProjectLead(val)
    }
    //END OF THE MEMBERS TABS FUNCTIONS SET


    const handleProceed = () => {
        // console.log('good')
        const nextIdx = tabs.findIndex(item => item.isActive) + 1
        goToNextTab(nextIdx)
    }

    const goToNextTab = (idx: number) => {
        const tabs__c = [...tabs]
        tabs__c.forEach(element => element.isActive = false);
        tabs__c[idx].isActive = true
        setTabs(tabs__c)
    }

    const handleSwitchTab = (idx: number) => {
        //@ts-ignore
        const activeTab: ITab = tabs.find(item => item.isActive)
        const isValidated = activeTab.formState?.isValid()
      
        if ( (!isValidated &&  (idx - tabs.indexOf(activeTab) > 0)) && activeTab.hasFormValidation) {
            return toast.error('Please fill up the required fields')
        }

        if(!activeTab.hasFormValidation){
            
           let isValidated = false
           if(tabs.indexOf(activeTab) == 2){
                //@ts-ignore
                isValidated= activeTab.definedValidation(selectedTools)
           }else if (tabs.indexOf(activeTab) == 3){
                //@ts-ignore
                isValidated= activeTab.definedValidation({
                    selectedMembers, selectedProjectLead
                })
           }else if(tabs.indexOf(activeTab) == tabs.length -1){
            isValidated = true
           }
           console.log(isValidated)
           if(!isValidated) return toast.error('Fill in the missing fields to continue')
        }

        goToNextTab(idx)

    }

    const {mutate:createProject, isPending: projectCreatnIsPending} = useMutation({
        mutationFn: (data:any)=>instance.post(`/project`, data),
        mutationKey: ['project'],
        onSuccess() {
            toast.success('New Project Created Successfully')
            router.push('/projects')
        },
        onError(error:any) {
            toast.error('Project Creation Failed')
            console.log(error?.response?.data)
        },
    })

    const {mutate:editProject, isPending: projectEditIsPending} = useMutation({
        mutationFn: (data:any)=>instance.patch(`/project`, data),
        mutationKey: ['projectEdit'],
        onSuccess() {
            toast.success('Project Edited Successfully')
            router.push('/projects')
        },
        onError(error:any) {
            toast.error('Project Edit Failed')
            console.log(error?.response?.data)
        },
    })


    const handleSUbmit = ()=>{
        
        // const isBasicDetailsValidated = 
        if(!form.isValid()) {
            return toast.error('Fill the msiing fields in the BASIC DETAILS tab')
        }
        if(!timelineForm.isValid()) {
           
            return toast.error('Fill the msiing fields in the TIMELINE tab')
        }
        if(selectedTools.length < 1){
            return toast.error('Select at least one domain/skill in the SKILLS tab')
        }
        if(selectedMembers.length < 1 || selectedProjectLead==''){
            return toast.error('At least 1 member and project lead must be selected')
        }

        const teamMembers = selectedMembers.map(item=>({
            user: item.value,
            role: item?.label?.split('-')[1]
        }))
        const formdata = new FormData()
        formdata.append('name', form.values.name)
        formdata.append('description', form.values.description)
        formdata.append('overview', form.values.overview)
        formdata.append('features', form.values.features)
        formdata.append('startDate', new Date(timelineForm.values.startDate).toISOString())
        formdata.append('endDate', new Date(timelineForm.values.endDate).toISOString())
        formdata.append('skills', JSON.stringify(selectedTools))
        formdata.append('teamMembers', JSON.stringify(teamMembers))
        formdata.append('projectLead', selectedProjectLead)
        if(additionalInfoForm.values.additionalInfo != ''){
            formdata.append('additionalInfo', additionalInfoForm.values.additionalInfo)
        }
        if(file){
            formdata.append('file', file)
        }

        if(projectId){
            formdata.append('projectId', projectId)
            editProject(formdata)
        }else{
            createProject(formdata)
        }


    }

    return (
        <div className='lg:px-10 px-3 py-10'>
            <div className="text-xl font-semibold mb-10">Create New Project</div>

            <div className="lg:flex ">
                <div className='lg:pr-32 mb-10 lg:mb-0 lg:block flex gap-x-3 lg:text-base text-sm flex-wrap gap-y-3'>
                    {tabs.map((item, idx) =>
                        <div
                            onClick={() => handleSwitchTab(idx)}
                            className={`${item.isActive && 'font-semibold underline'} lg:mb-7 cursor-pointer`}
                            key={idx}
                        >
                            {item.name}
                        </div>
                    )}
                </div>

                <div className="flex-1 max-w-[650px]">
                    {tabs[0].isActive &&
                        <BasicDetails
                            handleProceed={handleProceed}
                            file={file}
                            imageSrc={imageSrc}
                            form={form}
                            handleFileChange={handleFileChange}
                        />
                    }

                    {tabs[1].isActive &&
                        <Timeline
                            form={timelineForm}
                            handleProceed={handleProceed}
                        />
                    }

                    {tabs[2].isActive &&
                        <Skills
                            handleSelect={handleSKillsSelect}
                            handleSelectTool={handleSelectTools}
                            list={skills}
                            selectedTools={selectedTools}
                        />
                    }

                    {tabs[3].isActive &&
                        <Members
                            selectedMembers={selectedMembers}
                            membersOptions={membersOptions}
                            handleSearchChange={handleSearchChange}
                            handleSelectMembers={handleSelectMembers}
                            handleProjectLeadSelect={handleProjectLeadSelect}
                            selectedProjectead={selectedProjectLead}
                        />
                    }

                    {tabs[4].isActive && 
                        <Others
                            form={additionalInfoForm}
                            handleProceed={handleProceed}
                        />
                    }

                    {tabs[5].isActive && 
                        <Preview
                            basicDetailsForm={form}
                            timelineForm = {timelineForm}
                            additionalInfoForm={additionalInfoForm}
                            skillsList={skills}
                            selectedTools={selectedTools}
                            selectedMembers={selectedMembers}
                            membersOptions={membersOptions}
                            selectedProjectead={selectedProjectLead}
                            handleSubmit={handleSUbmit}
                            projectCreatnIsPending={projectCreatnIsPending || projectEditIsPending}
                        />
                    }
                </div>

            </div>
        </div>
    );
}

export default function CreateProjectWrapper (){
    return(
        <Suspense>
            <CreateProject/>
        </Suspense>
    )
};
