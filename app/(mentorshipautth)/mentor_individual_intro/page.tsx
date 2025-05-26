"use client";
import { Textarea, Button, Group, Box, Title, Text, MultiSelect, CloseButton, Badge } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image"; // Assuming Next.js Image component
import Link from "next/link";

const MentorIntroductionPage = () => {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>(["Product Design", "UI Design"]); // Initial skills from UI
  const [currentSkillInput, setCurrentSkillInput] = useState("");

  const form = useForm({
    initialValues: {
      mentorshipStory: "",
      bio: "",
    },
  });

  // Dummy data for skills suggestions - replace with actual data source if needed
  const skillsData = [
    "Product Design",
    "UI Design",
    "UI Designer",
    "UI/UX",
    "Frontend Development",
    "Backend Development",
    "React",
    "Node.js",
    "Project Management",
    "Agile Methodologies",
  ];

  const handleAddSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && skills.length < 20 && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
    }
    setCurrentSkillInput(""); // Clear input after adding
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === "," || event.key === "Enter") && currentSkillInput) {
      event.preventDefault(); // Prevent default comma/enter behavior
      handleAddSkill(currentSkillInput);
    }
  };

  const handleSubmit = (values: typeof form.values) => {
    console.log("Introduction Data:", { ...values, skills });
    // router.push("/completion-step"); // Navigate to final step or dashboard
  };

  const handleBack = () => {
    // router.back(); // Navigate back
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
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
              label="Your mentorship story"
              placeholder="I started mentoring..."
              autosize
              minRows={4}
              {...form.getInputProps("mentorshipStory")}
              styles={{ label: { marginBottom: "8px" } }}
            />

            {/* Bio */}
            <Textarea
              label="Your bio"
              placeholder="I can help you with..."
              autosize
              minRows={4}
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
              <Box className="border border-gray-300 rounded-md p-2 min-h-[40px] flex flex-wrap items-center gap-1">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="light"
                    color="gray"
                    rightSection={
                      <CloseButton
                        size="xs"
                        radius="xl"
                        onClick={() => handleRemoveSkill(skill)}
                        aria-label={`Remove ${skill}`}
                      />
                    }
                    className="py-1 px-2"
                  >
                    {skill}
                  </Badge>
                ))}
                {skills.length < 20 && (
                  <input
                    type="text"
                    value={currentSkillInput}
                    onChange={(e) => setCurrentSkillInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={skills.length === 0 ? "Add a skill..." : ""}
                    className="flex-grow outline-none text-sm p-1"
                    // Basic autocomplete suggestion (can be enhanced)
                    list="skills-suggestions"
                  />
                )}
                 {/* Basic datalist for suggestions - replace with Mantine Autocomplete if needed */}
                 <datalist id="skills-suggestions">
                    {skillsData
                      .filter(s => !skills.includes(s) && s.toLowerCase().includes(currentSkillInput.toLowerCase()))
                      .map(s => <option key={s} value={s} />)
                    }
                 </datalist>
              </Box>
              <Text size="xs" c="dimmed" mt="xs">
                {skills.length}/20 skills added.
              </Text>
            </div>

            {/* Navigation Buttons */}
            <Group justify="flex-end" mt="xl">
              <Button variant="default" onClick={handleBack}>
                Previous
              </Button>
              <Link href='/mentor_login'>
                    <Button type="submit" className="bg-[#001D69] hover:bg-blue-800">
                        Complete Setup
                    </Button>
              </Link>
              
            </Group>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorIntroductionPage;

