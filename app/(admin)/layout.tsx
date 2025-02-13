import React from 'react';
import AdminSidebar from './admin_sidebar/page';
import TopNav from './admin_topnav/page';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return(
        <div className="flex" >
           
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-100 ml-64">
                 <TopNav />
              {children}
            </div>
    </div>
    )
}
