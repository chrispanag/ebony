const { TemplateAttachment } = require('./attachments');

class ButtonTemplate extends TemplateAttachment {
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

class GenericTemplate extends TemplateAttachment {
    constructor({ elements = [], image_aspect_ratio = "horizontal", sharable = "false" }) {
        super({
            template_type: "generic",
            elements,
            image_aspect_ratio,
            sharable
        })
    }
}

class ListTemplate extends TemplateAttachment {
    constructor({ elements = [], buttons = null, large = false }) {
        let top_element_style = "compact";
        if (large)
            top_element_style = "large";

        super({
            template_type: "list",
            top_element_style,
            elements,
            buttons
        })
    }
}

class MediaTemplate extends TemplateAttachment {
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
