export const JobAllData = async () => {
    const res = await fetch('http://localhost:5000/api/api/jobs')
    return res.json()
}