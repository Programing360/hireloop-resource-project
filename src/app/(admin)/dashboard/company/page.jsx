import React from 'react';
import CompanyDashboard from './company';
import { CompanyAllData } from '@/lib/api/company';
import { getUseSession } from '@/lib/core/session';

const page = async () => {
    const company = await getUseSession()
    const reqruiterId = company.id
    const companyData = await CompanyAllData()

    console.log(companyData);
    return (
        <div>
            
                <CompanyDashboard companyData={companyData} reqruiterId={reqruiterId}></CompanyDashboard>
            
         
        </div>
    );
};

export default page;