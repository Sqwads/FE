"use client"
import React, { useState, useEffect } from 'react';
import { Switch } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import toast from 'react-hot-toast';

const Availability = ({ user }: any) => {
    const queryClient = useQueryClient();
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        setIsAvailable(!!user?.availableForProjects);
    }, [user]);
    
    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => instance.patch('/user', data),
        mutationKey: ['user', 'update', 'availability'],
        onSuccess() {
            toast.success("Availability updated successfully!");
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError(error: any) {
            setIsAvailable(!isAvailable);
            toast.error(error?.response?.data?.message || 'Failed to update availability');
        },
    });

    const handleToggle = (checked: boolean) => {
        setIsAvailable(checked);
        mutate({ availableForProjects: checked });
    };

    return (
        <div className="space-y-6 lg:mt-0 mt-7">
            <h3 className="text-xl font-semibold text-card-foreground mb-6">AVAILABILITY</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                        <h4 className="font-semibold text-blue-900">Available for Projects</h4>
                        <p className="text-sm text-blue-700 mt-1">
                            When enabled, your profile will be visible to project owners looking for team members. 
                            This is similar to LinkedIn's "Open to Work" feature - it helps us match you with relevant opportunities.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
                <div>
                    <div className="font-medium text-card-foreground">I am available for projects</div>
                    <p className="text-sm text-muted-foreground mt-1">
                        {isAvailable 
                            ? "You are currently visible to project owners" 
                            : "Toggle to make yourself visible to project owners"}
                    </p>
                </div>
                <Switch
                    size="lg"
                    checked={isAvailable}
                    onChange={(event) => handleToggle(event.currentTarget.checked)}
                    disabled={isPending}
                    color="green"
                />
            </div>
        </div>
    );
};

export default Availability;
