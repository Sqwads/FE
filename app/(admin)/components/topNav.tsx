"use client"

import { FiBell, FiBookmark } from "react-icons/fi";
import {AiOutlineMenu} from 'react-icons/ai'
import { Drawer, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AdminSidebar from "./sidebar";


export default function TopNav() {
 
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <nav className="w-full bg-white shadow-md "> {/* Added left-64 */}
       <Drawer 
            opened={opened} 
            onClose={close} 
            withCloseButton={false}
            size={"xs"}
            styles={{
              body:{
                padding:'0px',
              }
            }}
        >
          <div className="h-screen">
            <AdminSidebar/>
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
            leftSection={ <FiBookmark/>}
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
          <FiBookmark className="text-gray-700 text-xl cursor-pointer" />
          <FiBell className="text-gray-700 text-xl cursor-pointer" />

          {/* User Profile */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              Y {/* First letter of user’s name */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}