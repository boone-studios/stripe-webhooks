import DiscordAdapter from '../src/adapters/discord'

export type ClassMethods<T> = keyof { [x: string]: T}

export declare type DispatcherInstance =
    | DiscordAdapter
