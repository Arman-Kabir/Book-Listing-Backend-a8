import prisma from "../../../shared/prisma"


const getAllUsers = async()=>{
    const result = await prisma.user.findMany({});
    return result;
}

export const UserService = {
    getAllUsers
}