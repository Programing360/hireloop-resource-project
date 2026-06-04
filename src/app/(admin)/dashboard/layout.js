import Sidebar from '@/component/dashboard/Sidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className='flex '>
            <aside className=''>
                <Sidebar></Sidebar>
            </aside>
            <main className='flex-1 bg-[#141212] min-h-screen'>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;