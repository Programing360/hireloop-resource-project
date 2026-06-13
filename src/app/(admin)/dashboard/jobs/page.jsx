import React from "react";
import ManageAllJobsPage from "./ManageAllJobsPage";
import { serverFetch } from "@/lib/core/server";
import { getUseSession } from "@/lib/core/session";

const JobsPage = async () => {

  const reqruiterId = await getUseSession()
  const jobsData = await serverFetch(`api/jobs?reqruiterId=${reqruiterId?.id}`);
  
  return (
    <div>
      <ManageAllJobsPage jobsData={jobsData}></ManageAllJobsPage>
    </div>
  );
};

export default JobsPage;
