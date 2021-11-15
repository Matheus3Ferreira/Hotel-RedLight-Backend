export interface HttpResponse<T> {
    status?: number,
    messege?: string,
    timeStamp?: Date
    payload: T
}