import React from 'react';
import CompanyDashboard from './company';
import { CompanyAllData } from '@/lib/api/company';

const page = async () => {

    const companyData = await CompanyAllData()
    console.log(companyData);
    return (
        <div>
            {
                companyData.map(company => <CompanyDashboard key={company._id} company={company}></CompanyDashboard>)
            }
         
        </div>
    );
};

export default page;