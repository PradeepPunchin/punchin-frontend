import { PLATFORM, ROLES, USERSTATUS } from "../enums"

export interface ILoginResponse {
    id: number,
    user: IUser,
    authToken: string,
    startTime: number,
    platform: PLATFORM,
    deviceId: string,
    lastActiveTime: number,
    mobile: boolean
}

export interface IUser {
    id: number,
    userId: string,
    firstName: string,
    lastName: string,
    status: USERSTATUS,
    password: null,
    role: ROLES,
    accountLocked: boolean
}

