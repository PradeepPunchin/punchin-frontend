
export enum STORAGETOKENENUM {
    token = "PUNCHIN_TOKEN",
    userId = "PUNCHIN_USERID",
    role = "PUNCHIN_USER_ROLE"
}

export enum ROLES {
    admin = "ADMIN",
    banker = "BANKER",
    verifier = "VERIFIER"
}

export enum USERSTATUS {
    active = "ACTIVE",
    inactive = "INACTIVE"
}

export enum PLATFORM {
    web = "WEB",
    android = "ANDROID",
    ios = "IOS"
}

export enum BANKERSTATUSENUM {
    inprogress = "IN_PROGRESS",
    all = "ALL",
    settled = "SETTLED"
}

export enum VERIFIERSTATUSENUM {
    underVerification = "UNDER_VERIFICATION",
    settled = "SUBMITTED_TO_INSURER",
    inprogress = "IN_PROGRESS",
    all = "ALL",
}
