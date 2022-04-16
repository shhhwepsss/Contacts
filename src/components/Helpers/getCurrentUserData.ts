

export const getCurrentUserDataPromise = async (userName: string) => {
    const userPromise = await fetch(`http://localhost:3001/users?q=${userName}`);
    return await userPromise.json()
}