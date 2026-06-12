
const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const serverFetch = async (apiUrl) => {
  const result = await fetch(`${baseURL}/${apiUrl}`);
  return result.json();
};

 
export const serverMutation = async (apiUrl, data) => {
  const res = await fetch(`${baseURL}/${apiUrl}`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const serverUpdate = async (apiUrl, data) => {
  const res = await fetch(`${baseURL}/${apiUrl}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res);

  return res.json();
};


