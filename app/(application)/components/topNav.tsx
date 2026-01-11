"use client"

import { FiBell, FiBookmark } from "react-icons/fi";
import {AiOutlineMenu} from 'react-icons/ai'
import { Drawer, Menu, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AdminSidebar from "./sidebar";
import { userWrapper } from "../../../src/store";
import { LuLogOut } from "react-icons/lu";
import { cookieStorage } from "@ibnlanre/portal";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import { IoMdSettings } from "react-icons/io";
import { CiSearch } from "react-icons/ci";


export default function TopNav() {
 
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = userWrapper((state) => ({
      user: state.user,
  }));
  const router = useRouter()

  const logout = ()=>{
    cookieStorage.clear()
    router.push('/login')
  }
  return (
    <nav className="w-full bg-white shadow-md ">
       <Drawer 
            opened={opened} 
            onClose={close} 
            withCloseButton={false}
            size={"65%"}
            styles={{
              body:{
                padding:'0px',
                // border:'1px solid red',
                height: '100vh',
                
              },
              
            }}
        >
          <div className="h-full">
            <Sidebar
              onSelectTab={close}
            />
          </div>
      </Drawer>
      
      <div className=" mx-auto px-6 py-5 flex items-center justify-between">
       
        {/* Search Bar */}
        <div className="md:hidden">
          <AiOutlineMenu  onClick={open} size={27} />
        </div>
        <div className="flex-1 max-w-[40rem] hidden md:block">
          <TextInput          
            className=" border border-[white] text-gray-700   focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search anything here..."
            leftSection={ <CiSearch/>}
            size="md"
            styles={{
              input:{
                background:'#F6F6F6',
                border:'1px solid #D5D7DA'
              }
            }}
          />

        </div>

        {/* Right Side - Icons and Profile */}
        <div className="flex items-center gap-4">

          {/* User Profile */}
          <div className="">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <div className="w-10 cursor-pointer h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {user?.firstName && user?.firstName[0]} {/* First letter of user’s name */}
              </div>
            </Menu.Target>
            <Menu.Dropdown className="px-5 py-4">
              <Menu.Item className="mb-4 space-x-3" onClick={()=>router.push('/settings')} leftSection={<IoMdSettings size={20} />}>
                Settings
              </Menu.Item>
              <Menu.Item className="space-x-3" onClick={logout} leftSection={<LuLogOut color="red" size={20} />}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
           

          </div>
        </div>
      </div>
    </nav>
  );
}