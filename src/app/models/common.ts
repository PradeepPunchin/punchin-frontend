
export interface ApiResponse<T> {
    timeStamp: number,
    data: T,
    message: string,
    isSuccess: boolean,
    statusCode: number
}

export interface INavItem {
    id: number
    name: string,
    link: string,
    icon: string
}
