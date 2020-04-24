import { GenericAttachment } from '@ebenos/framework/lib/interfaces/attachment';

export enum FacebookStickers {
    thumbsUpSmall = '369239263222822',
    thumbsUpMedium = '369239383222810',
    thumbsUpLarge = '369239343222814'
}

export function isSticker(attachment: GenericAttachment): boolean {
    if (attachment.payload) {
        return (
            attachment.payload.sticker_id === FacebookStickers.thumbsUpSmall ||
            attachment.payload.sticker_id === FacebookStickers.thumbsUpMedium ||
            attachment.payload.sticker_id === FacebookStickers.thumbsUpLarge
        );
    }

    return false;
}
