import { headers } from "next/headers"
import { auth } from "../auth"

export const getUseSession = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.user || null;
}