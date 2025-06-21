"use client"
import React, { useEffect } from 'react';
import { Button, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import toast from 'react-hot-toast';


const SocialProfiles = ({ user }: any) => {

    const validator = Yup.object({
        linkedin: Yup.string().url('Invalid LinkedIn URL'),
        twitter: Yup.string().url('Invalid Twitter URL'),
        facebook: Yup.string().url('Invalid Facebook URL'),
        instagram: Yup.string().url('Invalid Instagram URL'),
        github: Yup.string().url('Invalid GitHub URL'),
        dribbble: Yup.string().url('Invalid Dribbble URL'),
    })

    const form = useForm({
        validate: yupResolver(validator),
        initialValues: {
            linkedin: '',
            twitter: '',
            facebook: '',
            instagram: '',
            github: '',
            dribbble: '',
        }
    });

    useEffect(() => {
        if (user?.socialProfile) {
            form.setValues({
                linkedin: user.socialProfile.linkedin || '',
                twitter: user.socialProfile.twitter || '',
                facebook: user.socialProfile.facebook || '',
                instagram: user.socialProfile.instagram || '',
                github: user.socialProfile.github || '',
                dribbble: user.socialProfile.dribbble || '',
            });
        }
    }, [user?.socialProfile]);

    const socialPlatforms = [
        { id: 'linkedin', label: 'LinkedIn', placeholder: 'Enter link' },
        { id: 'twitter', label: 'Twitter', placeholder: 'Enter link' },
        { id: 'facebook', label: 'Facebook', placeholder: 'Enter link' },
        { id: 'instagram', label: 'Instagram', placeholder: 'Enter link' },
        { id: 'github', label: 'GitHub', placeholder: 'Enter link' },
        { id: 'dribbble', label: 'Dribbble', placeholder: 'Enter link' }
    ];

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

    const handleSubmit = (values: any) => {
        mutate({
            socialProfile: values
        });

    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-6">SOCIAL PROFILES</h3>

            <div className="space-y-4">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    {socialPlatforms.map((platform) => (
                        <div className='mb-3' key={platform.id}>
                            <TextInput
                                label={platform.label}
                                placeholder={platform.placeholder}
                                {...form.getInputProps(platform.id)}
                            />
                        </div>
                    ))}

                    <Button disabled={isPending} type="submit" className="px-6">
                        {isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SocialProfiles;