import React from 'react';
import Sidebar from './sidebar/page';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return(
        <div className="flex" >
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-100">
              {children}
            </div>
    </div>
    )
}