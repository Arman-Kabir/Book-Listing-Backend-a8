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

    // calculate the "iat" value for one year ago
    const now = Math.floor(Date.now()/1000);
    const oneYearInSeconds = 365*24*60*60;
    const iat = now-oneYearInSeconds;

    const accessToken = jwt.sign({
        userId: isUserExist?.id,
        role: isUserExist?.role,
        
        iat:iat
    }, process.env.JWT_SECRET as Secret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({
        userId: isUserExist?.id,
        role: isUserExist?.role,
       
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