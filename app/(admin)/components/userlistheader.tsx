import Image from "next/image";
import { FC } from "react";

const UserListHeader: FC = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-sm rounded-lg">
      {/* Title and Subtitle */}
      <div>
        <h1 className="text-2xl text-blue-600">Sqwads Users</h1>
        <p className="text-gray-500 mt-1">An Overview of all sqwads users over the years</p>
      </div>

      {/* Export as CSV Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
        aria-label="Export as CSV"
      >
        Export as CSV
        <Image 
          src="/images/download.png"
          alt="download"
          width={30}
          height={20}
        />
      </button>
    </div>
  );
};

export default UserListHeader;