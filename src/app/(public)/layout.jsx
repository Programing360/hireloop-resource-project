import Footer from '@/component/Footer';
import CustomNavbar from '@/component/Navbar';
import React from 'react';

const publicLayout = ({children}) => {
    return (
        <div>
            <CustomNavbar></CustomNavbar>
            {children}
             <Footer></Footer>
        </div>
    );
};

export default publicLayout;