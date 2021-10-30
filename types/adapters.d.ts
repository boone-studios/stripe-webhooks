import DiscordAdapter from '../src/adapters/discord'
import FreshdeskAdapter from '../src/adapters/freshdesk'

export type ClassMethods<T> = keyof { [x: string]: T}

export declare type DispatcherInstance =
    | DiscordAdapter
    | FreshdeskAdapter
