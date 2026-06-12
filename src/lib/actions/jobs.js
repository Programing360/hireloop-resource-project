const baseURL = process.env.NEXT_PUBLIC_BASE_URL
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
