import DiscordAdapter from '../adapters/discord'

export type ClassMethods<T> = keyof { [x: string]: T}

export declare type DispatcherInstance =
    | DiscordAdapter
