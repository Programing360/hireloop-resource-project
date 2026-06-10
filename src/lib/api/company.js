export const CompanyAllData = async () => {
    const res = await fetch('http://localhost:5000/api/company')
    return res.json()
}