import Events from '../events'

export declare type Handler = {
    [key: string]: keyof Events
}

export declare interface Response {
    body?: string,
    headers?: object,
    statusCode?: number,
}
