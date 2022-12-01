export class BaseResponse {
    timeStamp: string = '';
    data: any;
    message: string = '';
    isSuccess: boolean = false;
    statusCode: number = 0;
    constructor() { }
}
