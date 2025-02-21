"use client";

import { Table, Avatar, Badge, Button, Menu } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import { users, User } from "./user_data"; // Import from separate file

const UserTable = () => {
  return (
    <div className="overflow-x-auto overflow-scroll mx-4 my-6">
      <Table highlightOnHover className="min-w-[800px]">
        {/* Table Header */}
        <thead className="bg-blue-900 text-white">
          <tr>
            {["Name", "Domain", "Email", "Projects", "Last Active", "Status", "Date Joined", ""].map(
              (header) => (
                <th key={header} className="text-left px-4 py-3 whitespace-nowrap">
                  {header}
                  {header === "Last Active" && <IoChevronDown size={14} className="inline ml-1" />}
                </th>
              )
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition-all shadow-sm"
            >
              {/* Name */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {user.profileImage ? (
                    <Avatar src={user.profileImage} alt={user.name} radius="xl" />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span>{user.name}</span>
                </div>
              </td>

              {/* Domain */}
              <td className="px-4 py-3">{user.domain}</td>

              {/* Email */}
              <td className="px-4 py-3">{user.email}</td>

              {/* Projects */}
              <td className="px-4 py-3">{user.projects}</td>

              {/* Last Active */}
              <td className="px-4 py-3">{user.lastActive}</td>

              {/* Status */}
              <td className="px-4 py-3">
                <Badge
                  color={user.status === "ACTIVE" ? "green" : "orange"}
                  variant="light"
                  radius="sm"
                  size="md"
                  className={`font-semibold ${
                    user.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {user.status}
                </Badge>
              </td>

              {/* Date Joined */}
              <td className="px-4 py-3">{user.dateJoined}</td>

              {/* Actions */}
              <td className="px-4 py-3">
                <Menu position="bottom-end" shadow="md" width={200}>
                  <Menu.Target>
                    <Button variant="subtle" size="compact-icon">
                      <BsThreeDotsVertical />
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>View Profile</Menu.Item>
                    <Menu.Item>Edit User</Menu.Item>
                    <Menu.Item color="red">Suspend User</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;