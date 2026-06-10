const baseURL = '' 
export const createCompany = async(companyData) => {
    
    const res = await fetch('http://localhost:5000/api/company',{
        method:'POST',
        headers:{
            'content-type': "application/json",
        },
        body:JSON.stringify(companyData)
    })
// console.log(res.data);
    return res.json()
}