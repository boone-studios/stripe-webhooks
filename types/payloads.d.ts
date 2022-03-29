export declare interface DiscordAuthor {
    name?: string,
    url?: string,
    icon_url?: string,
}

export declare interface DiscordEmbedFields {
    name: string,
    value: string,
    inline?: boolean,
}

export declare interface DiscordEmbeds {
    author: DiscordAuthor,
    title?: string,
    url?: string,
    description?: string,
    color?: string,
    fields: DiscordEmbedFields[]
}

export declare interface DiscordFooter {
    text: string,
    icon_url?: string,
}

export declare interface DiscordImage {
    url: string,
}

export declare interface DiscordPayload {
    username?: string,
    avatar_url?: string,
    content: string,
    embeds?: DiscordEmbeds[],
    thumbnail?: DiscordThumbnail,
    image?: DiscordImage,
    footer?: DiscordFooter,
}

export declare interface DiscordThumbnail {
    url: string,
}

export declare interface SlackFields {
    type: string,
    text: string,
}

export declare interface SlackBlocks {
    type: string,
    block_id?: string,
    text: {
        type: string,
        text: string,
    },
    accessory?: {
        type: string,
        image_url: string,
        alt_text?: string,
    },
    fields?: SlackFields[],
}

export declare interface SlackPayload {
    text: string,
    blocks?: SlackBlocks[],
}
