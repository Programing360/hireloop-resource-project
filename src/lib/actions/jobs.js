export const jobsData = async (data) => {
  const res = await fetch("http://localhost:5000/api/jobs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
