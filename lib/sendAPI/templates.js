/**
 * ebony-framework
 * 
 * @module sendAPI/templates 
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

'use strict';

const { TemplateAttachment } = require('./attachments');

/** 
 * A Button Template Class
 * @extends TemplateAttachment
*/
class ButtonTemplate extends TemplateAttachment {

    /**
     * Creates a ButtonTemplate
     * @param {string} text - The text sent
     * @param {Button[]} buttons - An array of at most 3 buttons
     */
    constructor(text, buttons = null) {

        let serializedButtons = [];
        if (buttons)
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
class GenericTemplate extends TemplateAttachment {

    /**
     * Creates a GenericTemplate
     * @param {object} options - The options of the Generic Template
     * @param {Array} options.elements - The card elements
     * @param {string} options.image_aspect_ratio - The aspect ratio of the card elements' image ("square"|"horizontal")
     * @param {string} sharable - If the Generic Template is sharable by the user ("false|"true")
     */
    constructor({ elements = [], image_aspect_ratio = "horizontal", sharable = "false" }) {
        super({
            template_type: "generic",
            elements,
            image_aspect_ratio,
            sharable
        })
    }
}

/**
 * A ListTemplate
 * @extends TemplateAttachment
 */
class ListTemplate extends TemplateAttachment {

    /**
     * Creates a ListTemplate
     * @param {object} options - The options of the ListTemplate
     * @param {Array} options.elements - The elements of the ListTemplate
     * @param {Button[]} options.buttons - The button of the ListTemplate (1 button allowed)
     * @param {boolean} options.large - If the first element of the ListTemplate will be a large one. 
     */
    constructor({ elements = [], buttons = [], large = false }) {
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
class MediaTemplate extends TemplateAttachment {

    /**
     * Create a MediaTemplate
     * @param {string} attachment_id - The attachment_id of the attachment 
     * @param {Button[]} buttons - The buttons of the MediaTemplate
     */
    constructor(attachment_id, buttons = null) {
        let serializedButtons = [];
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
 * @typedef {Object} cardElementOptions
 * @property {string} title
 * @property {string} subtitle
 * @property {string} image_url
 * @property {Button[]} buttons 
 * 
 */

 /**
  * Create a card element of a Generic Template
  * @param {cardElementOptions} options - The options of the cardElement
  * @returns {cardElement} - Returns a card element for use in a generic template
  */
function cardElement({ title = null, subtitle = null, image_url = null, buttons = null }) {
    let serializedButtons = [];
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
 * 
 */

/**
 * Create a list element for a ListTemplate
 * @param {listElementOptions} options - The options of the list element
 * @returns {listElement} - Returns a list element for use in a list template
 */
function listElement({ title, subtitle, image_url, action = null, buttons = null }) {
    let serializedButtons = [];
    if (buttons)
        serializedButtons = buttons.map(b => b.serialize());

    return {
        title,
        image_url,
        subtitle,
        default_action: action,
        buttons: serializedButtons
    };
}

module.exports = {
    ButtonTemplate,
    GenericTemplate,
    ListTemplate,
    MediaTemplate,
    cardElement,
    listElement
}
