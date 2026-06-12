import { serverFetch } from "../core/server";

export const CompanyAllData = async () => {
  return serverFetch("api/company");
};
