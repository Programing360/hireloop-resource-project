import React from "react";
import ManageAllJobsPage from "./ManageAllJobsPage";
import { serverFetch } from "@/lib/core/server";

const JobsPage = async () => {
  const jobsData = await serverFetch("api/jobs");

  console.log(jobsData);

  return (
    <div>
      <ManageAllJobsPage jobsData={jobsData}></ManageAllJobsPage>
    </div>
  );
};

export default JobsPage;
