"use client"
import React, { useState } from 'react';
import { TextInput, Textarea, Checkbox, Button, Select } from '@mantine/core';
import { BiPlus, BiX } from 'react-icons/bi';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import { skillsTools } from '@/common/data';
// import { Button } from '@/components/ui/button';
// import { Plus, X } from 'lucide-react';

interface SkillsExperienceProps {
  form: any;
}

const SkillsExperience = ({user}:any) => {
  const [newSkill, setNewSkill] = useState('');

  const validator = Yup.object({
    experiences: Yup.array().of(Yup.object({
        company: Yup.string().required('Company is required'),
        position: Yup.string().required('Position is required'),
        location: Yup.string(),
        website: Yup.string().url('Invalid URL'),
        startDate: Yup.date().required('Start date is required'),
        endDate: Yup.date().nullable(),
        currentlyWorking: Yup.boolean(),
        description: Yup.string()
      })),
  })
 
   const form = useForm({
      validate: yupResolver(validator),
      initialValues: {
        
        skills: [] as any[],
        experiences: [] as any[],
     }
    })

    React.useEffect(() => {
        if (user) {
            form.setValues({
                skills: user?.skills || [],
                experiences: user?.experiences || [],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = form.values.skills || [];
      form.setFieldValue('skills', [...currentSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.values.skills || [];
    form.setFieldValue('skills', currentSkills.filter((_: any, i: number) => i !== index));
  };

  const addExperience = () => {
    const currentExperience = form.values.experiences || [];
    form.setFieldValue('experiences', [
      ...currentExperience,
      {
        company: '',
        position: '',
        location: '',
        website: '',
        startDate: null,
        endDate: null,
        currentlyWorking: false,
        description: ''
      }
    ]);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => instance.patch('/user', data),
    mutationKey: ['user', 'update'],
    onSuccess() {
        toast.success("Changes Saved !!!");
    },
    onError(error: any) {
        toast.error(error?.response?.data?.message || 'Action Failed');
    },
});

  const handleSubmit = ()=>{
    console.log(form.values)
    const hasEmptyExperience = form.values.experiences.some((exp: any) =>
        Object.values(exp).every(
            (value) =>
                value === '' ||
                value === null ||
                value === false
        )
    );

    if (hasEmptyExperience) {
        toast.error('Please fill in all fields or remove empty experiences entries.');
        return;
    }

    mutate(form.values)

    
  }


    const handleRemoveExperience = (index: number) => {
        const currentExperience = form.values.experiences || [];
        form.setFieldValue(
            'experiences',
            currentExperience.filter((_: any, i: number) => i !== index)
        );
    };
  return (
    <div className="space-y-8 py-6">
      <div>
        <h3 className="text-xl font-semibold text-card-foreground mb-6">SKILLS</h3>
        <p className="text-sm text-muted-foreground mb-4">
          You can add up to 20 skills. Just a common or popular skills, or choose from the list.
        </p>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Select
              searchable
              data={skillsTools}
              placeholder="Search for skills"
              clearable
              value={newSkill || null}
              onChange={(value) => setNewSkill(value || '')}
              className="flex-1"
              
            />
            <Button type="button" onClick={addSkill} size="sm">
              Add
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {form.values.skills?.map((skill: string, index: number) => (
              <div
                key={index}
                className="flex items-center border gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <BiX className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-card-foreground">EXPERIENCE</h3>
          <Button type="button" onClick={addExperience} variant="outline" size="sm">
            Add Another Experience
          </Button>
        </div>

        {form.values.experiences?.map((exp: any, index: number) => (
          <div key={index} className="border border-border rounded-lg p-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextInput
                label="Company"
                placeholder="e.g. Microsoft"
                {...form.getInputProps(`experiences.${index}.company`)}
              />
              
              <TextInput
                label="Website"
                placeholder="e.g. microsoft.com/en"
                {...form.getInputProps(`experiences.${index}.website`)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextInput
                label="Location"
                placeholder="e.g. Lagos"
                {...form.getInputProps(`experiences.${index}.location`)}
              />
              
              <TextInput
                label="City"
                placeholder="e.g. Ikeja, Lagos"
                {...form.getInputProps(`experiences.${index}.city`)}
              />
            </div>

            <TextInput
              label="Position"
              placeholder="e.g. Product Designer"
              className="mb-4"
              {...form.getInputProps(`experiences.${index}.position`)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextInput
                label="Starts from"
                type="date"
                {...form.getInputProps(`experiences.${index}.startDate`)}
              />
              
              <TextInput
                label="Ends in"
                type="date"
                disabled={form.values.experiences[index]?.currentlyWorking}
                {...form.getInputProps(`experiences.${index}.endDate`)}
              />
            </div>

            <Checkbox
              label="I am currently working here"
              className="mb-4"
              {...form.getInputProps(`experiences.${index}.currentlyWorking`, { type: 'checkbox' })}
            />

            <Textarea
            className="w-full border rounded p-3 h-40 resize-y"
              label="Description"
              placeholder="Type Here..."
              minRows={3}
              {...form.getInputProps(`experiences.${index}.description`)}
            />

            <div className="text-[red] mt-3 cursor-pointer" onClick={()=>handleRemoveExperience(index)}>Remove</div>
          </div>
        ))}

        <div onClick={handleSubmit} className="flex justify-end mt-8">
            <Button disabled={isPending} type="submit" className="px-6">
            {isPending?'Saving...':'Save Changes'}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillsExperience;