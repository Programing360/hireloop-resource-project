const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const JobAllData = async () => {
  const res = await fetch(`${baseURL}/api/jobs`);
  return res.json();
};

export const getJobsById = async (jobsId) => {
  const res = await fetch(`${baseURL}/api/jobs/${jobsId}`);
  return res.json();
};
