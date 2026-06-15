import { serverFetch } from "../core/server";

export const getApplicantData = async (applicantId) => {
  const res = serverFetch(`api/applyData?applicantId=${applicantId}`);
  return res;
};
