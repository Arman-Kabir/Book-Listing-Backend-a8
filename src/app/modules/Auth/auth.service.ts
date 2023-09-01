import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";



const createUser = async (data: User): Promise<User> => {
    const result = await prisma.user.create({
        data
    });
    return result;
}

const loginUser = async (data) => {
    // const result = await 
    console.log(data);
    return 'login user called';
}

export const AuthService = {
    createUser,
    loginUser
}