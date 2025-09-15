"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Button, TextInput, Textarea } from '@mantine/core';
import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import toast from 'react-hot-toast';
// import { Upload } from 'lucide-react';

interface BasicInformationProps {
  form: any;
  profileImageSrc: string;
  onImageUpload: (file: File) => void;
}

const BasicInformation = ({user}:any) => {

    const userProfileSchema = Yup.object({
        // Basic Information
        fullName: Yup.string().required('Full name is required'),
        title: Yup.string().required('Job title is required'),
        location: Yup.string().required('Location is required'),
        bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
    })


    const form = useForm({
        validate: yupResolver(userProfileSchema),
        initialValues: {
        fullName: '',
        title: '',
        location: '',
        bio: '',
        
        }
    });

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

    const handleSubmit = (values: any)=>{
        mutate({
            ...values,
            firstName: values?.fullName?.split[0],
            lastName: values?.fullName?.split[0]
        })
    }

    useEffect(() => {
        if (user) {
            form.setValues({
                fullName: `${user?.firstName} ${user?.lastName}`,
                title: user.title || '',
                location: user.location || '',
                bio: user.bio || '',
            });
        }
    }, [user]);

  return (
    <div className="space-y-6 lg:mt-0 mt-7">
      <h3 className="text-xl font-semibold text-card-foreground mb-6">BASIC INFORMATION</h3>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:mb-4">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          {...form.getInputProps('fullName')}
        />
        
        <TextInput
          label="Job Title"
          className='lg:mb-0 mb-4'
          placeholder="e.g. Senior Product Designer"
          {...form.getInputProps('title')}
        />
      </div>

      <TextInput
        label="Location"
        className='mb-4'
        placeholder="e.g. Lagos, Nigeria"
        {...form.getInputProps('location')}
      />

      <Textarea
      className="w-full border rounded p-3 resize-y"
        label="Bio"
        placeholder="Tell us about yourself..."
        minRows={10}
        {...form.getInputProps('bio')}
      />

      <div className="flex justify-end mt-8">
        <Button disabled={isPending} type="submit" className="px-6">
            {isPending?'Saving...':'Save Changes'}
        </Button>
      </div>
    </form>
    </div>
    
  );
};

export default BasicInformation;