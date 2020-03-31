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
import { ElementInput, ListTemplateOptions, GenericTemplateOptions, ListElementInput } from './interfaces';

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

        let serializedButtons: {}[] = [];
        if (buttons.length > 0)
            serializedButtons = buttons.map(b => b.serialize());

        super({
            template_type: "button",
            text,
            buttons: serializedButtons
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
    constructor({ elements, image_aspect_ratio = "horizontal", sharable = "false" }: GenericTemplateOptions) {
        super({
            template_type: "generic",
            elements,
            image_aspect_ratio,
            sharable
        })
    }
}

/**
* @typedef {object} ListOptions
* @property {ListElement[]} elements - The elements of the ListTemplate
* @property {Button[]} buttons - The button of the ListTemplate (1 button allowed)
* @property {boolean} large - If the first element of the ListTemplate will be a large one. 
*/

/**
 * A ListTemplate
 * @extends TemplateAttachment
 */
export class ListTemplate extends TemplateAttachment {

    /**
     * Creates a ListTemplate
     * @param {ListOptions} options - The options of the ListTemplate
     */
    constructor({ elements, buttons = [], large = false }: ListTemplateOptions) {
        let top_element_style = "compact";
        if (large)
            top_element_style = "large";

        super({
            template_type: "list",
            top_element_style,
            elements,
            buttons: buttons.map(b => b.serialize())
        })
    }
}

/**
 * A MediaTemplate
 * @extends TemplateAttachment
 */
export class MediaTemplate extends TemplateAttachment {

    /**
     * Create a MediaTemplate
     * @param {string} attachment_id - The attachment_id of the attachment 
     * @param {Button[]} buttons - The buttons of the MediaTemplate
     */
    constructor(attachment_id: string, buttons: Button[] | null = null) {
        let serializedButtons: {}[] = [];
        if (buttons)
            serializedButtons = buttons.map(b => b.serialize());

        super({
            template_type: 'media',
            elements: [
                {
                    media_type: "image",
                    attachment_id,
                    buttons: serializedButtons
                }
            ]
        });
    }
}

/**
 * @typedef {object} cardElementOptions
 * @property {string} title
 * @property {string} subtitle
 * @property {string} image_url
 * @property {Button[]} buttons 
 */

/**
 * @typedef {object} cardElement
 * @property {string} title
 * @property {string} subtitle
 * @property {string} image_url
 * @property {SerializedButton[]} buttons
 */

/**
 * Create a card element of a Generic Template
 * @param {cardElementOptions} options - The options of the cardElement
 * @returns {cardElement} - Returns a card element for use in a generic template
 */
export function cardElement({ title = null, subtitle = null, image_url = null, buttons = [] }: ElementInput) {
    let serializedButtons: {}[] = [];
    if (buttons)
        serializedButtons = buttons.map(b => b.serialize());

    return {
        title,
        subtitle,
        image_url,
        buttons: serializedButtons
    };
}

/**
 * @typedef {Object} listElementOptions
 * @property {string} title
 * @property {string} subtitle
 * @property {string} image_url
 * @property {string} action
 * @property {Button[]} buttons 
 */

/**
* @typedef {Object} listElement
* @property {string} title
* @property {string} subtitle
* @property {string} image_url
* @property {string} default_action
* @property {SerializedButton[]} buttons 
*/

/**
 * Create a list element for a ListTemplate
 * @param {listElementOptions} options - The options of the list element
 * @returns {listElement} - Returns a list element for use in a list template
 */
export function listElement({ title = null, subtitle = null, image_url = null, action = null, buttons = [] }: ListElementInput) {
    let serializedButtons: {}[] = [];
    if (buttons.length > 0)
        serializedButtons = buttons.map(b => b.serialize());

    return {
        title,
        image_url,
        subtitle,
        default_action: action,
        buttons: serializedButtons
    };
}