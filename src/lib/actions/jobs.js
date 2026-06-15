import { serverMutation } from "../core/server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const jobsData = async (data) => {
  const res = await fetch(`${baseURL}/api/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const jobApply = async (applyData) => {
  const res = await serverMutation("api/apply", applyData);
  return res;
};
