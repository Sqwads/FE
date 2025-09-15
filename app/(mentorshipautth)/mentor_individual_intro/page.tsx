"use client";
import { Textarea, Button, Group, Box, Title, Text, MultiSelect, CloseButton, Badge } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image"; // Assuming Next.js Image component
import Link from "next/link";
import { skillsTools } from "@/common/data";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import toast from "react-hot-toast";
import * as Yup from "yup";

const MentorIntroductionPage = () => {
  const router = useRouter();

  const validator = Yup.object({
    story: Yup.string().required("Your mentorship story is required"),
    bio: Yup.string().required("Your bio is required"),
    skills: Yup.array()
      .of(Yup.string())
      .min(1, "At least one skill is required")
      .max(20, "You can add up to 20 skills")
      .required("At least one skill is required"),
  });

  const form = useForm({
    initialValues: {
      story: "",
      bio: "",
      skills:[]
    },
    validate: yupResolver(validator),
    // validateInputOnBlur: true,
  });

  const skillsData = skillsTools

  const {mutate, isPending} = useMutation({
    mutationFn: (data: any) => instance.patch('/mentors', data),
    mutationKey: ['mentor', 'intro'],
    onSuccess(data, variables, context) {
        toast.success('Information updated successfully');
        router.push('/mentor_dashboard');
    },
    onError(error:any, variables, context) {
        toast.error(error?.response?.data?.message || 'Failed to update your Information');
    },
  })

  const handleSubmit = (values: typeof form.values) => {
    mutate(values)

  };



  return (
    <div className="max-w-2xl mx-auto w-full lg:px-6 lg:py-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm w-full">
        {/* Header */}
        <Title order={2} className="text-center text-[#001D69] font-bold mb-2">
          How would you like to be introduced?
        </Title>
        <Group justify="center" align="center" mb="xl">
          {/* Placeholder for the small image */}
          <Box className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
            
             <Image src="/images/man_2.png" 
             alt="User icon" 
             width={24} 
             height={24} />
            
          </Box>
          <Text size="sm" c="dimmed">
            Every individual has a story—what is yours?
          </Text>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="space-y-6">
            {/* Mentorship Story */}
            <Textarea
            className="w-full border rounded p-3 resize-y"
              label="Your mentorship story"
              placeholder="I started mentoring..."
              autosize
              rows={10}
              {...form.getInputProps("story")}
              styles={{ label: { marginBottom: "8px" } }}
            />

            {/* Bio */}
            <Textarea
            className="w-full border rounded p-3 resize-y"
              label="Your bio"
              placeholder="I can help you with..."
              autosize
              rows={10}
              {...form.getInputProps("bio")}
              styles={{ label: { marginBottom: "8px" } }}
            />

            {/* Skills Input */}
            <div>
              <Text size="sm" fw={500} mb="xs">
                Skills
              </Text>
              <Text size="xs" c="dimmed" mb="sm">
                You can add up to 20 skills. Use a comma to separate skills, or choose from the list.
              </Text>
              {/* Custom Tag Input Implementation */}
              <MultiSelect
                  data={skillsData}
                 
                  {...form.getInputProps("skills")}
                  searchable
                  placeholder="Select or type skills"
              />
              <Text size="xs" c="dimmed" mt="xs">
                {form.values.skills?.length}/20 skills added.
              </Text>
            </div>

            {/* Navigation Buttons */}
            <Group justify="flex-end" mt="xl">
              {/* <Button variant="default" onClick={handleBack}>
                Previous
              </Button> */}
            
              <Button disabled={isPending} type="submit" className="bg-[#001D69] hover:bg-blue-800 ">
                {isPending ? "Submitting..." : " Complete Setup"}
              </Button>
             
              
            </Group>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorIntroductionPage;

