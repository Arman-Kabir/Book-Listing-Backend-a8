import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ILoginPayload from "./auth.interface";
import ApiError from "../../../errors/ApiError";
import { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

// eslint-disable-next-line @typescript-eslint/no-var-requires
let jwt = require('jsonwebtoken');



const createUser = async (data: User): Promise<User> => {
    const result = await prisma.user.create({
        data
    });
    return result;
}

const loginUser = async (payload: ILoginPayload) => {
    const { email, password } = payload;
    console.log(email, password);

    const isUserExist = await prisma.user.findFirstOrThrow({
        where: {
            email
        },
    });

    if (!isUserExist) {
        throw new ApiError(400, 'User not exist')
    }

    const isPasswordMatched = isUserExist?.password === password;
    console.log(isPasswordMatched);

    if (!isPasswordMatched) {
        throw new ApiError(500, 'Password not matched');
    }

    const accessToken = jwt.sign({
        id: isUserExist?.id,
        role: isUserExist?.role,
        email: isUserExist.email
    }, process.env.JWT_SECRET as Secret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({
        id: isUserExist?.id,
        role: isUserExist?.role,
        email: isUserExist.email
    }, process.env.JWT_REFRESH_SECRET as Secret, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return {
        accessToken,
        refreshToken
    };
}

export const AuthService = {
    createUser,
    loginUser
}