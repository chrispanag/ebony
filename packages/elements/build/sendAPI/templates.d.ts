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
export declare class ButtonTemplate extends TemplateAttachment {
    /**
     * Creates a ButtonTemplate
     * @param {string} text - The text sent
     * @param {Button[]} buttons - An array of at most 3 buttons
     */
    constructor(text: string, buttons?: Button[]);
}
/**
 * A GenericTemplate
 * @extends TemplateAttachment
 */
export declare class GenericTemplate extends TemplateAttachment {
    /**
     * Creates a GenericTemplate
     * @param {object} options - The options of the Generic Template
     * @param {Array} options.elements - The card elements
     * @param {string} options.image_aspect_ratio - The aspect ratio of the card elements' image ("square"|"horizontal")
     * @param {string} sharable - If the Generic Template is sharable by the user ("false|"true")
     */
    constructor({ elements, image_aspect_ratio, sharable }: GenericTemplateOptions);
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
export declare class ListTemplate extends TemplateAttachment {
    /**
     * Creates a ListTemplate
     * @param {ListOptions} options - The options of the ListTemplate
     */
    constructor({ elements, buttons, large }: ListTemplateOptions);
}
/**
 * A MediaTemplate
 * @extends TemplateAttachment
 */
export declare class MediaTemplate extends TemplateAttachment {
    /**
     * Create a MediaTemplate
     * @param {string} attachment_id - The attachment_id of the attachment
     * @param {Button[]} buttons - The buttons of the MediaTemplate
     */
    constructor(attachment_id: string, buttons?: Button[] | null);
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
export declare function cardElement({ title, subtitle, image_url, buttons }: ElementInput): {
    title: string | null;
    subtitle: string | null;
    image_url: string | null;
    buttons: {}[];
};
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
export declare function listElement({ title, subtitle, image_url, action, buttons }: ListElementInput): {
    title: string | null;
    image_url: string | null;
    subtitle: string | null;
    default_action: string | null;
    buttons: {}[];
};
//# sourceMappingURL=templates.d.ts.map