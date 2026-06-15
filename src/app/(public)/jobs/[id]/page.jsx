import React from "react";
import JobDetailsView from "./JobDetailsView";
import { getUseSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { getJobsById } from "@/lib/api/jobs";

const Page = async ({ params }) => {
  const { id } = await params;
// const { pathname } = request.nextUrl;
//   const session = await getUseSession();

//   if (!session) {
//     // const callbackUrl = `/jobs/${id}`;

//    const loginUrl = new URL('/login', request.url);
    
//     // Pass the original path they wanted as a query parameter
//     loginUrl.searchParams.set('callbackUrl', pathname);
//     redirect(`/login?${searchParams.toString()}`);

//   }

const jobDataById = await getJobsById(id)

  return (
    <div>
      <JobDetailsView jobData={jobDataById} />
    </div>
  );
};

export default Page;