/**
 * ebony-framework
 *
 * @module sendAPI/templates
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
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
     * @param {string} options.image_aspect_ratio - The aspect ratio of the card elements' image ("square"|"horizontal")
     * @param {string} sharable - If the Generic Template is sharable by the user ("false|"true")
     */
    constructor({
        elements,
        image_aspect_ratio = 'horizontal',
        sharable = 'false'
    }: GenericTemplateOptions) {
        super({
            template_type: 'generic',
            elements,
            image_aspect_ratio,
            sharable
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
    constructor(attachment_id: string, buttons: Button[] | null = null) {
        let serializedButtons: Array<{ [key: string]: any }> = [];
        if (buttons) {
            serializedButtons = buttons.map((b) => b.serialize());
        }

        super({
            template_type: 'media',
            elements: [
                {
                    media_type: 'image',
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
    title = null,
    subtitle = null,
    image_url = null,
    buttons = []
}: ElementInput) {
    let serializedButtons: Array<{ [key: string]: any }> = [];
    if (buttons) {
        serializedButtons = buttons.map((b) => b.serialize());
    }

    return {
        title,
        subtitle,
        image_url,
        buttons: serializedButtons
    };
}
