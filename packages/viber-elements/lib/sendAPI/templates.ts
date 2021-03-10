/**
 * ebony-framework
 *
 * @module sendAPI/templates
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import { TemplateAttachment } from './attachments';
import { Button } from './buttons';
import { ElementInput, GenericTemplateOptions } from './interfaces';

/**
 * A Button Template Class
 * @extends TemplateAttachment
 */
export class ButtonTemplate extends TemplateAttachment {
    /**
     * Creates a ButtonTemplate
     * @param {string} text - The text sent
     * @param {Button[]} buttons - An array of at most 3 buttons
     */
    constructor(text: string, buttons: Button[] = []) {
        let serializedButtons: Array<{ [key: string]: any }> = [];
        if (buttons.length > 0) {
            serializedButtons = buttons.map((b) => b.serialize());
        }

        super({
            template_type: 'button',
            text,
            buttons: serializedButtons
        });
    }
}

export class OneTimeNotificationRequestTemplate extends TemplateAttachment {
    /**
     * Creates a ButtonTemplate
     * @param {string} text - The title of the Notification Request (max: 65 characters)
     * @param {any} payload - The payload sent back
     */
    constructor(title: string, payload: string) {
        super({
            template_type: 'one_time_notif_req',
            title,
            payload
        });
    }
}

/**
 * A GenericTemplate
 * @extends TemplateAttachment
 */
export class GenericTemplate extends TemplateAttachment {
    /**
     * Creates a GenericTemplate
     * @param {object} options - The options of the Generic Template
     * @param {Array} options.elements - The card elements
     */
    constructor({
        elements,
        ButtonsGroupColumns,
        ButtonsGroupRows,
        BgColor
    }: GenericTemplateOptions) {
        super({
            template_type: 'generic',
            elements,
            ButtonsGroupColumns,
            ButtonsGroupRows,
            BgColor
        });
    }
}

/**
 * A MediaTemplate
 * @extends TemplateAttachment
 */
export class MediaTemplate extends TemplateAttachment {
    /**
     * Create a MediaTemplate
     */
    constructor(
        attachment_id: string,
        buttons: Button[] | null = null,
        media_type: 'image' | 'video' = 'image'
    ) {
        let serializedButtons: Array<{ [key: string]: any }> = [];
        if (buttons) {
            serializedButtons = buttons.map((b) => b.serialize());
        }

        super({
            template_type: 'media',
            elements: [
                {
                    media_type,
                    attachment_id,
                    buttons: serializedButtons
                }
            ]
        });
    }
}

/**
 * Create a card element of a Generic Template
 */
export function cardElement({
    columns = null,
    rows = null,
    action_type = null,
    action_body = null,
    text = null,
    text_size = null,
    textV_align = null,
    textH_align = null,
    image_url = null
}: ElementInput) {
    return {
        columns,
        rows,
        action_type,
        action_body,
        text,
        text_size,
        textV_align,
        textH_align,
        image_url
    };
}
