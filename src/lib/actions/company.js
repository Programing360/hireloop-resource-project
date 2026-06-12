import { serverMutation, serverUpdate } from "../core/server";

export const createCompany = async (companyData) => {
    return serverMutation('api/company', companyData)
};

export const companyDataUpdate = async (companyId,companyData) => {
    return serverUpdate(`api/companyUpdate/${companyId}`, companyData)
};

