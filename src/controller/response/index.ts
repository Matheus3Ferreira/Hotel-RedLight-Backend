export class HttpResponse<T> {
    status?: number
    messege?: string
    timeStamp?: Date
    payload: T
    constructor(payload: T, status: number, messege?: string){
        this.status = status;
        this.messege = messege;
        this.timeStamp = new Date();
        this.payload = payload;
    }
}