"use client";
import { Textarea, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaRegCopy } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import ProjectTab from "../components/projectsTab";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/src/api/instance";
import moment from "moment";
import { formatTextToSentenceCase } from "@/src/common";

const UserProfile = () => {
  const params = useParams();
  const userId = params.id;
  const [tabs, setTabs] = useState([
    { label: "Projects", isActive: true },
    { label: "Conversations" },
    { label: "Portfolio" },
  ]);

  const handleTabSwitch = (idx: number) => {
    const tabs__c = [...tabs];
    tabs__c.forEach((item) => (item.isActive = false));
    tabs__c[idx].isActive = true;
    setTabs(tabs__c);
  };

  const { data } = useQuery({
    queryFn: () => instance.get(`/user/${userId}`),
    queryKey: ["user", userId],
    enabled: !!userId,
  });

  const user = data?.data;

  return (
    <div className="py-10 lg:px-7 px- ">
      <div className="flex g:mb-10 mb-5 lg:text-2xl text-xl items-center">
        <Link href={"/users"}>
          <MdKeyboardArrowLeft size={35} className="cursor-pointer" />
        </Link>
        Profile
      </div>
      <div className="lg:flex block  lg:mb-0  gap-y-5 rounded-2xl bg-white shadow-sm py-5 lg:px-14 px-5 w-full items-center">
        <div className="flex lg:mr-20  mb-7  items-center justify-center">
          <img
            src={user?.profile?.profileImage || "/images/profile.jpg"}
            className="h-20 w-20 mr-3 rounded-full object-cover"
            alt=""
          />
          <div className="flex-1">
            <div className="xl:text-2xl xl:text-xl text-lg mb-1 font-medium">
              {user?.profile?.firstName} {user?.profile?.lastName}
            </div>
            <div className="text-sm font-medium">
              JOINED {moment(user?.profile?.createdAt).format("MMMM Do")}{" "}
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-wrap flex-1 gap-x-5 gap-y-3">
          <div className="">
            <div className="text text-[#16181B80]">No. Of Projects</div>
            <div className="font-medium xl:text-xl text-lg">
              {user?.projects?.length}
            </div>
          </div>
          <div className="">
            <div className="text  flex text-[#16181B80]">
              Email <FaRegCopy className="ml-2" />
            </div>
            <div className="font-medium  text"> {user?.profile?.email} </div>
          </div>
          <div className="">
            <div className="text text-[#16181B80]"> Role </div>
            <div className="font-medium xl:text-lg text-lg">
              {formatTextToSentenceCase(
                user?.profile?.skills_of_interest[0] || ""
              )}
            </div>
          </div>
          <div className="">
            <div className="text text-[#16181B80]"> Date Joined </div>
            <div className="lg:font-medium xl:text-lg text-base">
              {moment(user?.profile?.createdAt).format("MMMM Do YYYY")}{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:mt-5 mt-5 gap-x-5 ">
        <div className="lg:w-2/5  rounded-xl bg-white py-7 px-4">
          <div className="font- text-2xl mb-7">Profile Information</div>

          <div className="mb-7">
            <div className="mb-4">
              <div className="text-sm text-[#16181B80] mb-1">Full Name</div>
              <div className="text-base font-medium">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-[#16181B80] mb-1">Email</div>
              <div className="text-base font-medium">
                {user?.profile?.email}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm text-[#16181B80] mb-1">Bio</div>
              <p className="text-base text-gray-700 whitespace-pre-wrap">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>

          <div className="text-[#16181B80]">Social Links</div>
          <div className="flex gap-x-3 mt-3 mb-10">
            <div className="flex rounded-full bg-[#EFF3FF] border border-[#0234B8] justify-center items-center bg h-8 w-8">
              <FaLinkedinIn color="#0234B8" className="cursor-pointer" />
            </div>
            <div className="flex rounded-full justify-center bg-[#EFF3FF] border border-[#0234B8] items-center bg h-8 w-8">
              {" "}
              <FaFacebookF color="#0234B8" className="cursor-pointer" />
            </div>
            <div className="flex rounded-full justify-center bg-[#EFF3FF] border border-[#0234B8] items-center bg h-8 w-8">
              <BsTwitterX color="#0234B8" className="cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-[#16181B80] mr-5">Profile Photo: </div>
            <img
              src={user?.profile?.profileImage || "/images/profile,jpg"}
              className="h-14 border w-14 mr-3 rounded-full object-cover"
              alt=""
            />
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl py-7 lg:px-7 px-4 lg:mt-0 mt-7">
          <div className="text font- text-2xl mb-7">Sqwads Activity</div>

          <div className="flex border-b ">
            {tabs.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleTabSwitch(idx)}
                className={`${
                  item.isActive
                    ? "border-b-4 rounded-b  border-[#001D69]  rouded-md"
                    : "text-[#16181B80]"
                } px-5 py-2 cursor-pointer`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {tabs[0].isActive && <ProjectTab projects={user?.projects} />}
          {tabs[1].isActive && <div>Conversations</div>}
          {tabs[2].isActive && <div>Portfolio</div>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
