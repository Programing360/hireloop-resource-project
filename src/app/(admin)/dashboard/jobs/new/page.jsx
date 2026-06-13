import React from 'react';
import JobPostForm from './JobsForm';
import { getUseSession } from '@/lib/core/session';
import { CompanyAllData } from '@/lib/api/company';


const JobPage = async() => {
    
    const companyData = await CompanyAllData()

    const companyId = await getUseSession()
    return (
        <div>
            <JobPostForm reqruiterId={companyId?.id}companyData={companyData}></JobPostForm>
        </div>
    );
};

export default JobPage;